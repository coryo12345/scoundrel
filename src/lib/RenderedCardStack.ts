import type { Deck, PlayingCard } from '@/lib/CardDeck';
import { CONSTANTS } from '@/lib/Constants';
import { computed, ref } from 'vue';

export interface RenderedCard {
  card: PlayingCard;
  top: string;
  left: string;
}

export const RenderSlot = {
  DECK: 'render-container-deck',
  DISCARD: 'render-container-discard',
  WEAPON: 'render-container-weapon',
  WEAPON_LAST_FOUGHT: 'render-container-weapon-last-fought',
  ROOM1: 'render-container-room-1',
  ROOM2: 'render-container-room-2',
  ROOM3: 'render-container-room-3',
  ROOM4: 'render-container-room-4',
};

const cardStack = ref<RenderedCard[]>([]);
const slots = ref<Partial<Record<keyof typeof RenderSlot, HTMLElement>>>({});
export function useCardStack() {
  function initialize(deck: Deck) {
    cardStack.value = [];
    deck.forEach((card) => {
      cardStack.value.push({
        card,
        top: '-150px',
        left: `calc(50% - ${CONSTANTS.CARD_SIZE}px)`,
      });
    });
    slots.value = {};
  }

  const cards = computed<RenderedCard[]>(() => cardStack.value);

  function moveCardToSlot(playingcard: PlayingCard, slot: string) {
    const element = document.getElementById(slot);
    const card = cardStack.value.find((c) => c.card.equals(playingcard));
    if (!card || !element) return;
    const box = element.getBoundingClientRect();
    card.top = `${box.top}px`;
    card.left = `${box.left}px`;
  }

  return {
    initialize,
    moveCardToSlot,
    cards,
  };
}
