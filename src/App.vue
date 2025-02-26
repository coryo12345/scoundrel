<template>
  <main class="px-4 py-2 bg-slate-800">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<style scoped>
main {
  height: 100vh;
}
</style>
