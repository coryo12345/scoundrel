<template>
  <div class="flex flex-col justify-center items-center min-h-[100vh] py-12">
    <div class="flex-1"></div>
    <h2 class="text-6xl text-center text-white font-[Grechen]">Scoundrel</h2>
    <div class="flex-1"></div>
    <RouterLink
      v-if="hasSavedGame"
      :to="{ name: 'game', query: { continue: 'true' } }"
      class="btn bg-red-400 active:bg-red-600 mb-4"
    >
      Continue
    </RouterLink>
    <RouterLink :to="{ name: 'newgame' }" class="btn mb-4"> New Game </RouterLink>
    <RouterLink :to="{ name: 'rules' }" class="btn bg-cyan-600 active:bg-cyan-800">
      Rules
    </RouterLink>
    <div class="flex-1/2"></div>
  </div>
</template>

<script setup lang="ts">
import { CONSTANTS } from '@/lib/Constants';
import { onMounted, ref } from 'vue';

const hasSavedGame = ref(false);

onMounted(() => {
  if (localStorage.getItem(CONSTANTS.STORAGE_KEYS.CURRENT_GAME)?.length) {
    hasSavedGame.value = true;
  }
});
</script>

<style scoped>
button,
a {
  width: 10em;
}
</style>
