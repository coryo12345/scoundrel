<template>
  <section>
    <div class="grid grid-cols-2 gap-4 justify-items-center mb-2 h-80" ref="card-container">
      <PlayingCardContainer
        v-for="(id, idx) in slotIds"
        :id="id.id"
        class="h-36 z-50"
        :class="{ 'cursor-pointer': id.hasCard }"
        :role="id.hasCard ? 'button' : undefined"
        @click="handleCardAction(idx)"
      ></PlayingCardContainer>
    </div>
    <div class="flex justify-center h-12">
      <button
        v-if="props.game.canRun()"
        class="btn bg-red-500 active:bg-red-700"
        @click="props.game.runFromRoom()"
      >
        <span class="text-2xl">🏃</span>
        Run From Room
      </button>
    </div>
    <FightDialog v-model="fightConfirm.show" :game="props.game" :card-idx="fightConfirm.roomIdx" />
    <MerchantDialog
      v-model="merchantConfirm.show"
      :game="props.game"
      :card-idx="merchantConfirm.roomIdx"
    />
    <CardStack :game="props.game" />
  </section>
</template>

<script setup lang="ts">
import CardStack from '@/components/CardStack.vue';
import FightDialog from '@/components/FightDialog.vue';
import MerchantDialog from '@/components/MerchantDialog.vue';
import PlayingCardContainer from '@/components/PlayingCardContainer.vue';
import { CardValue, Suit } from '@/lib/CardDeck';
import { GameState } from '@/lib/GameState';
import { RenderSlot } from '@/lib/RenderedCardStack';
import { computed, reactive } from 'vue';

const props = defineProps<{
  game: GameState;
}>();

const fightConfirm = reactive({
  show: false,
  roomIdx: null as number | null,
});

const merchantConfirm = reactive({
  show: false,
  roomIdx: null as number | null,
});

const slotIds = computed(() => [
  { id: RenderSlot.ROOM1, hasCard: !!props.game.currentRoom[0] },
  { id: RenderSlot.ROOM2, hasCard: !!props.game.currentRoom[1] },
  { id: RenderSlot.ROOM3, hasCard: !!props.game.currentRoom[2] },
  { id: RenderSlot.ROOM4, hasCard: !!props.game.currentRoom[3] },
]);

function handleCardAction(index: number) {
  const card = props.game.currentRoom[index];
  if (!card) return;

  if (card.suit == Suit.CLUBS || card.suit == Suit.SPADES) {
    fightConfirm.roomIdx = index;
    fightConfirm.show = true;
  } else if (
    (card.suit == Suit.DIAMONDS || card.suit == Suit.HEARTS) &&
    card.value == CardValue.JACK
  ) {
    merchantConfirm.roomIdx = index;
    merchantConfirm.show = true;
  } else {
    props.game.useCardFromRoom(index);
  }
}
</script>
