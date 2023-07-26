<script setup lang="ts">
  import ShoppingOutlineIcon from 'vue-material-design-icons/ShoppingOutline.vue';
  import BagScreen from '@/components/Bag/BagScreen.vue';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import { markRaw } from 'vue';
  import { useRouter } from 'vue-router';
  import { useBagStore } from '@/stores/bag';
  import { formatToCurrency } from '@/utils';
  import DefaultButton from '@/components/DefaultButton.vue';

  const router = useRouter();

  const drawersControlStore = useDrawersControlStore();

  const bagStore = useBagStore();

  const showBag = () => {
    const drawer = drawersControlStore.add(markRaw(BagScreen), {});
    router.push({ hash: `#${drawer.id}` });
  };
</script>

<template>
  <DefaultButton
    @click="showBag"
    class="grid grid-cols-3 md:flex md:!p-2 shadow-sm md:shadow-none shadow-gray-500"
    :class="{
      'bg-primary-600 text-white': !bagStore.isEmpty,
      'text-gray-500': bagStore.isEmpty,
    }"
  >
    <span class="col-span-1 inline-flex">
      <span class="relative">
        <span
          v-show="!bagStore.isEmpty"
          class="absolute -top-2 -right-2 rounded-lg bg-white text-primary-600 text-xs px-1"
        >
          {{ bagStore.totalItems }}
        </span>
        <ShoppingOutlineIcon
          :class="{
            'text-primary-600': bagStore.isEmpty,
          }"
        />
      </span>
    </span>
    <template v-if="!bagStore.isEmpty">
      <span class="col-span-1 flex items-center justify-center md:text-sm">
        Ver sacola
      </span>
      <span class="col-span-1 flex items-center justify-end md:text-sm">
        {{ formatToCurrency(bagStore.totalPrice) }}
      </span>
    </template>
  </DefaultButton>
</template>

<style scoped></style>
