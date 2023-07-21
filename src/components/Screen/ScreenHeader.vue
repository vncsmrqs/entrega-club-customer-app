<script setup lang="ts"></script>

<template>
  <div class="w-full border-b bg-white">
    <div class="relative flex p-2 gap-3">
      <div class="min-w-0">
        <slot name="left"></slot>
      </div>
      <div
        class="h-10 flex-1 items-center inline-flex font-medium text-lg whitespace-nowrap overflow-hidden"
      >
        <slot></slot>
      </div>
      <div class="min-w-0">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
