<script setup lang="ts"></script>

<template>
  <button class="primary-button">
    <slot name="left"></slot>
    <slot></slot>
    <slot name="right"></slot>
  </button>
</template>

<style scoped>
  .primary-button {
    @apply rounded-xl text-lg text-white bg-primary-600 px-6 py-3 font-semibold flex justify-center gap-2 items-center;
  }
</style>
