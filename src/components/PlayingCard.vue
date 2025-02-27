<template>
  <div
    class="bg-yellow-50 relative flex justify-center rounded items-center"
    :style="containerStyle"
  >
    <span class="absolute top-1 left-2 text-black text-xl font-serif">{{ num }}</span>
    <span class="absolute bottom-1 right-2 rotate-180 text-black text-xl font-serif">
      {{ num }}
    </span>
    <SuitIcon :width="CONSTANTS.CARD_SIZE" :height="CONSTANTS.CARD_SIZE" />
  </div>
</template>

<script setup lang="tsx">
import { getInfoFromValue, Suit, type PlayingCard } from '@/lib/CardDeck';
import { CONSTANTS } from '@/lib/Constants';
import { computed } from 'vue';

const props = defineProps<{
  card: PlayingCard;
}>();

const containerStyle = computed(
  () => `width: ${CONSTANTS.CARD_SIZE * 2.25}px; height: ${CONSTANTS.CARD_SIZE * 3.5}px;`,
);

const num = computed(() => getInfoFromValue(props.card.value)?.abbr ?? '');

const SuitIcon = ({ width, height }: { width: string | number; height: string | number }) => {
  return {
    [Suit.CLUBS]: (
      <svg width={width} height={height} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#000000"
          d="M477.443 295.143a104.45 104.45 0 0 1-202.26 36.67c-.08 68.73 4.33 114.46 69.55 149h-177.57c65.22-34.53 69.63-80.25 69.55-149a104.41 104.41 0 1 1-66.34-136.28 104.45 104.45 0 1 1 171.14 0 104.5 104.5 0 0 1 135.93 99.61z"
        />
      </svg>
    ),
    [Suit.SPADES]: (
      <svg width={width} height={height} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 0L1.03553 6.96447C0.372492 7.62751 0 8.52678 0 9.46447V9.54584C0 11.4535 1.54648 13 3.45416 13C4.1361 13 4.80278 12.7981 5.37019 12.4199L7.125 11.25L6 15V16H10V15L8.875 11.25L10.6298 12.4199C11.1972 12.7981 11.8639 13 12.5458 13C14.4535 13 16 11.4535 16 9.54584V9.46447C16 8.52678 15.6275 7.62751 14.9645 6.96447L8 0Z"
          fill="#000000"
        />
      </svg>
    ),
    [Suit.HEARTS]: (
      <svg
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 510.977 510.977"
      >
        <g>
          <path
            fill="#D71E00"
            d="M255.22,105.177c19.535-49.77,61.325-87.79,113.231-87.79c43.705,0,79.625,23.111,108.871,54.44
		c38.859,41.622,56.17,137.216-15.863,209.24c-36.546,36.546-205.815,212.524-205.815,212.524S86.384,317.613,49.838,281.066
		c-72.033-72.024-55.578-167.618-15.863-209.24c29.581-31.002,65.165-54.44,108.871-54.44
		C194.751,17.386,235.685,55.407,255.22,105.177"
          />
        </g>
      </svg>
    ),
    [Suit.DIAMONDS]: (
      <svg width={width} height={height} viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#D71E00"
          d="M18.437 35.747c-.242.337-.632.337-.874 0L5.314 18.612c-.242-.338-.242-.886 0-1.224L17.563.253c.242-.338.632-.338.874 0l12.25 17.135c.241.338.241.886 0 1.224l-12.25 17.135z"
        ></path>
      </svg>
    ),
  }[props.card.suit];
};
</script>
