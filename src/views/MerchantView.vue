<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import MobileTopBar from '@/components/MobileTopBar.vue';
  import MainViewLayout from '@/components/MainViewLayout.vue';
  import IconRounded from '@/components/IconRounded.vue';
  import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';
  import StarIcon from 'vue-material-design-icons/Star.vue';
  import IntersectionItem from '@/components/IntersectionItem.vue';
  import { debounce } from '@/utils';

  const merchant = computed(() => ({
    id: 'd9969801-5203-4f6a-ba4b-6bc8af8d8fac',
    slug: 'jaiba-mg/o-rei-da-pizza',
    available: true,
    preparationTime: 10,
    name: 'O rei da pizza',
    logo: '/icon-maskable-512x512.png',
    banner: null,
    minimumOrderValue: 'R$ 40,00',
    userRating: 4.7,
    categories: ['Pizza'],
    distance: 3,
    type: 'RESTAURANT',
    priceRange: 1,
    deliveryFee: 10,
    deliveryMethods: [
      {
        deliveredBy: 'MERCHANT',
        mode: 'DELIVERY',
        subtitle: 'O entregador leva até você agora',
        title: 'Entrega',
        maxTime: 10,
        minTime: 0,
      },
      {
        deliveredBy: null,
        maxTime: 10,
        minTime: 0,
        mode: 'TAKEOUT',
        subtitle: 'Você retira seu pedido no local',
        title: 'Retirada',
      },
    ],
  }));

  const defaultMerchantBannerImgUrl = ref(
    '/images/merchant/banner-default.png',
  );

  const intersectMenu = (entry: IntersectionObserverEntry, menu: number) => {
    if (entry.isIntersecting) {
      scrollToTab(menu);
    }
  };

  const scrollToTab = debounce((menu: number) => {
    menuActive.value = menu;
    const container = document.querySelector('.menu-tab-container');
    const tab = document.querySelector(`#menu-tab-${menu}`);
    if (!container || !tab) return;
    const { left } = tab.getBoundingClientRect();
    container.scrollLeft = container.scrollLeft + left - 16;
  }, 300);

  const selectMenuTab = debounce((menu: number) => {
    const content = document.querySelector(`#menu-content-item-${menu}`);
    if (content) {
      const { y } = content.getBoundingClientRect();
      window.scrollTo(0, window.scrollY + y - 17 * 8);
    }
  }, 100);

  const menuActive = ref(1);

  onMounted(() => {});
</script>
<template>
  <MainViewLayout class="merchant-view">
    <MobileTopBar :title="merchant.name">
      <template #right>
        <button>
          <IconRounded ghost>
            <MagnifyIcon class="text-red-500" />
          </IconRounded>
        </button>
      </template>
    </MobileTopBar>
    <div class="bg-red-500 max-w-md w-full aspect-banner">
      <div
        class="w-full h-full object-cover bg-fixed"
        :style="{
          backgroundImage: merchant.banner
            ? merchant.banner
            : `url(${defaultMerchantBannerImgUrl})`,
        }"
      />
    </div>
    <div class="p-4 flex gap-4">
      <div
        class="w-12 h-12 bg-gray-100 rounded-full overflow-hidden border-gray-200"
      >
        <img class="w-full" :src="merchant.logo" :alt="merchant.name" />
      </div>
      <div class="flex-1">
        <h2 class="font-bold">{{ merchant.name }}</h2>
        <div class="w-full flex items-center text-sm">
          <!--          <span class="text-red-500">Ver mais</span>-->
          <span class="flex-1 text-gray-500"
            >Pedido mínimo: {{ merchant.minimumOrderValue }}</span
          >
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
        v-for="menu in 10"
        :key="menu"
        class="whitespace-nowrap px-4 py-2 rounded-lg bg-gray-100"
        :class="{ 'bg-red-100 text-red-500': menu === menuActive }"
        :id="`menu-tab-${menu}`"
        @click="() => selectMenuTab(menu)"
      >
        Menu {{ menu }}
      </button>
    </div>
    <div class="mt-8 flex flex-wrap gap-4 px-4">
      <IntersectionItem
        :id="`menu-content-item-${menu}`"
        v-for="menu in 10"
        :key="menu"
        class="menu w-full"
        @intersect="(entry) => intersectMenu(entry, menu)"
        :threshold="1"
      >
        <div class="text-xl font-bold mb-4">Menu {{ menu }}</div>
        <RouterLink
          v-for="product in ['1', '2', '3']"
          :key="product"
          :to="`?productId=${product}`"
          class="py-4 w-full border-y flex justify-between cursor-pointer"
        >
          <div>
            <div>Produto {{ product }}</div>
            <div class="text-gray-500 text-sm">Descrição do produto</div>
            <div class="mt-2 text-xs">Serve até 1 pessoa</div>
            <div class="flex items-center mt-2">
              <span class="text-green-700">R$ 40,00</span>
              <div class="text-gray-500 ml-2 text-sm line-through">
                R$ 40,00
              </div>
            </div>
          </div>
          <div>
            <div class="w-32 aspect-photo rounded-lg border bg-gray-100"></div>
          </div>
        </RouterLink>
      </IntersectionItem>
    </div>
  </MainViewLayout>
</template>

<style>
  .merchant-view {
    @apply min-h-screen flex flex-col;
  }
</style>
