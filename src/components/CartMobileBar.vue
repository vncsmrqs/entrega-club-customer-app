<script setup lang="ts">
  import CartOutlineIcon from 'vue-material-design-icons/CartOutline.vue';
  import CartDrawer from '@/components/CartDrawer.vue';
  import { ref } from 'vue';

  const drawer = ref<InstanceType<typeof CartDrawer> | null>(null);

  const showCart = () => {
    drawer.value?.show();
  };
</script>

<template>
  <div class="bg-white sticky bottom-16 p-4 flex border-t gap-4">
    <button
      class="flex-1 px-4 py-3 grid grid-cols-3 items-center rounded-lg bg-red-500 text-white font-bold"
      @click="showCart"
    >
      <span class="inline-flex">
        <span class="relative">
          <span
            class="absolute -top-2 -right-2 rounded-lg bg-white text-red-500 text-xs px-1"
          >
            1
          </span>
          <CartOutlineIcon />
        </span>
      </span>
      <span>Ver sacola</span>
      <span class="text-right">R$ 54,99</span>
    </button>
  </div>
  <CartDrawer ref="drawer"></CartDrawer>
</template>

<style scoped></style>
