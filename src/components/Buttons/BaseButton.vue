<script setup lang="ts">
  import LoaderComponent from '@/components/LoaderComponent.vue';
  import { computed } from 'vue';

  const props = withDefaults(
    defineProps<{
      small?: boolean;
      loading?: boolean;
      color?: 'primary' | 'secondary' | 'default';
      full?: boolean;
      center?: boolean;
      blocked?: boolean;
    }>(),
    {
      color: 'default',
      small: false,
      loading: false,
      full: false,
      center: true,
    },
  );

  const colors = {
    primary: 'text-white bg-primary-600',
    secondary: 'text-primary-600 bg-primary-100',
    default: 'text-gray-600 bg-gray-100',
  };

  const buttonColors = computed(() => {
    if (props.blocked) {
      return 'text-gray-600 bg-gray-200';
    }
    return colors[props.color] ? colors[props.color] : colors['default'];
  });
</script>

<template>
  <button
    class="base-button"
    :class="{
      'px-6 py-4 text-lg h-14': !props.small,
      'px-3 py-1.5 h-10': props.small,
      [buttonColors]: true,
      'w-full': props.full,
      'flex justify-center': props.center,
      'flex justify-between': !props.center,
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
    @apply rounded-xl font-semibold gap-2 items-center;
  }
</style>
