<script setup lang="ts">
  import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';
  import MainViewLayout from '@/components/MainViewLayout.vue';
</script>

<template>
  <MainViewLayout class="h-full w-full relative">
    <form class="sticky top-0 bg-white dark:bg-gray-900 px-4 py-6">
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >Search</label
      >
      <div class="relative">
        <div
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-red-500 dark:text-red-800"
        >
          <MagnifyIcon></MagnifyIcon>
        </div>
        <input
          type="search"
          id="default-search"
          class="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-300 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Busque por item ou estabelecimento"
          required
        />
      </div>
    </form>
    <div class="mt-4">
      <h2 class="px-4 font-bold dark:text-gray-100 text-lg">Categorias</h2>
      <div class="grid grid-cols-2 gap-4 p-4">
        <div
          v-for="i in 20"
          :key="i"
          class="rounded-lg p-4 bg-gray-100 dark:bg-gray-800 dark:text-white"
        >
          Caregoria {{ i }}
        </div>
      </div>
    </div>
  </MainViewLayout>
</template>

<style>
  @media (min-width: 1024px) {
  }
</style>
