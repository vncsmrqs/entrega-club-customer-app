<script setup lang="ts">
  import TabButton from '@/components/Search/TabButton.vue';
  import { ref } from 'vue';
  import TabItem from '@/components/Search/TabItem.vue';
  import MerchantItem from '@/components/Home/MerchantItem.vue';
  import { merchantFixture } from '@/stores/merchant/merchant';
  import type { Merchant } from '@/stores/merchant/merchant';
  import { productFixture } from '@/stores/merchant/product';
  import type { Product } from '@/stores/merchant/product';
  import ProductListItem from '@/components/Product/ProductListItem.vue';
  import SearchFilterButton from '@/components/Search/SearchFilterButton.vue';

  const selectedTab = ref(1);

  const merchants: Merchant[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
    merchantFixture,
  );

  const products: Product[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
    productFixture,
  );

  const term = ref('burguer');
</script>

<template>
  <div class="w-full md:p-5">
    <div
      class="text-xl font-bold px-5 py-4 grid grid-cols-4 auto-cols-min justify-between border-b gap-4"
    >
      <div class="col-span-3">
        Buscando por
        <div
          class="text-primary-600 text-ellipsis whitespace-nowrap overflow-hidden"
        >
          "{{ term }}"
        </div>
      </div>
      <div class="col-span-1 text-right">
        <SearchFilterButton v-show="true" />
      </div>
    </div>
    <div class="grid grid-cols-2 lg:flex bg-white sticky top-0 z-10">
      <TabButton :active="selectedTab === 1" @click="selectedTab = 1">
        <span class="relative"> Estabelecimentos </span>
      </TabButton>
      <TabButton :active="selectedTab === 2" @click="selectedTab = 2">
        <span class="relative"> Produtos </span>
      </TabButton>
    </div>
    <TabItem :show="selectedTab === 1">
      <div
        class="md:mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4"
      >
        <MerchantItem
          v-for="merchant in merchants"
          :key="merchant.id"
          :merchant="merchant"
          default-merchant-logo-url="teste"
        />
      </div>
    </TabItem>
    <TabItem :show="selectedTab === 2">
      <div
        class="md:mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4"
      >
        <ProductListItem
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </TabItem>
  </div>
</template>

<style scoped></style>
