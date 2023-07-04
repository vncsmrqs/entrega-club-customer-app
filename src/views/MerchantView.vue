<script setup lang="ts">
  import { computed, onMounted } from 'vue';
  import MobileTopBar from '@/components/MobileTopBar.vue';
  import MainViewLayout from '@/components/MainViewLayout.vue';
  import IconRounded from '@/components/IconRounded.vue';
  import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';
  import StarIcon from 'vue-material-design-icons/Star.vue';

  const merchant = computed(() => ({
    id: 'd9969801-5203-4f6a-ba4b-6bc8af8d8fac',
    slug: 'jaiba-mg/o-rei-da-pizza',
    available: true,
    preparationTime: 10,
    name: 'O rei da pizza',
    logo: '/icon-192x192.png',
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

  import { useRouter, useRoute } from 'vue-router';

  const router = useRouter();
  const route = useRoute();

  const showProduct = (productId: string) => {
    router.push({
      path: route.fullPath,
      query: { productId },
    });
  };

  onMounted(() => {});
</script>
<template>
  <MainViewLayout class="notification-view">
    <MobileTopBar :title="merchant.name">
      <template #right>
        <button>
          <IconRounded ghost>
            <MagnifyIcon class="text-red-500" />
          </IconRounded>
        </button>
      </template>
    </MobileTopBar>
    <div class="bg-red-500 w-full aspect-banner"></div>
    <div class="p-4 flex gap-4">
      <div
        class="w-12 h-12 bg-gray-100 rounded-full overflow-hidden border-gray-200"
      >
        <img :src="merchant.logo" :alt="merchant.name" />
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
        <div
          v-for="i in 10"
          :key="i"
          class="w-2/5 flex-shrink-0 rounded-lg border"
        >
          <div class="w-full aspect-photo bg-gray-100"></div>
          <div class="text-sm p-2 flex flex-col gap-2">
            <div class="h-10 text-ellipsis overflow-hidden">
              Nome do produto
              {{ i === 3 ? '(Nome bem grande mesmo)' : '' }}
            </div>
            <div class="flex items-center mt-2">
              <span class="text-green-700">R$ 40,00</span>
              <div class="text-gray-500 ml-2 text-sm line-through">
                R$ 40,00
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="sticky top-16 bg-white px-4 py-2 flex flex-nowrap overflow-x-auto gap-2 border-y"
    >
      <button
        v-for="i in 10"
        :key="i"
        class="whitespace-nowrap px-4 py-2 rounded-lg bg-gray-100"
        :class="{ 'bg-red-100 text-red-500': i === 1 }"
      >
        Grupo {{ i }}
      </button>
    </div>
    <div class="mt-8 flex flex-wrap gap-4 px-4">
      <div v-for="menu in 5" :key="menu" class="w-full">
        <div class="text-xl font-bold mb-4">Menu {{ menu }}</div>
        <div
          v-for="product in ['1', '2', '3']"
          :key="product"
          @click="() => showProduct(product)"
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
        </div>
      </div>
    </div>
  </MainViewLayout>
</template>

<style>
  .notification-view {
    @apply min-h-screen flex flex-col;
  }
</style>
