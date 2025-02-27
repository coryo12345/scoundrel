import { CardValue, newRandomDeck, PlayingCard, Suit, type Deck } from '@/lib/CardDeck';
import { CONSTANTS } from '@/lib/Constants';

export class GameState {
  static storableProperties: (keyof GameState)[] = [
    'health',
    'lastRanRoomNumber',
    'deck',
    'discardPile',
    'currentRoom',
    'roomNumber',
    'currentWeapon',
    'weaponLastFought',
  ];

  health: number;
  lastRanRoomNumber: number;
  deck: Deck;
  discardPile: Deck;
  currentRoom: Deck;
  roomNumber: number;
  currentWeapon: PlayingCard | null;
  weaponLastFought: PlayingCard | null;
  callbacks: { onWin?: Function; onLose?: Function };

  constructor(options?: { includeMerchants?: boolean }) {
    this.health = 20;
    this.deck = newRandomDeck(options?.includeMerchants);
    this.discardPile = [];
    this.currentRoom = [];
    this.roomNumber = 0;
    this.lastRanRoomNumber = -1;
    this.currentWeapon = null;
    this.weaponLastFought = null;
    this.callbacks = {};
  }

  static FromJSONString(str: string): GameState {
    const obj = JSON.parse(str);
    const game = new GameState();
    GameState.storableProperties.forEach((prop) => {
      if (obj[prop] != undefined) game[prop] = obj[prop];
    });
    return game;
  }

  toJSONString(): string {
    const obj: Record<string, any> = {};
    GameState.storableProperties.forEach((prop) => {
      obj[prop] = this[prop];
    });
    return JSON.stringify(obj);
  }

  canRun() {
    return this.roomNumber > this.lastRanRoomNumber + 1 && this.currentRoom.length == 4;
  }

  dealRoom() {
    while (this.currentRoom.length < 4 && this.deck.length > 0) {
      this.currentRoom.push(this.deck.shift()!);
    }
    this.roomNumber++;
  }

  runFromRoom() {
    if (!this.canRun()) return;
    this.deck.push(...this.currentRoom);
    this.currentRoom = [];
    this.lastRanRoomNumber = this.roomNumber;
    this.dealRoom();
  }

  canFightWithWeapon(card: PlayingCard) {
    const hasWeapon = !!this.currentWeapon;
    const validMonster = this.weaponLastFought ? card.value < this.weaponLastFought.value : true;
    return hasWeapon && validMonster;
  }

  checkWeaponValue(): number {
    if (!this.currentWeapon) return 0;
    if (this.weaponLastFought === null) return this.currentWeapon.value;
    return this.weaponLastFought.value;
  }

  useCardFromRoom(index: number, options?: { useWeapon?: boolean }) {
    const card = this.currentRoom[index];
    if (!card) return;

    if ([Suit.CLUBS, Suit.SPADES].includes(card.suit)) {
      if (options?.useWeapon) {
        this.fightWithWeapon(card);
      } else {
        this.fightWithFists(card);
      }
    } else if ([Suit.DIAMONDS, Suit.HEARTS].includes(card.suit) && CardValue.JACK === card.value) {
      if (options?.useWeapon) {
        this.sellToMerchant(card);
      }
    } else if (Suit.DIAMONDS === card.suit) {
      this.equipWeapon(card);
    } else if (Suit.HEARTS === card.suit) {
      this.drinkPotion(card);
    } else {
      return;
    }

    this.currentRoom.splice(index, 1);
    this.discardPile.push(card);

    if (this.currentRoom.length === 1 && this.deck.length > 0) {
      this.dealRoom();
    }

    if (this.checkLoss()) {
      return this.gameLose();
    }

    if (this.currentRoom.length === 0) {
      return this.gameWin();
    }

    localStorage.setItem(CONSTANTS.STORAGE_KEYS.CURRENT_GAME, this.toJSONString());
  }

  gameWin() {
    if (typeof this.callbacks.onWin === 'function') {
      this.callbacks.onWin();
    }
    localStorage.removeItem(CONSTANTS.STORAGE_KEYS.CURRENT_GAME);
  }

  gameLose() {
    if (typeof this.callbacks.onLose === 'function') {
      this.callbacks.onLose();
    }
    localStorage.removeItem(CONSTANTS.STORAGE_KEYS.CURRENT_GAME);
  }

  private equipWeapon(card: PlayingCard | null) {
    if (this.currentWeapon) {
      this.discardPile.push(this.currentWeapon);
      this.weaponLastFought = null;
    }
    this.currentWeapon = card;
  }

  private drinkPotion(card: PlayingCard) {
    this.health = Math.min(20, this.health + card.value);
  }

  private fightWithWeapon(card: PlayingCard) {
    if (!this.currentWeapon) return this.fightWithFists(card);
    this.health -= Math.max(0, card.value - this.currentWeapon.value);
    if (this.weaponLastFought) {
      this.discardPile.push(this.weaponLastFought);
    }
    this.weaponLastFought = card;
  }

  private fightWithFists(card: PlayingCard) {
    this.health -= card.value;
  }

  private checkLoss() {
    return this.health <= 0;
  }

  private sellToMerchant(card: PlayingCard) {
    if (!this.currentWeapon) return;
    this.health = Math.min(20, this.health + this.checkWeaponValue());
    this.equipWeapon(null);
  }
}
