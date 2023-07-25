<script setup lang="ts">
  import AnonymousDrawerWrapper from '@/components/AnonymousDrawerWrapper.vue';
  import BagMobileBar from '@/components/Bag/BagMobileBar.vue';
  import MainNavigation from '@/components/Main/MainNavigation.vue';
</script>

<template>
  <div class="w-full h-full overflow-auto relative">
    <RouterView v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </RouterView>
    <BagMobileBar />
  </div>
  <div class="h-px w-full flex-none bg-gray-200"></div>
  <MainNavigation />
  <AnonymousDrawerWrapper></AnonymousDrawerWrapper>
</template>

<style scoped></style>
