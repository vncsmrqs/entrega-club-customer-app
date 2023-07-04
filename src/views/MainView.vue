<script setup lang="ts">
  import MobileBottomBar from '@/components/MobileBottomBar.vue';
  import CartMobileBar from '@/components/CartMobileBar.vue';
  import ProductDrawer from '@/components/ProductDrawer.vue';
</script>

<template>
  <div class="home-view dark:bg-gray-900">
    <RouterView />
    <CartMobileBar />
    <ProductDrawer />
    <MobileBottomBar />
  </div>
</template>

<style scoped>
  .home-view {
    @apply min-h-screen flex flex-col;
  }
</style>
