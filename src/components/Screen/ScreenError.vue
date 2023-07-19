<script setup lang="ts">
  import EmoticonSadOutlineIcon from 'vue-material-design-icons/EmoticonSadOutline.vue';
</script>

<template>
  <div class="w-full h-full flex flex-col justify-center items-center gap-4">
    <div
      class="w-24 h-24 rounded-full bg-red-100 text-red-500 flex justify-center items-center"
    >
      <EmoticonSadOutlineIcon :size="48" />
    </div>
    <div class="text-center">
      <div class="font-semibold text-lg">Algo deu errado!</div>
      <div class="text-sm">Por favor, tente novamente.</div>
    </div>
  </div>
</template>

<style scoped></style>
