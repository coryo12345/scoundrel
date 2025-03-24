<template>
  <div
    class="fixed left-0 top-0 w-full min-h-screen bg-gradient-to-b from-black to-black overflow-hidden"
  >
    <!-- Animated background cards -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        v-for="n in 10"
        :key="n"
        class="absolute w-32 h-48 bg-red-500/10 rounded-lg transform rotate-12 animate-float"
        :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${5 + Math.random() * 5}s`,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
