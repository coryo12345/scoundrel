<template>
  <section>
    <div v-if="props.game.currentWeapon" class="grid grid-cols-2 justify-items-center">
      <div>
        <p class="text-center">Current Weapon</p>
        <PlayingCard :card="props.game.currentWeapon" class="mx-3" />
      </div>
      <div v-if="props.game.weaponLastFought">
        <p class="text-center">Last Fought</p>
        <PlayingCard :card="props.game.weaponLastFought" class="mx-3" />
      </div>
    </div>
    <p v-else>No Weapon Equipped</p>
  </section>
</template>

<script setup lang="ts">
import PlayingCard from '@/components/PlayingCard.vue';
import { GameState } from '@/lib/GameState';

const props = defineProps<{
  game: GameState;
}>();
</script>
