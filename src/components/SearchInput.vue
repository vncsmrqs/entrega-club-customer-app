<script setup lang="ts">
  import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';
</script>

<template>
  <div class="relative">
    <div
      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-primary-600 dark:text-primary-800"
    >
      <MagnifyIcon></MagnifyIcon>
    </div>
    <input
      type="search"
      id="default-search"
      class="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary-300 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Busque por item ou estabelecimento"
      required
    />
  </div>
</template>

<style scoped></style>
