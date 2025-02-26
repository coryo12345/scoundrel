<template>
  <div class="text-white font-[Teko] text-2xl flex flex-col gap-8 relative">
    <GameSummary :game="currentGame"></GameSummary>
    <DungeonRoom :game="currentGame"></DungeonRoom>
    <EquippedWeapon :game="currentGame"></EquippedWeapon>
    <button
      class="absolute top-0 right-0 cursor-pointer bg-gray-600 rounded-full w-8 h-8"
      title="Leave Game"
      @click="router.push({ name: 'home' })"
    >
      X
    </button>
  </div>
</template>

<script setup lang="ts">
import DungeonRoom from '@/components/DungeonRoom.vue';
import EquippedWeapon from '@/components/EquippedWeapon.vue';
import GameSummary from '@/components/GameSummary.vue';
import { CONSTANTS } from '@/lib/Constants';
import { GameState } from '@/lib/GameState';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const game = ref<GameState>(new GameState());
const currentGame = computed(() => game.value as GameState);

onMounted(() => {
  if (route.query['continue'] == 'true') {
    game.value = GameState.FromJSONString(
      localStorage.getItem(CONSTANTS.STORAGE_KEYS.CURRENT_GAME) ?? '{}',
    );
  } else {
    game.value = new GameState({ includeMerchants: route.query.merchants === 'true' });
    game.value.dealRoom();
    localStorage.setItem(CONSTANTS.STORAGE_KEYS.CURRENT_GAME, game.value.toJSONString());
    router.replace({ name: 'game', query: Object.assign({}, route.query, { continue: 'true' }) });
  }
  game.value.callbacks.onWin = () => router.push({ name: 'end', query: { win: 'true' } });
  game.value.callbacks.onLose = () => router.push({ name: 'end' });
});
</script>

<style scoped></style>
