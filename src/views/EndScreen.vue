<template>
  <section class="font-[Teko] mt-20 text-white flex justify-center items-center flex-col">
    <h1 class="text-6xl text-center mb-12">{{ headerText }}</h1>
    <p class="text-4xl text-center mb-20">{{ text }}</p>
    <RouterLink :to="{ name: 'home' }" class="btn bg-cyan-600 active:bg-cyan-800 mb-2">
      Go Home
    </RouterLink>
    <RouterLink :to="{ name: 'newgame' }" class="btn mb-2"> Play Again </RouterLink>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const headerText = computed(() =>
  route.query.win == 'true' ? 'The Dungeon Has Been Cleared!' : 'Game Over',
);
const text = computed(() => (route.query.win == 'true' ? 'You Win! 🎉' : 'You Lose 😥'));
</script>

<style scoped>
button,
a {
  width: 10em;
}
</style>
