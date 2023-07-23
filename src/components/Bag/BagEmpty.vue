<script setup lang="ts">
  import ShoppingOutlineIcon from 'vue-material-design-icons/ShoppingOutline.vue';
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center gap-4">
    <div
      class="w-32 h-32 rounded-full bg-gray-100 text-primary-600 flex justify-center items-center"
    >
      <ShoppingOutlineIcon :size="64" />
    </div>
    <div class="text-center">
      <div class="font-medium text-xl">Sua sacola está vazia.</div>
      <div class="text-gray-500 text-sm mt-2">Adicione items</div>
    </div>
  </div>
</template>

<style scoped></style>
