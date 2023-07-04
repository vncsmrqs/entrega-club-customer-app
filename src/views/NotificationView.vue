<script setup lang="ts">
  import { onMounted } from 'vue';
  import MobileTopBar from '@/components/MobileTopBar.vue';
  import MainViewLayout from '@/components/MainViewLayout.vue';

  onMounted(() => {});
</script>
<template>
  <MainViewLayout class="notification-view">
    <MobileTopBar title="Notificações" />
    <div
      class="w-full flex-1 flex flex-col justify-center items-center text-gray-600"
    >
      <p>Nenhuma novidade por aqui.</p>
      <p>Volte mais tarde.</p>
    </div>
  </MainViewLayout>
</template>

<style>
  .notification-view {
    @apply min-h-screen flex flex-col;
  }
</style>
