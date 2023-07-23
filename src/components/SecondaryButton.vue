<script setup lang="ts"></script>

<template>
  <button class="secondary-button">
    <slot name="left"></slot>
    <slot></slot>
    <slot name="right"></slot>
  </button>
</template>

<style scoped>
  .secondary-button {
    @apply rounded-xl text-lg text-primary-600 bg-primary-100 px-6 py-3 font-semibold flex justify-center gap-2 items-center;
  }
</style>
