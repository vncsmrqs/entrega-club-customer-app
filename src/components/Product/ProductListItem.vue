<script setup lang="ts">
  import { formatToCurrency } from '@/utils';
  import type { Product } from '@/stores/merchant/product';

  const props = defineProps<{ product: Product }>();
</script>

<template>
  <div class="w-full border-y flex justify-between cursor-pointer gap-4 p-5">
    <div>
      <div>{{ props.product.name }}</div>
      <div class="text-gray-500 text-sm">
        {{ props.product.description }}
      </div>
      <div class="flex items-center mt-2">
        <span class="text-green-700">{{
          formatToCurrency(props.product.unitPrice)
        }}</span>
        <div
          v-if="props.product.originalUnitPrice"
          class="text-gray-500 ml-2 text-sm line-through"
        >
          {{ formatToCurrency(props.product.originalUnitPrice) }}
        </div>
      </div>
    </div>
    <div>
      <div
        class="w-24 aspect-photo rounded-lg border bg-gray-100 overflow-hidden"
      >
        <img
          class="w-full h-full object-cover"
          :src="props.product.imageUrl"
          :alt="props.product.name"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
