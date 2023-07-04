<script setup lang="ts">
  const props = defineProps<{
    ghost?: boolean;
  }>();
</script>

<template>
  <span class="block p-5 rounded-full" :class="{ 'bg-gray-100': !props.ghost }">
    <slot></slot>
  </span>
</template>

<style scoped></style>
