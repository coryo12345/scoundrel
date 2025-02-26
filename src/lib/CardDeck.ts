export enum Suit {
  CLUBS,
  SPADES,
  HEARTS,
  DIAMONDS,
}

export interface SuitInfo {
  name: string;
}

export function getInfoFromSuit(suit: Suit): SuitInfo {
  switch (suit) {
    case Suit.CLUBS:
      return {
        name: 'Clubs',
      };
    case Suit.SPADES:
      return {
        name: 'Spades',
      };
    case Suit.HEARTS:
      return {
        name: 'Hearts',
      };
    case Suit.DIAMONDS:
      return {
        name: 'Diamonds',
      };
  }
}

export enum CardValue {
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
  EIGHT = 8,
  NINE = 9,
  TEN = 10,
  JACK = 11,
  QUEEN = 12,
  KING = 13,
  ACE = 14,
}

export interface ValueInfo {
  name: string;
  abbr: string;
}

export function getInfoFromValue(value: CardValue) {
  return [
    null,
    null,
    { name: 'Two', abbr: '2' },
    { name: 'Three', abbr: '3' },
    { name: 'Four', abbr: '4' },
    { name: 'Five', abbr: '5' },
    { name: 'Six', abbr: '6' },
    { name: 'Seven', abbr: '7' },
    { name: 'Eight', abbr: '8' },
    { name: 'Nine', abbr: '9' },
    { name: 'Ten', abbr: '10' },
    { name: 'Jack', abbr: 'J' },
    { name: 'Queen', abbr: 'Q' },
    { name: 'King', abbr: 'K' },
    { name: 'Ace', abbr: 'A' },
  ][value];
}

export class PlayingCard {
  suit: Suit;
  value: CardValue;

  constructor(suit: Suit, value: CardValue) {
    this.suit = suit;
    this.value = value;
  }
}

export type Deck = PlayingCard[];

export function newRandomDeck(includeMerchants = false): Deck {
  const deck: Deck = [];

  [Suit.CLUBS, Suit.SPADES].forEach((s) => {
    Object.values(CardValue)
      .filter((n) => Number(n) >= 0)
      .forEach((v) => {
        deck.push(new PlayingCard(s, v as CardValue));
      });
  });

  const maxValue = includeMerchants ? CardValue.JACK : CardValue.TEN;
  [Suit.DIAMONDS, Suit.HEARTS].forEach((s) => {
    Object.values(CardValue)
      .filter((n) => Number(n) >= 0 && Number(n) <= maxValue)
      .forEach((v) => {
        deck.push(new PlayingCard(s, v as CardValue));
      });
  });

  return shuffleDeck(deck);
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleDeck(deck: Deck): Deck {
  for (let i = deck.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  return deck;
}
