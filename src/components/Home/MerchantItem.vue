<script setup lang="ts">
  import DotSeparator from '@/components/DotSeparator.vue';
  import UserRating from '@/components/Merchant/UserRating.vue';
  import DeliveryFee from '@/components/Merchant/DeliveryFee.vue';
  import type { Merchant } from '@/stores/merchant/merchant';

  const props = defineProps<{
    merchant: Merchant;
    defaultMerchantLogoUrl: string;
  }>();
</script>

<template>
  <RouterLink
    :to="{ name: 'merchant', params: { merchantId: props.merchant.id } }"
  >
    <div
      class="grid grid-cols-5 gap-5 md:gap-3 px-5 md:px-3 py-3 md:rounded-xl border-b md:border"
    >
      <div
        class="col-span-1 rounded-full bg-gray-100 border aspect-square overflow-hidden"
        :class="{ grayscale: !props.merchant.available }"
      >
        <img
          class="w-full h-full object-cover"
          :src="
            props.merchant.logoUrl
              ? props.merchant.logoUrl
              : props.defaultMerchantLogoUrl
          "
          :alt="props.merchant.name"
        />
      </div>
      <div class="col-span-4 flex flex-col justify-center">
        <div class="font-medium text-lg mb-1 leading-5">
          {{ props.merchant.name }}
        </div>
        <div class="flex gap-1 font-light text-gray-500 -mt-0.5 mb-0.5 text-sm">
          <UserRating :rating="merchant.userRating" />
          <DotSeparator />
          <span>{{ props.merchant.mainCategory.name }}</span>
          <DotSeparator />
          <div class="">{{ props.merchant.distance }} km</div>
        </div>
        <div class="flex gap-1 font-light text-gray-500 text-sm">
          <span>{{ props.merchant.preparationTime }} min</span>
          <DotSeparator />
          <DeliveryFee :delivery-fee="props.merchant.deliveryFee" />
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped></style>
