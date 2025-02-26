<template>
  <main class="px-4 py-2 bg-slate-800">
    <div class="max-w-[375px] mx-auto">
      <RouterView />
    </div>
  </main>
  <pwa-install
    ref="pwainstall"
    manifest-url="/manifest.webmanifest"
    use-local-storage="true"
  ></pwa-install>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted, useTemplateRef } from 'vue';
import type { PWAInstallElement } from '@khmyznikov/pwa-install';

const pwainstall = useTemplateRef<PWAInstallElement>('pwainstall');

// onMounted(() => {
//   pwainstall.value?.showDialog(true);
// });
</script>

<style scoped>
main {
  height: 100vh;
}
</style>
