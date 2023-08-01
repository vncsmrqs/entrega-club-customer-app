<script setup lang="ts">
  import { formatToCurrency } from '@/utils';
  import type { Merchant } from '@/stores/merchant/merchant';
  import DotSeparator from '@/components/DotSeparator.vue';
  import PriceRange from '@/components/Merchant/MerchantPriceRange.vue';
  import DeliveryFee from '@/components/Merchant/DeliveryFee.vue';

  const props = defineProps<{ merchant: Merchant }>();
</script>

<template>
  <div class="p-4 flex gap-4">
    <div>
      <div
        class="w-20 bg-gray-100 aspect-square rounded-full overflow-hidden border-gray-200"
      >
        <img class="w-full" :src="merchant.logoUrl" :alt="merchant.name" />
      </div>
    </div>
    <div class="flex-1 flex flex-col gap-1">
      <h2 class="font-bold text-lg">{{ props.merchant.name }}</h2>
      <div class="w-full flex items-center text-sm">
        <div class="flex-1 flex gap-2 font-light text-gray-500 text-sm">
          <span>{{ props.merchant.mainCategory.name }}</span>
          <DotSeparator />
          <span>{{ props.merchant.distance }} km</span>
          <DotSeparator />
          <PriceRange :price-range="props.merchant.priceRange" />
        </div>
      </div>
      <div class="flex gap-2 font-light text-gray-500 text-sm">
        <div class="flex gap-2 font-light text-gray-500 text-sm">
          <span>{{ props.merchant.preparationTime }} min</span>
          <DotSeparator />
          <DeliveryFee :delivery-fee="merchant.deliveryFee" />
        </div>
      </div>
      <div class="flex gap-2 font-light text-gray-500 text-sm">
        <span class="flex-1 text-gray-500">
          Pedido mínimo:
          {{ formatToCurrency(props.merchant.minimumOrderValue) }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
