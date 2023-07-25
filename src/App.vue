<script setup lang="ts">
  import { onMounted } from 'vue';
  import { RouterView } from 'vue-router';
  import { initFlowbite } from 'flowbite';

  onMounted(() => {
    initFlowbite();
  });
</script>

<template>
  <div
    class="fixed top-0 left-0 w-full h-full z-0 flex flex-col md:flex-col-reverse"
  >
    <RouterView />
  </div>
</template>

<style scoped></style>
