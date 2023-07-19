<script setup lang="ts"></script>

<template>
  <button class="default-button">
    <slot name="left"></slot>
    <slot></slot>
    <slot name="right"></slot>
  </button>
</template>

<style scoped>
  .default-button {
    @apply w-full rounded-xl text-lg bg-gray-100 p-3 font-semibold flex justify-center gap-2 items-center;
  }
</style>
