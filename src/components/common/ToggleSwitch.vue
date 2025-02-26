<template>
  <label class="relative inline-block h-10 w-20">
    <input v-model="checked" type="checkbox" class="opacity-0 w-0 h-0" />
    <span
      class="absolute cursor-pointer top-0 left-0 bottom-0 right-0 transition rounded-full p-1"
      :class="bgColor"
    >
      <div class="transition h-full aspect-square bg-gray-50 rounded-full" :style="position"></div>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const checked = defineModel<boolean>();

const bgColor = computed(() => (!!checked.value ? 'bg-blue-500' : 'bg-gray-400'));
const position = computed(() => (!!checked.value ? 'transform: translateX(40px);' : ''));
</script>

<style scoped></style>
