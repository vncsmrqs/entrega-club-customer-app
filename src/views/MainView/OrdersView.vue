<script setup lang="ts">
  import MainViewLayout from '@/components/MainViewLayout.vue';
  import MobileTopBar from '@/components/MobileTopBar.vue';
  import FoodIcon from 'vue-material-design-icons/Food.vue';
  import ChevronLeftIcon from 'vue-material-design-icons/ChevronLeft.vue';
  import CloseIcon from 'vue-material-design-icons/Close.vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const back = () => {
    router.replace({ name: 'home', replace: true });
  };
</script>

<template>
  <MainViewLayout class="orders-view">
    <MobileTopBar title="Pedidos">
      <template #left>
        <div class="p-2 flex items-center">
          <div class="md:hidden">
            <button
              @click="back"
              class="w-10 h-10 flex justify-center items-center rounded-xl hover:bg-gray-100 transition-colors duration-300"
            >
              <ChevronLeftIcon />
            </button>
          </div>
          <div class="hidden md:block">
            <button
              @click="back"
              class="w-10 h-10 flex justify-center items-center rounded-xl hover:bg-gray-100 transition-colors duration-300"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      </template>
    </MobileTopBar>
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
