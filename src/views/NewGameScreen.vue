<template>
  <section class="flex flex-col justify-center items-center text-white font-[Teko] mt-12">
    <h2 class="text-5xl text-center mb-8">You are about to enter the dungeon...</h2>
    <p class="text-2xl text-center mb-2">
      Would you like to encounter merchants while fighting your way through the dungeon?
    </p>
    <p class="text-xl text-center italic text-gray-300 mb-8">
      A merchant card (Red Jack) will buy your current weapon off of you and give you health. (See
      rules for more details)
    </p>
    <div class="flex flex-wrap gap-4 items-center justify-center mb-12">
      <ToggleSwitch v-model="includeMerchants" />
      <span class="text-3xl w-6">{{ includeMerchants ? 'Yes' : 'No' }}</span>
    </div>
    <button class="btn mb-4" @click="enter">Face The Challenge</button>
    <RouterLink :to="{ name: 'home' }" class="btn bg-red-400 active:bg-red-600">
      Go Back
    </RouterLink>
  </section>
</template>

<script setup lang="ts">
import ToggleSwitch from '@/components/common/ToggleSwitch.vue';
import { CONSTANTS } from '@/lib/Constants';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const includeMerchants = ref(false);

onMounted(() => {
  const key = localStorage.getItem(CONSTANTS.STORAGE_KEYS.USE_MERCHANTS);
  if (key && key.toLowerCase() === 'true') {
    includeMerchants.value = true;
  } else {
    includeMerchants.value = false;
  }
});

function enter() {
  localStorage.setItem(CONSTANTS.STORAGE_KEYS.USE_MERCHANTS, includeMerchants.value.toString());
  router.push({ name: 'game', query: { merchants: includeMerchants.value.toString() } });
}
</script>

<style scoped>
button,
a {
  width: 10em;
}
</style>
