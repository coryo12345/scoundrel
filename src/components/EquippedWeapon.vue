<template>
  <section class="relative">
    <div class="flex items-center justify-between flex-wrap">
      <div class="flex-1/2">
        <div class="h-8">
          <p v-if="props.game.currentWeapon" class="text-center">Current Weapon</p>
        </div>
        <PlayingCardContainer :id="RenderSlot.WEAPON" class="mx-auto" />
      </div>
      <div class="flex-1/2">
        <div class="h-8">
          <p v-if="props.game.weaponLastFought" class="text-center">Last Fought</p>
        </div>
        <PlayingCardContainer :id="RenderSlot.WEAPON_LAST_FOUGHT" class="mx-auto" />
      </div>
    </div>
    <p v-if="!props.game.currentWeapon" class="absolute top-0 w-full text-center">
      No Weapon Equipped
    </p>
  </section>
</template>

<script setup lang="ts">
import PlayingCardContainer from '@/components/PlayingCardContainer.vue';
import { GameState } from '@/lib/GameState';
import { RenderSlot } from '@/lib/RenderedCardStack';

const props = defineProps<{
  game: GameState;
}>();
</script>
