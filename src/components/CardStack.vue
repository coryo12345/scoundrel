<template>
  <div>
    <div
      v-for="card in cardStack.cards.value"
      :key="`playingcard-${card.card.suit}-${card.card.value}`"
      class="fixed animated-card"
      :style="`top: ${card.top}; left: ${card.left};`"
    >
      <PlayingCard :card="card.card" class="z-10"></PlayingCard>
    </div>
    <PlayingCardContainer :id="RenderSlot.DECK" class="deck-container" />
    <PlayingCardContainer :id="RenderSlot.DISCARD" class="discard-container" />
  </div>
</template>

<script setup lang="ts">
import PlayingCard from '@/components/PlayingCard.vue';
import PlayingCardContainer from '@/components/PlayingCardContainer.vue';
import { newDeck } from '@/lib/CardDeck';
import type { GameState } from '@/lib/GameState';
import { RenderSlot, useCardStack } from '@/lib/RenderedCardStack';
import { onMounted } from 'vue';

const props = defineProps<{
  game: GameState;
}>();

const cardStack = useCardStack();

onMounted(() => {
  cardStack.initialize(newDeck(true));
});
</script>

<style scoped>
.animated-card {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.445, 0.05, 0.55, 0.95);
  transition-duration: 0.6s;
}

.deck-container {
  position: fixed;
  /* we could v-bind to make this more accurate, but this is probably close enough */
  top: -150px;
  left: 47%;
}

.discard-container {
  position: fixed;
  left: 110%;
  top: 47%;
}
</style>
