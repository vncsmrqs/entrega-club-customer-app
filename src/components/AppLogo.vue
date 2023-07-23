<script setup lang="ts">
  import MopedOutlineIcon from 'vue-material-design-icons/MopedOutline.vue';
</script>

<template>
  <RouterLink
    class="inline-flex items-center text-primary-600"
    :to="{ name: 'home-default' }"
  >
    <MopedOutlineIcon :size="36"></MopedOutlineIcon>
    <h1 class="ml-1 text-lg font-bold">
      <span>Entrega</span>
      <span>Club</span>
    </h1>
  </RouterLink>
</template>

<style scoped></style>
