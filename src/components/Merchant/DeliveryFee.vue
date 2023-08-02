<script setup lang="ts">
  import { formatToCurrency } from '@/utils';

  const props = defineProps<{
    deliveryFee: number;
  }>();
</script>

<template>
  <span v-if="props.deliveryFee">
    {{ formatToCurrency(props.deliveryFee) }}
  </span>
  <span v-else class="text-green-700 rounded-md"> Entrega grátis </span>
</template>

<style scoped></style>
