<script setup lang="ts">
  import TabButton from '@/components/Search/TabButton.vue';
  import { onMounted, ref, watch } from 'vue';
  import MerchantItem from '@/components/Home/MerchantItem.vue';
  import ProductListItem from '@/components/Product/ProductListItem.vue';
  import SearchFilterButton from '@/components/Search/SearchFilterButton.vue';
  import EmptyResult from '@/components/Search/EmptyResult.vue';
  import { useSearchStore } from '@/stores/search/search';
  import SearchLoader from '@/components/Search/SearchLoader.vue';
  import { useDrawerNavigation } from '@/composables/useDrawerNavigation';
  import { useRoute } from 'vue-router';
  import type { LocationQueryValue } from 'vue-router';

  const route = useRoute();
  const searchStore = useSearchStore();
  const drawerNavigation = useDrawerNavigation();

  const canUpdateTabRoute = false;

  type TabType = 'MERCHANTS' | 'PRODUCTS';
  const DEFAULT_TAB = 'MERCHANTS';

  const tab = ref<TabType>(DEFAULT_TAB);

  const setTab = (value: TabType | string | undefined | null) => {
    if (value === tab.value) {
      return;
    }

    const validTabs = ['MERCHANTS', 'PRODUCTS'];

    if (value && validTabs.includes(value)) {
      tab.value = value as TabType;
      updateTabRoute();
      return;
    }
    tab.value = DEFAULT_TAB;
    updateTabRoute();
  };

  const updateTabRoute = () => {
    if (!canUpdateTabRoute) {
      return;
    }

    if (route.query.tab === tab.value) {
      return;
    }

    drawerNavigation.navigate(
      { query: { tab: tab.value } },
      { preserveHash: true, preserveQuery: true },
    );
  };

  const handleTabQuery = (value: string | null | LocationQueryValue[]) => {
    if (value) {
      if (Array.isArray(value)) {
        setTab(value[0]);
        return;
      }
      setTab(value);
      return;
    }

    tab.value = DEFAULT_TAB;
  };
  watch(() => route.query.tab, handleTabQuery);

  onMounted(() => {
    handleTabQuery(route.query.tab);
  });
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
          "{{ searchStore.term }}"
        </div>
      </div>
      <div class="col-span-1 text-right">
        <SearchFilterButton v-if="!searchStore.isEmpty" />
      </div>
    </div>
    <div class="grid grid-cols-2 bg-white sticky top-0 z-10">
      <TabButton
        :active="tab === 'MERCHANTS'"
        @click="() => setTab('MERCHANTS')"
      >
        <span class="relative"> Estabelecimentos </span>
      </TabButton>
      <TabButton :active="tab === 'PRODUCTS'" @click="() => setTab('PRODUCTS')">
        <span class="relative"> Produtos </span>
      </TabButton>
    </div>
    <Transition name="fade" mode="out-in" appear>
      <div v-if="tab === 'MERCHANTS'" class="w-full">
        <template v-if="searchStore.loading">
          <SearchLoader class="mt-20" />
        </template>
        <template v-else-if="!searchStore.totalMerchants">
          <EmptyResult class="mt-20" />
        </template>
        <template v-else>
          <div
            class="md:mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4"
          >
            <MerchantItem
              v-for="merchant in searchStore.merchants"
              :key="merchant.id"
              :merchant="merchant"
              default-merchant-logo-url="teste"
            />
          </div>
        </template>
      </div>
      <div v-else-if="tab === 'PRODUCTS'" class="w-full">
        <template v-if="searchStore.loading">
          <SearchLoader class="mt-20" />
        </template>
        <template v-else-if="!searchStore.totalProducts">
          <EmptyResult class="mt-20" />
        </template>
        <template v-else>
          <div
            class="md:mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4"
          >
            <ProductListItem
              v-for="product in searchStore.products"
              :key="product.id"
              :product="product"
            />
          </div>
        </template>
      </div>
    </Transition>
  </div>
</template>

<style scoped></style>
