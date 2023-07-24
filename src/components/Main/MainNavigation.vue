<script setup lang="ts">
  import MobileNavigation from '@/components/Main/MobileNavigation.vue';
  import DesktopNavigation from '@/components/Main/DesktopNavigation.vue';
  import AddressSelectionBar from '@/components/Main/AddressSelectionBar.vue';
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';
  import AccordionItem from '@/components/AccordionItem.vue';

  const route = useRoute();

  const showMenu = computed(() => !!route.meta.showMenu);
</script>

<template>
  <div>
    <div class="hidden md:block">
      <DesktopNavigation />
      <AddressSelectionBar />
    </div>
    <AccordionItem :opened="showMenu">
      <div class="md:hidden">
        <AddressSelectionBar />
        <MobileNavigation />
      </div>
    </AccordionItem>
  </div>
</template>

<style scoped></style>
