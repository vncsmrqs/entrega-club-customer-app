<script setup lang="ts">
  import LoaderComponent from '@/components/LoaderComponent.vue';

  const props = withDefaults(defineProps<{ loading?: boolean }>(), {
    loading: false,
  });
</script>

<template>
  <button class="secondary-button">
    <template v-if="props.loading">
      <LoaderComponent />
    </template>
    <template v-else>
      <slot name="left"></slot>
      <slot></slot>
      <slot name="right"></slot>
    </template>
  </button>
</template>

<style scoped>
  .secondary-button {
    @apply rounded-xl text-lg text-primary-600 bg-primary-100 px-6 py-3 font-semibold flex justify-center gap-2 items-center;
  }
</style>
