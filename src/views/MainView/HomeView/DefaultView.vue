<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import SecondaryButton from '@/components/Buttons/SecondaryButton.vue';
  import MerchantItem from '@/components/Home/MerchantItem.vue';
  import { useListMerchantStore } from '@/stores/merchant/list-merchant';
  import LoaderComponent from '@/components/LoaderComponent.vue';

  const defaultMerchantLogoUrl = ref('/images/merchant/logo-default.png');

  const listMerchantStore = useListMerchantStore();

  const fetchMore = () => {
    listMerchantStore.fetch(listMerchantStore.offset + listMerchantStore.limit);
  };

  onMounted(() => {
    listMerchantStore.fetch();
  });
</script>

<template>
  <div class="md:border md:rounded-xl">
    <div class="flex items-center justify-between p-5 border-b">
      <span class="font-bold text-xl">Famosos no Entrega Club</span>
      <span class="text-sm text-primary-600">Ver mais</span>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:p-5">
      <MerchantItem
        v-for="merchant in listMerchantStore.merchantList"
        :key="merchant.id"
        :merchant="merchant"
        :default-merchant-logo-url="defaultMerchantLogoUrl"
      />
      <div
        v-if="listMerchantStore.error"
        class="col-span-full p-5 flex justify-center text-red-600"
      >
        {{ listMerchantStore.error }}
      </div>
      <div
        v-if="listMerchantStore.loading"
        class="col-span-full p-5 flex justify-center text-primary-600"
      >
        <LoaderComponent />
      </div>
      <div
        v-if="!listMerchantStore.loading"
        class="col-span-full p-5 md:p-0 flex justify-center"
      >
        <SecondaryButton @click="fetchMore" full>Ver mais</SecondaryButton>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
