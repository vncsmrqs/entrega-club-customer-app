<script setup lang="ts">
  import MainViewLayout from '@/components/MainViewLayout.vue';
  import MobileTopBar from '@/components/MobileTopBar.vue';
  import FoodIcon from 'vue-material-design-icons/Food.vue';
</script>

<template>
  <MainViewLayout class="orders-view">
    <MobileTopBar title="Pedidos" />
    <div class="w-full flex-1 flex flex-col justify-center items-center">
      <div class="text-center w-3/5">
        <div
          class="my-8 inline-flex justify-center bg-red-100 p-8 rounded-full text-red-500"
        >
          <FoodIcon :size="96"></FoodIcon>
        </div>
        <p class="font-medium text-lg mb-2">Bora pedir no Entrega Club?</p>
        <p class="text-sm text-gray-600">
          Experimente os melhores restaurantes perto de você
        </p>
        <button class="w-full text-red-500 px-6 py-4 font-bold mt-10">
          Fazer um pedido
        </button>
      </div>
    </div>
  </MainViewLayout>
</template>

<style>
  .orders-view {
    @apply flex flex-col;
  }
</style>
