<script setup lang="ts">
  const props = withDefaults(defineProps<{ tag?: string }>(), { tag: 'div' });
</script>

<template>
  <component :is="props.tag" class="col-span-full lg:col-span-5 min-h-full">
    <slot></slot>
  </component>
</template>

<style scoped></style>
