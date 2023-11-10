<script setup lang="ts">
  import { useBagStore } from '@/stores/bag';
  import BagButton from '@/components/Bag/BagButton.vue';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  const bagStore = useBagStore();
  const route = useRoute();

  const showBagFloatButton = computed(
    () => !bagStore.isEmpty && route.meta.showBagButton,
  );
</script>

<template>
  <Transition name="slide-down">
    <div
      v-if="showBagFloatButton"
      class="md:hidden w-full p-4 flex gap-4 bg-white border-t"
    >
      <BagButton full />
    </div>
  </Transition>
</template>

<style scoped></style>
