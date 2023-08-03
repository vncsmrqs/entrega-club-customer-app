<script setup lang="ts">
  import { formatToCurrency } from '@/utils';
  import type { Product } from '@/stores/merchant/product';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import { markRaw } from 'vue';
  import AddOrEditProductBagScreen from '@/components/Product/AddOrEditProductBagScreen.vue';
  import { useDrawerNavigation } from '@/composables/useDrawerNavigation';

  const props = defineProps<{ product: Product }>();

  const drawersControlStore = useDrawersControlStore();
  const drawerNavigation = useDrawerNavigation();

  const showProduct = () => {
    const drawer = drawersControlStore.add(markRaw(AddOrEditProductBagScreen), {
      productProp: props.product,
    });
    drawerNavigation.openDrawer(drawer.id);
  };
</script>

<template>
  <div
    class="w-56 flex-shrink-0 rounded-lg border cursor-pointer"
    @click="showProduct"
  >
    <div class="w-full aspect-photo bg-gray-100 overflow-hidden rounded-t-lg">
      <img
        class="w-full h-full object-cover"
        :src="props.product.imageUrl"
        :alt="props.product.name"
      />
    </div>
    <div class="text-sm p-2 flex flex-col gap-2">
      <div class="h-10 text-ellipsis overflow-hidden">
        {{ props.product.name }}
      </div>
      <div class="flex items-center mt-2">
        <span class="text-green-700">
          {{ formatToCurrency(props.product.unitPrice) }}
        </span>
        <div class="text-gray-500 ml-2 text-sm line-through">
          {{ formatToCurrency(props.product.originalUnitPrice) }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
