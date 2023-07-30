<script setup lang="ts">
  import BaseButton from '@/components/Buttons/BaseButton.vue';
</script>

<template>
  <BaseButton color="secondary">
    <slot name="left"></slot>
    <slot></slot>
    <slot name="right"></slot>
  </BaseButton>
</template>

<style scoped></style>
