<script setup lang="ts">
  import MagnifyRemoveOutlineIcon from 'vue-material-design-icons/MagnifyRemoveOutline.vue';
  import SecondaryButton from '@/components/Buttons/SecondaryButton.vue';
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center gap-4">
    <div
      class="w-32 h-32 rounded-full bg-gray-100 text-primary-600 flex justify-center items-center"
    >
      <MagnifyRemoveOutlineIcon :size="64" />
    </div>
    <div class="text-center">
      <div class="font-medium text-xl">Nenhum resultado encontrado</div>
      <div class="text-gray-500 text-sm mt-2">
        Edite ou limpe os filtros para voltar
      </div>
    </div>
    <div class="mt-4">
      <SecondaryButton small>Limpar filtros</SecondaryButton>
    </div>
  </div>
</template>

<style scoped></style>
