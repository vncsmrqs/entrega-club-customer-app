<script setup lang="ts">
  import { onMounted } from 'vue';
  import { RouterView } from 'vue-router';
  import { initFlowbite } from 'flowbite';
  import AnonymousDrawerWrapper from '@/components/AnonymousDrawerWrapper.vue';

  onMounted(() => {
    initFlowbite();
  });
</script>

<template>
  <RouterView />
  <AnonymousDrawerWrapper></AnonymousDrawerWrapper>
</template>

<style scoped></style>
