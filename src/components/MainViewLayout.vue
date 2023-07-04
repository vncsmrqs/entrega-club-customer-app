<script setup lang="ts"></script>

<template>
  <main class="main-view-layout bg-white">
    <slot />
  </main>
</template>

<style scoped>
  .main-view-layout {
    @apply min-h-screen pb-16;
  }
</style>
