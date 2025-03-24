<template>
  <main class="px-4 py-2 bg-slate-800 relative">
    <BackgroundTexture />
    <div class="max-w-[375px] mx-auto relative">
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
import BackgroundTexture from '@/components/display/BackgroundTexture.vue';
import type { PWAInstallElement } from '@khmyznikov/pwa-install';
import { useTemplateRef } from 'vue';
import { RouterView } from 'vue-router';

const pwainstall = useTemplateRef<PWAInstallElement>('pwainstall');
</script>

<style scoped>
main {
  min-height: 100vh;
}
</style>
