<script setup lang="ts">
  import { markRaw, onMounted, ref } from 'vue';
  import MobileTopBar from '@/components/Screen/ScreenHeader.vue';
  import MainViewLayout from '@/components/MainViewLayout.vue';
  import IconRounded from '@/components/IconRounded.vue';
  import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';
  import StarIcon from 'vue-material-design-icons/Star.vue';
  import IntersectionItem from '@/components/IntersectionItem.vue';
  import { debounce, formatToCurrency } from '@/utils';
  import { useMerchantStore } from '@/stores/merchant';
  import type { MerchantCatalog } from '@/stores/merchant-catalog';
  import { useMerchantCatalogStore } from '@/stores/merchant-catalog';
  import type { Product } from '@/stores/product';
  import ProductDrawer from '@/components/ProductDrawer.vue';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import { useRouter } from 'vue-router';

  const merchantStore = useMerchantStore();
  const merchant = merchantStore.merchant;

  const merchantCatalogStore = useMerchantCatalogStore();
  const merchantCatalog: MerchantCatalog = merchantCatalogStore.merchantCatalog;

  const defaultMerchantBannerImgUrl = ref(
    '/images/merchant/banner-default.png',
  );

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
    if (content) {
      const { y } = content.getBoundingClientRect();
      window.scrollTo(0, window.scrollY + y - 17 * 8);
    }
  }, 10);

  const menuActive = ref('');

  const router = useRouter();
  const drawersControlStore = useDrawersControlStore();
  const showProduct = (product: Product) => {
    const drawer = drawersControlStore.add(markRaw(ProductDrawer), { product });
    router.push({ hash: `#${drawer.id}` });
  };

  onMounted(() => {});
</script>
<template>
  <MainViewLayout class="merchant-view">
    <MobileTopBar :title="merchant.name">
      <template #right>
        <button>
          <IconRounded ghost>
            <MagnifyIcon class="text-primary-600" />
          </IconRounded>
        </button>
      </template>
    </MobileTopBar>
    <div class="bg-primary-600 w-full aspect-banner">
      <img
        class="w-full h-full object-cover"
        :src="
          merchant.bannerUrl ? merchant.bannerUrl : defaultMerchantBannerImgUrl
        "
        :alt="merchant.name"
      />
    </div>
    <div class="p-4 flex gap-4">
      <div
        class="w-12 h-12 bg-gray-100 rounded-full overflow-hidden border-gray-200"
      >
        <img class="w-full" :src="merchant.logoUrl" :alt="merchant.name" />
      </div>
      <div class="flex-1">
        <h2 class="font-bold">{{ merchant.name }}</h2>
        <div class="w-full flex items-center text-sm">
          <!--          <span class="text-primary-600">Ver mais</span>-->
          <span class="flex-1 text-gray-500">
            Pedido mínimo:
            {{ formatToCurrency(merchant.minimumOrderValue) }}
          </span>
          <div class="inline-flex text-yellow-300 items-center">
            <StarIcon :size="14"></StarIcon>
            <span>{{ merchant.userRating }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white my-4">
      <div class="w-full text-xl font-bold px-4">Os mais pedidos</div>
      <div class="gap-4 flex flex-nowrap overflow-x-auto py-4 px-4">
        <RouterLink
          v-for="product in ['1', '3', '3', '4', '5']"
          :key="product"
          class="w-2/5 flex-shrink-0 rounded-lg border"
          :to="`?productId=${product}`"
        >
          <div class="w-full aspect-photo bg-gray-100"></div>
          <div class="text-sm p-2 flex flex-col gap-2">
            <div class="h-10 text-ellipsis overflow-hidden">
              Nome do produto
              {{ product === '3' ? '(Nome bem grande mesmo)' : '' }}
            </div>
            <div class="flex items-center mt-2">
              <span class="text-green-700">R$ 40,00</span>
              <div class="text-gray-500 ml-2 text-sm line-through">
                R$ 40,00
              </div>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
    <div
      class="menu-tab-container sticky top-16 bg-white px-4 py-2 flex flex-nowrap overflow-x-auto gap-4 border-y scroll-smooth"
    >
      <button
        v-for="menu in merchantCatalog.menus"
        :key="menu.id"
        class="whitespace-nowrap px-4 py-2 rounded-lg bg-gray-100"
        :class="{ 'bg-primary-100 text-primary-600': menu.id === menuActive }"
        :id="`menu-tab-${menu.id}`"
        @click="() => selectMenuTab(menu.id)"
      >
        {{ menu.name }}
      </button>
    </div>
    <div class="mt-8 flex flex-wrap gap-4 px-4">
      <IntersectionItem
        v-for="menu in merchantCatalog.menus"
        :key="menu.id"
        :id="`menu-content-item-${menu.id}`"
        class="menu w-full"
        @intersect="(entry) => intersectMenu(entry, menu.id)"
        :threshold="0.5"
      >
        <div class="text-xl font-bold mb-4">{{ menu.name }}</div>
        <div
          v-for="product in menu.products"
          :key="product.id"
          @click="() => showProduct(product)"
          class="py-4 w-full border-y flex justify-between cursor-pointer gap-4"
        >
          <div>
            <div>{{ product.name }}</div>
            <div class="text-gray-500 text-sm">{{ product.description }}</div>
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
            <div class="w-24 aspect-photo rounded-lg border bg-primary-100">
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
  </MainViewLayout>
</template>

<style>
  html {
    scroll-behavior: smooth;
  }

  .merchant-view {
    @apply min-h-screen flex flex-col;
  }
</style>
