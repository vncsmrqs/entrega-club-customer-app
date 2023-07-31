<script setup lang="ts">
  import { formatToCurrency } from '@/utils';
  import type { MerchantPriceRange } from '@/stores/merchant/merchant';
  import CurrencyUsdIcon from 'vue-material-design-icons/CurrencyUsd.vue';

  const props = defineProps<{
    priceRange: MerchantPriceRange;
  }>();

  const priceRangeMap = {
    VERY_CHEAP: 1,
    CHEAP: 2,
    REGULAR: 3,
    EXPENSIVE: 4,
    VERY_EXPENSIVE: 5,
  };
</script>

<template>
  <span class="inline-flex">
    <CurrencyUsdIcon
      v-for="i in 5"
      :key="i"
      :size="20"
      :class="{
        'text-primary-600': i <= priceRangeMap[props.priceRange],
        'text-gray-200': i > priceRangeMap[props.priceRange],
        '-ml-2': i > 1,
      }"
    />
  </span>
</template>

<style scoped></style>
