<script setup lang="ts">
  import CloseIcon from 'vue-material-design-icons/Close.vue';
  import ChevronLeftIcon from 'vue-material-design-icons/ChevronLeft.vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
</script>

<template>
  <button
    @click="router.back()"
    class="w-10 h-10 flex justify-center items-center rounded-xl hover:bg-gray-100 transition-colors duration-300"
  >
    <ChevronLeftIcon class="md:hidden" />
    <CloseIcon class="hidden md:block" />
  </button>
</template>

<style scoped></style>
