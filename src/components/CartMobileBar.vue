<script setup lang="ts">
  import CartOutlineIcon from 'vue-material-design-icons/CartOutline.vue';
  import CartDrawer from '@/components/CartDrawer.vue';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import { markRaw } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const drawersControlStore = useDrawersControlStore();
  const showCart = () => {
    const drawer = drawersControlStore.add(markRaw(CartDrawer), {});
    router.push({ hash: `#${drawer.id}` });
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
</template>

<style scoped></style>
