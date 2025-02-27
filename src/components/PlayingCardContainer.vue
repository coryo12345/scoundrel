<template>
  <div :style="containerStyle"></div>
</template>

<script setup lang="ts">
import { CONSTANTS } from '@/lib/Constants';
import { computed } from 'vue';

const containerStyle = computed(
  () => `width: ${CONSTANTS.CARD_SIZE * 2.25}px; height: ${CONSTANTS.CARD_SIZE * 3.5}px;`,
);
</script>
