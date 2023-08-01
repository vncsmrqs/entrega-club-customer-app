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

  const selectedTab = ref(1);

  const merchants: Merchant[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
    merchantFixture,
  );

  const products: Product[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
    productFixture,
  );
</script>

<template>
  <div class="w-full">
    <div class="text-xl font-bold p-5">
      Buscando por <span class="text-primary-600">burguer</span>
    </div>
    <div class="grid grid-cols-2 bg-white sticky top-0 z-10">
      <TabButton :active="selectedTab === 1" @click="selectedTab = 1">
        <span class="relative"> Estabelecimentos </span>
      </TabButton>
      <TabButton :active="selectedTab === 2" @click="selectedTab = 2">
        <span class="relative"> Produtos </span>
      </TabButton>
    </div>
    <TabItem :show="selectedTab === 1">
      <div class="flex flex-col">
        <MerchantItem
          v-for="merchant in merchants"
          :key="merchant.id"
          :merchant="merchant"
          default-merchant-logo-url="teste"
        />
      </div>
    </TabItem>
    <TabItem :show="selectedTab === 2">
      <ProductListItem
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </TabItem>
  </div>
</template>

<style scoped></style>
