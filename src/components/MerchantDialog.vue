<template>
  <DialogModal v-model="show">
    <div class="max-w-[375px] bg-gray-900 border border-white text-white px-4 py-8">
      <h3 class="text-3xl mb-8 text-center">You have found a merchant!</h3>
      <div class="flex flex-col items-center gap-4 text-center">
        <template v-if="!props.game.currentWeapon">
          <p>You have no weapon to sell.</p>
          <button class="btn" @click="pass">
            <span class="text-2xl">☕️</span>
            Continue
          </button>
        </template>
        <template v-else>
          <p>Would you like to sell your weapon?</p>
          <p class="text-gray-300 italic">(You will heal {{ potentialHeartsToHeal }} health)</p>
          <button class="btn" @click="sell">
            <span class="text-2xl">💰</span>
            Sell
          </button>
          <button class="btn bg-cyan-600 active:bg-cyan-800" @click="pass">
            <span class="text-2xl">🚶‍♂️</span>
            Move On
          </button>
        </template>
        <button class="btn bg-red-400 active:bg-red-600 mt-8" @click="show = false">
          <span class="text-2xl">🚫</span>
          Back
        </button>
      </div>
    </div>
  </DialogModal>
</template>

<script setup lang="ts">
import DialogModal from '@/components/common/DialogModal.vue';
import type { GameState } from '@/lib/GameState';
import { computed } from 'vue';

const props = defineProps<{
  game: GameState;
  cardIdx: number | null;
}>();
const show = defineModel<boolean>();

const potentialHeartsToHeal = computed(() => props.game.checkWeaponValue());

function pass() {
  if (typeof props.cardIdx !== 'number') return;
  props.game.useCardFromRoom(props.cardIdx, { useWeapon: false });
  show.value = false;
}

function sell() {
  if (typeof props.cardIdx !== 'number') return;
  props.game.useCardFromRoom(props.cardIdx, { useWeapon: true });
  show.value = false;
}
</script>
