<template>
  <section>
    <div class="grid grid-cols-2 gap-4 justify-items-center mb-4 h-80">
      <PlayingCard
        v-for="(card, idx) in props.game.currentRoom"
        :key="`${card.suit}-${card.value}`"
        :card="card"
        class="h-36 cursor-pointer"
        role="button"
        @click="handleCardAction(idx)"
      ></PlayingCard>
    </div>
    <div class="flex justify-center h-12">
      <button
        v-if="props.game.canRun"
        class="btn bg-red-500 active:bg-red-700"
        @click="props.game.runFromRoom()"
      >
        Run From Room
      </button>
    </div>
    <FightDialog v-model="fightConfirm.show" :game="props.game" :card-idx="fightConfirm.roomIdx" />
    <MerchantDialog
      v-model="merchantConfirm.show"
      :game="props.game"
      :card-idx="merchantConfirm.roomIdx"
    />
  </section>
</template>

<script setup lang="ts">
import FightDialog from '@/components/FightDialog.vue';
import MerchantDialog from '@/components/MerchantDialog.vue';
import PlayingCard from '@/components/PlayingCard.vue';
import { CardValue, Suit } from '@/lib/CardDeck';
import { GameState } from '@/lib/GameState';
import { reactive } from 'vue';

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

function handleCardAction(index: number) {
  const card = props.game.currentRoom[index];
  if (!card) return;

  if (
    (card.suit == Suit.CLUBS || card.suit == Suit.SPADES) &&
    props.game.canFightWithWeapon(card)
  ) {
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
