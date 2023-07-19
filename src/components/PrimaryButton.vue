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
    @apply w-full rounded-xl text-lg text-white bg-red-600 p-3 font-semibold flex justify-center gap-2 items-center;
  }
</style>
