<script setup lang="ts">
  import MobileNavigation from '@/components/Main/MobileNavigation.vue';
  import DesktopNavigation from '@/components/Main/DesktopNavigation.vue';
  import AddressSelectionBar from '@/components/Main/AddressSelectionBar.vue';
</script>

<template>
  <div>
    <div class="hidden md:block">
      <DesktopNavigation />
    </div>
    <AddressSelectionBar />
    <div class="md:hidden">
      <MobileNavigation />
    </div>
  </div>
</template>

<style scoped></style>
