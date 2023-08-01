<script setup lang="ts">
  const props = defineProps<{ show: boolean }>();
</script>

<template>
  <Transition name="fade">
    <div v-show="props.show" class="w-full">
      <slot></slot>
    </div>
  </Transition>
</template>

<style scoped></style>
