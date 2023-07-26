<script setup lang="ts">
  import { markRaw, onMounted, ref } from 'vue';
  import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';
  import IntersectionItem from '@/components/IntersectionItem.vue';
  import { debounce, formatToCurrency } from '@/utils';
  import { useMerchantStore } from '@/stores/merchant';
  import type { MerchantCatalog } from '@/stores/merchant-catalog';
  import { useMerchantCatalogStore } from '@/stores/merchant-catalog';
  import type { Product } from '@/stores/product';
  import ProductScreen from '@/components/Product/ProductScreen.vue';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import { useRouter } from 'vue-router';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import IconButton from '@/components/IconButton.vue';
  import BackButton from '@/components/BackButton.vue';
  import ScreenSide from '@/components/Screen/ScreenSide.vue';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';
  import UserRating from '@/components/Merchant/UserRating.vue';
  import DeliveryFee from '@/components/Merchant/DeliveryFee.vue';
  import DotSeparator from '@/components/DotSeparator.vue';
  import PriceRange from '@/components/Merchant/PriceRange.vue';

  const merchantStore = useMerchantStore();
  const merchant = merchantStore.merchant;

  const merchantCatalogStore = useMerchantCatalogStore();
  const merchantCatalog: MerchantCatalog = merchantCatalogStore.merchantCatalog;

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

  const router = useRouter();
  const drawersControlStore = useDrawersControlStore();

  const showProduct = (product: Product) => {
    const drawer = drawersControlStore.add(markRaw(ProductScreen), {
      productProp: product,
    });
    router.push({ hash: `#${drawer.id}` });
  };

  onMounted(() => {});
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
    <ScreenMain id="merchant-main" :with-padding="false" class="md:p-5">
      <ScreenSide>
        <div class="flex flex-col gap-5">
          <div class="md:rounded-xl md:border overflow-hidden">
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
            <div class="p-4 flex gap-4">
              <div>
                <div
                  class="w-20 bg-gray-100 aspect-square rounded-full overflow-hidden border-gray-200"
                >
                  <img
                    class="w-full"
                    :src="merchant.logoUrl"
                    :alt="merchant.name"
                  />
                </div>
              </div>
              <div class="flex-1 flex flex-col gap-1">
                <h2 class="font-bold text-lg">{{ merchant.name }}</h2>
                <div class="w-full flex items-center text-sm">
                  <div
                    class="flex-1 flex gap-2 font-light text-gray-500 text-sm"
                  >
                    <span>{{ merchant.mainCategory }}</span>
                    <DotSeparator />
                    <span>{{ merchant.distance }} km</span>
                    <DotSeparator />
                    <PriceRange :price-range="merchant.priceRange" />
                  </div>
                </div>
                <div class="flex gap-2 font-light text-gray-500 text-sm">
                  <div class="flex gap-2 font-light text-gray-500 text-sm">
                    <span>{{ merchant.preparationTime }} min</span>
                    <DotSeparator />
                    <DeliveryFee :delivery-fee="merchant.deliveryFee" />
                  </div>
                </div>
                <div class="flex gap-2 font-light text-gray-500 text-sm">
                  <span class="flex-1 text-gray-500">
                    Pedido mínimo:
                    {{ formatToCurrency(merchant.minimumOrderValue) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="md:rounded-xl md:border overflow-hidden">
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
            v-for="section in merchantCatalog.sections"
            :key="section.id"
            class="border-b border-t md:border-t-0"
          >
            <div class="w-full text-xl font-bold p-5 border-b">
              {{ section.name }}
            </div>
            <div class="gap-4 flex flex-nowrap overflow-x-auto p-5">
              <div
                v-for="product in section.products"
                :key="product.id"
                class="w-56 flex-shrink-0 rounded-lg border cursor-pointer"
                @click="() => showProduct(product)"
              >
                <div class="w-full aspect-photo bg-gray-100">
                  <img
                    class="w-full h-full object-cover"
                    :src="product.imageUrl"
                    :alt="product.name"
                  />
                </div>
                <div class="text-sm p-2 flex flex-col gap-2">
                  <div class="h-10 text-ellipsis overflow-hidden">
                    {{ product.name }}
                  </div>
                  <div class="flex items-center mt-2">
                    <span class="text-green-700">
                      {{ formatToCurrency(product.unitPrice) }}
                    </span>
                    <div class="text-gray-500 ml-2 text-sm line-through">
                      {{ formatToCurrency(product.originalUnitPrice) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="md:hidden menu-tab-container sticky top-0 bg-white px-4 py-2 flex flex-nowrap overflow-x-auto gap-4 border-y scroll-smooth"
          >
            <button
              v-for="menu in merchantCatalog.menus"
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
              v-for="menu in merchantCatalog.menus"
              :key="menu.id"
              :id="`menu-content-item-${menu.id}`"
              class="menu w-full"
              @intersect="(entry) => intersectMenu(entry, menu.id)"
              :threshold="0.5"
            >
              <div class="text-xl font-bold p-5">{{ menu.name }}</div>
              <div
                v-for="product in menu.products"
                :key="product.id"
                @click="() => showProduct(product)"
                class="w-full border-y flex justify-between cursor-pointer gap-4 p-5"
              >
                <div>
                  <div>{{ product.name }}</div>
                  <div class="text-gray-500 text-sm">
                    {{ product.description }}
                  </div>
                  <!--            <div class="mt-2 text-xs">Serve até 1 pessoa</div>-->
                  <div class="flex items-center mt-2">
                    <span class="text-green-700">{{
                      formatToCurrency(product.unitPrice)
                    }}</span>
                    <div
                      v-if="product.originalUnitPrice"
                      class="text-gray-500 ml-2 text-sm line-through"
                    >
                      {{ formatToCurrency(product.originalUnitPrice) }}
                    </div>
                  </div>
                </div>
                <div>
                  <div class="w-24 aspect-photo rounded-lg border bg-gray-100">
                    <img
                      class="w-full h-full object-cover"
                      :src="product.imageUrl"
                      :alt="product.name"
                    />
                  </div>
                </div>
              </div>
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