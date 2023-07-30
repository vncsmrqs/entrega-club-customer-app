<script setup lang="ts">
  import { useBagStore } from '@/stores/bag';
  import BagButton from '@/components/Bag/BagButton.vue';

  const bagStore = useBagStore();
</script>

<template>
  <Transition name="slide-down">
    <div
      v-if="!bagStore.isEmpty"
      class="md:hidden absolute w-full bottom-0 p-4 flex gap-4 z-50"
    >
      <BagButton full />
    </div>
  </Transition>
</template>

<style scoped></style>
