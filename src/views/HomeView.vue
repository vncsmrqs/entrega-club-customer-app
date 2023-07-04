<script setup lang="ts">
  import { initDropdowns } from 'flowbite';
  import { onMounted } from 'vue';

  import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue';
  import BellOutlineIcon from 'vue-material-design-icons/BellOutline.vue';
  import MopedOutlineIcon from 'vue-material-design-icons/MopedOutline.vue';
  import MainViewLayout from '@/components/MainViewLayout.vue';
  import IconRounded from '@/components/IconRounded.vue';

  onMounted(() => {
    initDropdowns();
  });
</script>
<template>
  <MainViewLayout>
    <main class="w-full relative">
      <div class="border-b sticky top-0">
        <div
          class="flex border-b gap-4 bg-white dark:border-gray-950 items-center dark:bg-gray-800 dark:text-white"
        >
          <div class="ml-5 flex items-center text-red-500">
            <MopedOutlineIcon :size="36"></MopedOutlineIcon>
            <h1 class="ml-1 text-lg font-bold">
              <span class="">Entrega</span>
              <span class="text-yellow-300">Club</span>
            </h1>
          </div>
          <div class="flex-1"></div>
          <RouterLink :to="{ name: 'notifications' }">
            <IconRounded ghost>
              <BellOutlineIcon />
            </IconRounded>
          </RouterLink>
        </div>
        <div
          class="bg-white py-2 text-center flex justify-center items-center text-gray-500 text-sm font-bold"
        >
          <span>Rua Geraldo Paixão Oliveira, 164</span>
          <ChevronDownIcon class="text-red-500"></ChevronDownIcon>
        </div>
      </div>
      <div class="flex p-4 gap-2 text-sm">
        <button
          class="bg-red-100 text-red-500 font-medium rounded-lg px-4 py-2 text-center"
          type="button"
        >
          Início
        </button>
        <button
          class="text-red-500 font-medium rounded-lg px-4 py-2 text-center"
          type="button"
        >
          Restaurantes
        </button>
        <button
          class="text-red-500 font-medium rounded-lg px-4 py-2 text-center"
          type="button"
        >
          Bebidas
        </button>
      </div>
      <div class="p-4">
        <div class="flex items-center justify-between mb-4">
          <span class="font-bold">Famosos no Entrega Club</span>
          <span class="text-xs text-red-500">Ver mais</span>
        </div>
        <div class="grid grid-cols-3 gap-4 dark:text-white">
          <RouterLink
            v-for="i in 8"
            :key="i"
            :to="{ name: 'merchant', params: { merchantId: i } }"
            class=""
          >
            <div
              class="rounded-lg bg-gray-100 dark:bg-gray-800 border aspect-photo overflow-hidden"
            >
              <img class="w-full" src="/icon-192x192.png" alt="Restaurante" />
            </div>
            <div class="mt-1">Restaurante {{ i }}</div>
          </RouterLink>
        </div>
        <div
          class="w-full h-48 bg-red-100 rounded-lg my-8 flex justify-center items-center text-red-500"
        >
          Banner
        </div>
      </div>
    </main>
  </MainViewLayout>
</template>

<style>
  @media (min-width: 1024px) {
  }
</style>
