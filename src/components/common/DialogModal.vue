<template>
  <dialog autofocus ref="dialogElement">
    <div class="bg-black opacity-50 fixed top-0 bottom-0 left-0 right-0"></div>
    <div class="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center py-8 px-6">
      <slot></slot>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { useTemplateRef, watch } from 'vue';

const show = defineModel<boolean>();

const dialogElement = useTemplateRef<HTMLDialogElement>('dialogElement');

watch(
  show,
  (val) => {
    if (val) dialogElement.value?.showModal();
    else dialogElement.value?.close();
  },
  { immediate: true },
);
</script>
