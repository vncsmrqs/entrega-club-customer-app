<script setup lang="ts"></script>

<template>
  <main class="main-view-layout bg-white max-w-screen-lg w-full h-full mx-auto">
    <slot />
  </main>
</template>

<style scoped>
  .main-view-layout {
    @apply min-h-screen pb-16;
  }
</style>
