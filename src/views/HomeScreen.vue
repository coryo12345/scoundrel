<template>
  <!-- Main content -->
  <div class="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
    <!-- Title section with animated glow -->
    <div class="relative">
      <h2 class="text-7xl text-center text-white font-[Grechen] animate-pulse-slow">Scoundrel</h2>
      <div class="absolute inset-0 bg-red-500/20 blur-2xl animate-pulse-slow"></div>
    </div>

    <!-- Subtitle with animated underline -->
    <p class="text-3xl text-gray-300 font-[Teko] mt-4 relative group">
      A card-based dungeon-crawling game
    </p>

    <!-- Game buttons with hover effects -->
    <div class="mt-12 space-y-6 w-full max-w-md">
      <RouterLink
        v-if="hasSavedGame"
        :to="{ name: 'game', query: { continue: 'true' } }"
        class="btn bg-red-500 hover:bg-red-600 active:bg-red-700"
      >
        <span class="text-2xl">🎮</span>
        Continue Adventure
      </RouterLink>

      <RouterLink
        :to="{ name: 'newgame' }"
        class="btn bg-teal-500 hover:bg-teal-600 active:bg-teal-700"
      >
        <span class="text-2xl">✨</span>
        Start New Quest
      </RouterLink>

      <RouterLink
        :to="{ name: 'rules' }"
        class="btn bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800"
      >
        <span class="text-2xl">📖</span>
        Game Rules
      </RouterLink>
    </div>
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
@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(12deg);
  }
  50% {
    transform: translateY(-20px) rotate(12deg);
  }
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-float {
  animation: float 5s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}
</style>
