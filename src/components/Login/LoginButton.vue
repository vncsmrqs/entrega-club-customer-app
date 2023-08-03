<script setup lang="ts">
  import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
</script>

<template>
  <RouterLink :to="{ name: 'login' }">
    <PrimaryButton v-show="true" small> Entrar</PrimaryButton>
  </RouterLink>
</template>

<style scoped></style>
