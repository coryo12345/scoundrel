<template>
  <section>
    <h2 class="text-5xl">Room {{ props.game.roomNumber }}</h2>
    <p>
      <span class="font-bold tracking-wide text-cyan-400">
        {{ props.game.deck.length }}
      </span>
      Cards Left
    </p>
    <p>
      Health:
      <span class="font-bold tracking-wide" :class="healthColor">
        {{ props.game.health }} / 20
      </span>
    </p>
  </section>
</template>

<script setup lang="ts">
import { GameState } from '@/lib/GameState';
import { computed } from 'vue';

const props = defineProps<{
  game: GameState;
}>();

const healthColor = computed(() => {
  if (props.game.health > 12) return 'text-green-400';
  if (props.game.health > 5) return 'text-yellow-500';
  return 'text-red-500';
});
</script>
