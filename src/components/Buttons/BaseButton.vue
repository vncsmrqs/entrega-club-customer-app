<script setup lang="ts">
  import LoaderComponent from '@/components/LoaderComponent.vue';
  import { computed } from 'vue';

  const props = withDefaults(
    defineProps<{
      small?: boolean;
      dense?: boolean;
      loading?: boolean;
      color?: 'primary' | 'secondary' | 'default';
      full?: boolean;
      center?: boolean;
      blocked?: boolean;
      icon?: boolean;
    }>(),
    {
      color: 'default',
      small: false,
      loading: false,
      full: false,
      center: true,
      dense: false,
      icon: false,
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
      'px-6 py-4 text-lg h-14': !props.small && !props.dense && !props.icon,
      'text-lg h-14 w-14': !props.small && !props.dense && props.icon,
      'px-4 py-3 text-lg h-12': !props.small && props.dense && !props.icon,
      'text-lg h-12 w-12': !props.small && props.dense && props.icon,
      'px-3 py-1.5 h-10': props.small && !props.dense && !props.icon,
      'h-10 w-10': props.small && !props.dense && props.icon,
      'px-2 py-1 h-8': props.small && props.dense && !props.icon,
      'h-8 w-8': props.small && props.dense && props.icon,
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
