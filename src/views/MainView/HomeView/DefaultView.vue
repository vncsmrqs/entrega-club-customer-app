<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { merchantFixture } from '@/stores/merchant/merchant';
  import SecondaryButton from '@/components/Buttons/SecondaryButton.vue';
  import UserRating from '@/components/Merchant/UserRating.vue';
  import DotSeparator from '@/components/DotSeparator.vue';
  import DeliveryFee from '@/components/Merchant/DeliveryFee.vue';

  const defaultMerchantLogoUrl = ref('/images/merchant/logo-default.png');

  const merchants = reactive(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(merchantFixture),
  );
</script>

<template>
  <div class="md:border md:rounded-xl">
    <div class="flex items-center justify-between p-5 border-b">
      <span class="font-bold text-xl">Famosos no Entrega Club</span>
      <span class="text-sm text-primary-600">Ver mais</span>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 md:gap-4 md:p-5">
      <RouterLink
        v-for="merchant in merchants"
        :key="merchant.id"
        :to="{ name: 'merchant', params: { merchantId: merchant.id } }"
      >
        <div
          class="grid grid-cols-5 gap-5 md:gap-3 p-5 md:px-3 md:py-3 md:rounded-xl border-b md:border items-center"
        >
          <div
            class="col-span-1 rounded-full bg-gray-100 border aspect-square overflow-hidden"
            :class="{ grayscale: !merchant.available }"
          >
            <img
              class="w-full h-full object-cover"
              :src="
                merchant.logoUrl ? merchant.logoUrl : defaultMerchantLogoUrl
              "
              :alt="merchant.name"
            />
          </div>
          <div class="col-span-4 flex flex-col justify-center gap-1">
            <div class="font-medium text-lg mb-1 leading-5">
              {{ merchant.name }}
            </div>
            <div class="flex gap-2 font-light text-gray-500 text-sm">
              <UserRating :rating="merchant.userRating" />
              <DotSeparator />
              <span>{{ merchant.mainCategory.name }}</span>
              <DotSeparator />
              <div class="">{{ merchant.distance }} km</div>
            </div>
            <div class="flex gap-2 font-light text-gray-500 text-sm">
              <span>{{ merchant.preparationTime }} min</span>
              <DotSeparator />
              <DeliveryFee :delivery-fee="merchant.deliveryFee" />
            </div>
          </div>
        </div>
      </RouterLink>
      <div class="col-span-full p-5 md:p-0">
        <SecondaryButton class="w-full"> Ver mais</SecondaryButton>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
