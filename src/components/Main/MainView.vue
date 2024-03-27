<script setup lang="ts">
  import BagMobileBar from '@/components/Bag/BagMobileBar.vue';
  import MainNavigation from '@/components/Main/MainNavigation.vue';
</script>

<template>
  <div
    class="fixed top-0 left-0 w-full md:max-w-screen-2xl mx-auto h-full z-0 flex flex-col md:flex-col-reverse"
  >
    <div class="w-full h-full overflow-auto relative">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>
    <BagMobileBar />
    <div class="h-px w-full flex-none bg-gray-200"></div>
    <MainNavigation />
  </div>
</template>

<style scoped></style>
