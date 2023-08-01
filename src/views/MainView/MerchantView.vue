<script setup lang="ts">
  import { computed, markRaw, onMounted, ref } from 'vue';
  import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';
  import IntersectionItem from '@/components/IntersectionItem.vue';
  import { debounce, formatToCurrency } from '@/utils';
  import { useMerchantStore } from '@/stores/merchant/merchant';
  import type { Merchant } from '@/stores/merchant/merchant';
  import type { MerchantCatalog } from '@/stores/merchant/merchant-catalog';
  import { useMerchantCatalogStore } from '@/stores/merchant/merchant-catalog';
  import type { Product } from '@/stores/merchant/product';
  import AddOrEditProductBagScreen from '@/components/Product/AddOrEditProductBagScreen.vue';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import { useRoute, useRouter } from 'vue-router';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import IconButton from '@/components/IconButton.vue';
  import BackButton from '@/components/BackButton.vue';
  import ScreenSide from '@/components/Screen/ScreenSide.vue';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';
  import UserRating from '@/components/Merchant/UserRating.vue';
  import MerchantHeader from '@/components/Merchant/MerchantHeader.vue';
  import ScreenLoader from '@/components/Screen/ScreenLoader.vue';
  import ScreenError from '@/components/Screen/ScreenError.vue';
  import ProductCarousselItem from '@/components/Product/ProductCarousselItem.vue';
  import ProductListItem from '@/components/Product/ProductListItem.vue';

  const merchantStore = useMerchantStore();
  const merchantCatalogStore = useMerchantCatalogStore();

  const merchant = computed<Merchant>(() => merchantStore.merchant);
  const catalog = computed<MerchantCatalog>(
    () => merchantCatalogStore.merchantCatalog,
  );

  const defaultMerchantBannerImgUrl = ref('/images/merchant/logo-default.png');

  const intersectMenu = (entry: IntersectionObserverEntry, menuId: string) => {
    if (entry.isIntersecting) {
      scrollToMenu(menuId);
    }
  };

  const scrollToMenu = debounce((menuId: string) => {
    menuActive.value = menuId;
    const container = document.querySelector('.menu-tab-container');
    const tab = document.querySelector(`#menu-tab-${menuId}`);
    if (!container || !tab) return;
    const { left } = tab.getBoundingClientRect();
    container.scrollLeft = container.scrollLeft + left - 16;
  }, 300);

  const selectMenuTab = debounce((menuId: string) => {
    const content = document.querySelector(`#menu-content-item-${menuId}`);
    const tabContainer = document.querySelector('.menu-tab-container');
    const contentContainer =
      document.querySelector('#merchant-main')?.parentElement;
    const merchantScreenHeader = document.querySelector(
      '#merchant-screen-header',
    );

    if (content && contentContainer && tabContainer && merchantScreenHeader) {
      const { y: contentDistanceToTop } = content.getBoundingClientRect();
      const tabContainerHeight = tabContainer.scrollHeight;
      const merchantScreenHeaderHeight = merchantScreenHeader.scrollHeight;

      const scroll =
        contentContainer.scrollTop +
        contentDistanceToTop -
        (tabContainerHeight + merchantScreenHeaderHeight);

      contentContainer.scrollTo(0, scroll);
    }
  }, 100);

  const menuActive = ref('');

  const route = useRoute();

  onMounted(async () => {
    const merchantId = route.params.merchantId as string;
    await merchantStore.fetch(merchantId);
    if (!merchantStore.error) {
      await merchantCatalogStore.fetch(merchantId);
    }
  });
</script>
<template>
  <ScreenRoot>
    <ScreenHeader id="merchant-screen-header" class="md:hidden">
      <template #left>
        <BackButton />
      </template>
      {{ merchant.name }}
      <template #right>
        <IconButton>
          <MagnifyIcon class="text-primary-600" />
        </IconButton>
      </template>
    </ScreenHeader>
    <ScreenLoader v-if="merchantStore.loading" />
    <ScreenError v-else-if="merchantStore.error" />
    <ScreenMain v-else id="merchant-main" :with-padding="false" class="md:p-5">
      <ScreenSide>
        <div class="flex flex-col gap-5">
          <div class="md:rounded-xl md:border border-b overflow-hidden">
            <div class="bg-gray-100 w-full aspect-banner">
              <img
                class="w-full h-full object-cover"
                :src="
                  merchant.bannerUrl
                    ? merchant.bannerUrl
                    : defaultMerchantBannerImgUrl
                "
                :alt="merchant.name"
              />
            </div>
            <MerchantHeader :merchant="merchant" />
          </div>
          <div class="md:rounded-xl border mb-5 md:m-0 overflow-hidden">
            <div class="flex-1 flex gap-1 items-center p-5 justify-between">
              <h2 class="font-bold text-lg">Avaliações (23)</h2>
              <UserRating :rating="merchant.userRating" />
            </div>
          </div>
        </div>
      </ScreenSide>
      <ScreenContent>
        <div class="md:border rounded-xl">
          <div
            v-for="section in catalog.sections"
            :key="section.id"
            class="border-b border-t md:border-t-0"
          >
            <div class="w-full text-xl font-bold p-5 border-b">
              {{ section.name }}
            </div>
            <div class="gap-4 flex flex-nowrap overflow-x-auto p-5">
              <ProductCarousselItem
                v-for="product in section.products"
                :key="product.id"
                :product="product"
              />
            </div>
          </div>
          <div
            class="md:hidden menu-tab-container sticky top-0 bg-white px-4 py-2 flex flex-nowrap overflow-x-auto gap-4 border-y scroll-smooth"
          >
            <button
              v-for="menu in catalog.menus"
              :key="menu.id"
              class="whitespace-nowrap px-4 py-2 rounded-lg bg-gray-100"
              :class="{
                'bg-primary-100 text-primary-600': menu.id === menuActive,
              }"
              :id="`menu-tab-${menu.id}`"
              @click="() => selectMenuTab(menu.id)"
            >
              {{ menu.name }}
            </button>
          </div>
          <div class="flex flex-col">
            <IntersectionItem
              v-for="menu in catalog.menus"
              :key="menu.id"
              :id="`menu-content-item-${menu.id}`"
              class="menu w-full"
              @intersect="(entry) => intersectMenu(entry, menu.id)"
              :threshold="0.5"
            >
              <div class="text-xl font-bold p-5">{{ menu.name }}</div>
              <ProductListItem
                v-for="product in menu.products"
                :key="product.id"
                :product="product"
              />
            </IntersectionItem>
          </div>
        </div>
      </ScreenContent>
    </ScreenMain>
  </ScreenRoot>
</template>

<style>
  html {
    scroll-behavior: smooth;
  }
</style>
