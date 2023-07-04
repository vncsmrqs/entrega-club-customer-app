<script setup lang="ts">
  import MobileFullDrawer from '@/components/MobileFullDrawer.vue';
  import { onMounted, ref, watch } from 'vue';
  import MobileTopBar from '@/components/MobileTopBar.vue';
  import MainViewLayout from '@/components/MainViewLayout.vue';
  import StoreOutlineIcon from 'vue-material-design-icons/StoreOutline.vue';
  import StarIcon from 'vue-material-design-icons/Star.vue';
  import CircleSmallIcon from 'vue-material-design-icons/CircleSmall.vue';
  import PlusIcon from 'vue-material-design-icons/Plus.vue';
  import MinusIcon from 'vue-material-design-icons/Minus.vue';
  import CommentTextOutlineIcon from 'vue-material-design-icons/CommentTextOutline.vue';
  import { useRoute } from 'vue-router';
  import type { LocationQueryValue } from 'vue-router';
  import { useProductStore } from '@/stores/product';
  import { useMerchantStore } from '@/stores/merchant';

  const route = useRoute();

  const handleRouteEnter = async (
    productId: LocationQueryValue | LocationQueryValue[],
  ) => {
    if (!productId || Array.isArray(productId)) {
      hide();
      return;
    }

    show(productId as unknown as string);
  };

  watch(
    () => route.query.productId,
    (productId) => {
      handleRouteEnter(productId);
    },
  );

  const merchantStore = useMerchantStore();
  const merchant = merchantStore.merchant;

  const productStore = useProductStore();
  const product = productStore.product;

  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  let productId = ref<string | null>('');

  const show = (newProductId: string) => {
    productId.value = newProductId;
    drawer.value?.show();
  };

  const hide = () => {
    productId.value = null;
    drawer?.value?.hide();
  };

  const drawer = ref<InstanceType<typeof MobileFullDrawer> | null>(null);

  const loading = ref(true);

  onMounted(async () => {
    await handleRouteEnter(route.query.productId);

    setTimeout(() => {
      loading.value = false;
    }, 2000);
  });

  defineExpose({
    show,
    hide,
  });
</script>

<template>
  <MobileFullDrawer ref="drawer">
    <MainViewLayout v-if="!loading" class="product-drawer">
      <MobileTopBar class="z-10" :title="product.name" />
      <div class="bg-red-500 w-full aspect-photo overflow-hidden">
        <img class="w-full" :src="product.imageUrl" :alt="product.name" />
      </div>
      <div class="p-4 flex gap-4">
        <div class="flex-1">
          <h1 class="text-lg font-bold">{{ product.name }}</h1>
          <div v-if="product.description" class="mt-2 text-gray-500">
            {{ product.description }}
          </div>
          <div class="mt-4 flex items-center">
            <span class="text-green-700">{{
              currencyFormatter.format(product.unitPrice)
            }}</span>
            <div
              v-if="product.originalUnitPrice"
              class="text-gray-500 ml-2 text-sm line-through"
            >
              {{ currencyFormatter.format(product.originalUnitPrice) }}
            </div>
          </div>
        </div>
      </div>
      <div class="m-4 p-4 border rounded-lg">
        <div class="text-gray-500 flex items-center text-sm pb-1">
          <StoreOutlineIcon :size="16"></StoreOutlineIcon>
          <div class="ml-1">
            {{ merchant.name }}
          </div>
          <div class="flex-1"></div>
          <div class="inline-flex text-yellow-300 items-center">
            <StarIcon :size="14"></StarIcon>
            <span>{{ merchant.userRating }}</span>
          </div>
        </div>
        <div
          class="mt-1 pt-1 text-sm text-gray-400 flex items-center border-t border-dashed"
        >
          <span>30-90 min</span>
          <CircleSmallIcon></CircleSmallIcon>
          <span>{{ currencyFormatter.format(merchant.deliveryFee) }}</span>
        </div>
      </div>
      <div v-for="choice in product.choices" :key="choice.id">
        <div
          class="sticky top-16 bg-gray-100 text-gray-500 p-4 text-xl flex flex-col"
        >
          <span class="font-bold">{{ choice.name }}</span>
          <span class="text-sm text-gray-400"
            >Escolha até {{ choice.max }} opções</span
          >
        </div>
        <div
          v-for="garnishItem in choice.garnishItems"
          :key="garnishItem.id"
          class="p-4 flex border-b gap-4"
        >
          <div class="flex-1 flex items-center justify-between">
            <div class="flex flex-col">
              <span>{{ garnishItem.name }}</span>
              <span
                v-if="garnishItem.description"
                class="text-sm text-gray-500"
              >
                {{ garnishItem.description }}
              </span>
              <div v-if="garnishItem.unitPrice" class="mt-1 flex items-center">
                <span class="text-green-700 text-sm"
                  >+ {{ currencyFormatter.format(garnishItem.unitPrice) }}</span
                >
              </div>
            </div>
          </div>
          <div v-if="garnishItem.imageUrl" class="flex items-center">
            <div
              class="w-12 aspect-square border bg-gray-100 rounded-lg overflow-hidden"
            >
              <img
                class="w-full"
                :src="garnishItem.imageUrl"
                :alt="garnishItem.name"
              />
            </div>
          </div>
          <div class="flex items-center">
            <div
              v-if="choice.max > 1"
              class="border inline-flex items-center px-2 py-1 rounded-md"
            >
              <MinusIcon :size="16" class="text-red-500"></MinusIcon>
              <span class="px-2 text-sm">1</span>
              <PlusIcon :size="16" class="text-red-500"></PlusIcon>
            </div>
            <div v-else>
              <input
                :id="choice.id + garnishItem.id"
                type="radio"
                :value="garnishItem.id"
                :name="choice.id"
                class="w-5 h-5 text-red-500 bg-gray-100 border-gray-200 focus:ring-red-300 focus:ring-2"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="px-4 py-6">
        <label
          for="product-message"
          class="mb-2 text-gray-600 flex items-center justify-between"
        >
          <span class="inline-flex items-center">
            <CommentTextOutlineIcon :size="20" class="mr-1" />
            <span class="font-medium">Alguma observação?</span>
          </span>
          <span>0/140</span>
        </label>
        <textarea
          id="product-message"
          rows="4"
          class="block p-4 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ex: Tirar a cebola, maionese à parte, ponto da carne..."
        ></textarea>
      </div>
    </MainViewLayout>
    <div class="w-full bg-white fixed bottom-0 px-4 py-3 flex border-t gap-4">
      <div class="border inline-flex items-center px-2 py-1 rounded-md">
        <MinusIcon :size="24" class="text-red-500"></MinusIcon>
        <span class="px-2 text-sm">1</span>
        <PlusIcon :size="24" class="text-red-500"></PlusIcon>
      </div>
      <button
        class="flex-1 px-4 py-3 flex justify-between items-center rounded-lg bg-red-500 text-white font-bold"
      >
        <span>Adicionar</span>
        <span>R$ 54,99</span>
      </button>
    </div>
  </MobileFullDrawer>
</template>

<style scoped></style>
