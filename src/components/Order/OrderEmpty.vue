<script setup lang="ts">
  import FoodIcon from 'vue-material-design-icons/Food.vue';
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center gap-4">
    <div
      class="w-32 h-32 rounded-full bg-gray-100 text-primary-600 flex justify-center items-center"
    >
      <FoodIcon :size="64" />
    </div>
    <div class="text-center">
      <div class="font-medium text-xl">
        Parece que você ainda não fez nenhum pedido.
      </div>
      <div class="text-gray-500 text-sm mt-2">
        Bora pedir no Entrega Club? Experimente os melhores restaurantes perto
        de você.
      </div>
    </div>
    <!--    <div class="mt-4">-->
    <!--      <RouterLink :to="{ name: 'home' }">-->
    <!--        <PrimaryButton>Ir para o início</PrimaryButton>-->
    <!--      </RouterLink>-->
    <!--    </div>-->
  </div>
</template>

<style scoped></style>
