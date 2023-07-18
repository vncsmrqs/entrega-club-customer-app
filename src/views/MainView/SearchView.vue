<script setup lang="ts">
  import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';
  import MainViewLayout from '@/components/MainViewLayout.vue';
  import SearchInput from '@/components/SearchInput.vue';
</script>

<template>
  <MainViewLayout class="h-full w-full relative">
    <form class="sticky top-0 bg-white dark:bg-gray-900 px-4 py-6">
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >Search</label
      >
      <SearchInput />
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
