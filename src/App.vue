<script setup lang="ts">
  import { onMounted } from 'vue';
  import { RouterView } from 'vue-router';
  // import SampleComponentToTest from './components/SampleComponentToTest.vue';

  import { initFlowbite } from 'flowbite';

  onMounted(() => {
    initFlowbite();
  });
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
