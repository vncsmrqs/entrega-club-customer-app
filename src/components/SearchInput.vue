<script setup lang="ts">
  import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';
  import CloseCircleIcon from 'vue-material-design-icons/CloseCircle.vue';
</script>

<template>
  <div class="relative">
    <div
      class="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-primary-600 dark:text-primary-800"
    >
      <MagnifyIcon></MagnifyIcon>
    </div>
    <input
      type="search"
      id="default-search"
      class="block w-full p-2.5 px-10 text-gray-900 rounded-xl bg-gray-100 focus:outline-none"
      placeholder="Busque por item ou estabelecimento"
      required
    />
    <div
      class="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400"
    >
      <CloseCircleIcon :size="16"></CloseCircleIcon>
    </div>
  </div>
</template>

<style scoped></style>
