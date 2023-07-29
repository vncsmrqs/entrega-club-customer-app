<script setup lang="ts">
  import LoaderComponent from '@/components/LoaderComponent.vue';
  import { computed } from 'vue';

  const props = withDefaults(
    defineProps<{
      small?: boolean;
      loading?: boolean;
      color?: 'primary' | 'secondary' | 'default';
    }>(),
    {
      color: 'default',
      small: false,
      loading: false,
    },
  );

  const colors = {
    primary: 'text-white bg-primary-600',
    secondary: 'text-primary-600 bg-primary-100',
    default: 'text-gray-600 bg-gray-100',
  };

  const buttonColors = computed(() =>
    colors[props.color] ? colors[props.color] : colors['default'],
  );
</script>

<template>
  <button
    class="base-button"
    :class="{
      'px-6 py-3 text-lg h-13': !props.small,
      'px-3 py-1.5 h-10': props.small,
      [buttonColors]: true,
    }"
  >
    <template v-if="props.loading">
      <LoaderComponent
        :class="{
          'w-8': props.small,
        }"
      />
    </template>
    <template v-else>
      <slot name="left"></slot>
      <slot></slot>
      <slot name="right"></slot>
    </template>
  </button>
</template>

<style scoped>
  .base-button {
    @apply rounded-xl font-semibold flex justify-center gap-2 items-center;
  }
</style>
