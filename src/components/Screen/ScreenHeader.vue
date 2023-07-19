<script setup lang="ts"></script>

<template>
  <div class="w-full top-0 lef-0 border-b bg-white">
    <div class="relative flex p-2 gap-4">
      <div class="min-w-0">
        <slot name="left"></slot>
      </div>
      <div class="h-10 flex flex-1 items-center font-semibold text-lg">
        <slot></slot>
      </div>
      <div class="min-w-0">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
