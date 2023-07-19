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
    @apply w-full rounded-xl text-lg text-red-600 bg-red-100 p-3 font-semibold flex justify-center gap-2 items-center;
  }
</style>
