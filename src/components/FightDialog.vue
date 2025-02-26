<template>
  <DialogModal v-model="show">
    <div class="bg-gray-900 border border-white text-white mt-20 mx-6 px-4 py-8">
      <h3 class="text-3xl mb-8 text-center">Choose Your Battle</h3>
      <div class="flex justify-evenly flex-wrap">
        <div>
          <button class="cursor-pointer text-center" @click="pickWeapon">
            <div class="w-30 h-30 bg-yellow-50 flex justify-center items-center mx-auto">
              <SwordIcon class="max-w-20 max-h-20"></SwordIcon>
            </div>
            <p>Use Your Weapon</p>
          </button>
          <p v-if="withWeaponDamage" class="text-center text-xl text-red-500 italic">
            -{{ withWeaponDamage }} health
          </p>
          <p v-else class="text-center text-xl italic text-green-600">No Damage</p>
        </div>
        <div>
          <button class="cursor-pointer text-center" @click="pickHands">
            <div class="w-30 h-30 bg-yellow-50 flex justify-center items-center mx-auto">
              <FistIcon class="max-w-20 max-h-20"></FistIcon>
            </div>
            <p>Fight Bare-Handed</p>
          </button>
          <p class="text-center text-xl text-red-500 italic">-{{ withHandsDamage }} health</p>
        </div>
      </div>
      <div class="flex justify-center mt-8">
        <button
          class="bg-red-500 capitalize text-white rounded px-4 py-2 cursor-pointer active:bg-red-700"
          @click="show = false"
        >
          Cancel
        </button>
      </div>
    </div>
  </DialogModal>
</template>

<script setup lang="tsx">
import DialogModal from '@/components/common/DialogModal.vue';
import { GameState } from '@/lib/GameState';
import { computed } from 'vue';

const props = defineProps<{
  game: GameState;
  cardIdx: number | null;
}>();
const show = defineModel<boolean>();

const withWeaponDamage = computed(() => {
  if (props.cardIdx === null) return 0;
  if (!props.game.currentWeapon) return withHandsDamage.value;
  return Math.max(0, props.game.currentRoom[props.cardIdx].value - props.game.currentWeapon.value);
});
const withHandsDamage = computed(() => {
  if (props.cardIdx === null) return 0;
  return props.game.currentRoom[props.cardIdx].value;
});

function pickWeapon() {
  if (typeof props.cardIdx !== 'number') return;
  props.game.useCardFromRoom(props.cardIdx, { useWeapon: true });
  show.value = false;
}

function pickHands() {
  if (typeof props.cardIdx !== 'number') return;
  props.game.useCardFromRoom(props.cardIdx, { useWeapon: false });
  show.value = false;
}

const SwordIcon = () => {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 0H13L3.70711 9.29289L2.20711 7.79289L0.792893 9.20711L3.08579 11.5L1.5835 13.0023C1.55586 13.0008 1.52802 13 1.5 13C0.671573 13 0 13.6716 0 14.5C0 15.3284 0.671573 16 1.5 16C2.32843 16 3 15.3284 3 14.5C3 14.472 2.99923 14.4441 2.99771 14.4165L4.5 12.9142L6.79289 15.2071L8.20711 13.7929L6.70711 12.2929L16 3V0Z"
        fill="#000000"
      />
    </svg>
  );
};

const FistIcon = () => {
  return (
    <svg viewBox="-64 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#000000"
        d="M255.98 160V16c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v146.93c5.02-1.78 10.34-2.93 15.97-2.93h48.03zm128 95.99c-.01-35.34-28.66-63.99-63.99-63.99H207.85c-8.78 0-15.9 7.07-15.9 15.85v.56c0 26.27 21.3 47.59 47.57 47.59h35.26c9.68 0 13.2 3.58 13.2 8v16.2c0 4.29-3.59 7.78-7.88 8-44.52 2.28-64.16 24.71-96.05 72.55l-6.31 9.47a7.994 7.994 0 0 1-11.09 2.22l-13.31-8.88a7.994 7.994 0 0 1-2.22-11.09l6.31-9.47c15.73-23.6 30.2-43.26 47.31-58.08-17.27-5.51-31.4-18.12-38.87-34.45-6.59 3.41-13.96 5.52-21.87 5.52h-32c-12.34 0-23.49-4.81-32-12.48C71.48 251.19 60.33 256 48 256H16c-5.64 0-10.97-1.15-16-2.95v77.93c0 33.95 13.48 66.5 37.49 90.51L63.99 448v64h255.98v-63.96l35.91-35.92A96.035 96.035 0 0 0 384 344.21l-.02-88.22zm-32.01-90.09V48c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v112h32c11.28 0 21.94 2.31 32 5.9zM16 224h32c8.84 0 16-7.16 16-16V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v128c0 8.84 7.16 16 16 16zm95.99 0h32c8.84 0 16-7.16 16-16V48c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v160c0 8.84 7.16 16 16 16z"
      />
    </svg>
  );
};
</script>
