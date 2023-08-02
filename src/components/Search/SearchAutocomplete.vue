<script setup lang="ts">
  import { useSearchStore } from '@/stores/search/search';

  const searchStore = useSearchStore();
</script>

<template>
  <div
    class="absolute top-12 left-0 w-full p-4 bg-white shadow rounded-xl max-h-56 z-10 overflow-y-auto flex flex-col gap-2"
  >
    <span class="text-lg font-medium"></span>
    <div
      v-for="term in searchStore.lastTerms"
      :key="term"
      class="px-4 py-2 border rounded-xl"
    >
      {{ term }}
    </div>
  </div>
</template>

<style scoped></style>
