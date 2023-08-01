<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { merchantFixture } from '@/stores/merchant/merchant';
  import SecondaryButton from '@/components/Buttons/SecondaryButton.vue';
  import UserRating from '@/components/Merchant/UserRating.vue';
  import DotSeparator from '@/components/DotSeparator.vue';
  import DeliveryFee from '@/components/Merchant/DeliveryFee.vue';
  import MerchantItem from '@/components/Home/MerchantItem.vue';

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
      <MerchantItem
        v-for="merchant in merchants"
        :key="merchant.id"
        :merchant="merchant"
        :default-merchant-logo-url="defaultMerchantLogoUrl"
      />
      <div class="col-span-full p-5 md:p-0">
        <SecondaryButton class="w-full"> Ver mais</SecondaryButton>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
