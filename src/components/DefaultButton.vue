<script setup lang="ts"></script>

<template>
  <button
    class="rounded-xl text-lg bg-gray-100 px-6 py-3 font-semibold flex justify-center gap-2 items-center"
  >
    <slot name="left"></slot>
    <slot></slot>
    <slot name="right"></slot>
  </button>
</template>

<style scoped></style>
