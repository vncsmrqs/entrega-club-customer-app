<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import { useAppStore } from '@/stores/app';
  import TopLoadingBar from '@/components/TopLoadingBar.vue';
  import AnonymousDrawerWrapper from '@/components/AnonymousDrawerWrapper.vue';
  import LoaderComponent from '@/components/LoaderComponent.vue';
  import { onMounted } from 'vue';

  const appStore = useAppStore();

  onMounted(async () => {
    await appStore.start();
  });
</script>

<template>
  <TopLoadingBar
    :show="appStore.showNavigationLoading"
    :progress="appStore.navigationLoadingPercentage"
  />
  <template v-if="appStore.loading">
    <div
      class="w-screen h-screen flex flex-col justify-center items-center bg-primary-600 text-white"
    >
      <img
        class="aspect-square w-24"
        src="/logo/transparent-white/logo-transparent-white-96x96.png"
        title="Logo EntregaClub"
        alt="Logo EntregaClub"
      />
      <div class="font-bold">EntregaClub</div>
      <LoaderComponent class="mt-48" />
    </div>
  </template>
  <template v-else>
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
    <AnonymousDrawerWrapper />
  </template>
</template>

<style lang="scss" scoped></style>
