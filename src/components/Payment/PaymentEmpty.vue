<script setup lang="ts">
  import CreditCardOutlineIcon from 'vue-material-design-icons/CreditCardOutline.vue';
  import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center gap-4">
    <div
      class="w-32 h-32 rounded-full bg-gray-100 text-primary-600 flex justify-center items-center"
    >
      <CreditCardOutlineIcon :size="64" />
    </div>
    <div class="text-center">
      <div class="font-medium text-xl">
        Parece que você ainda não tem nenhuma forma de pagamento cadastrada.
      </div>
      <div class="text-gray-500 text-sm mt-2">
        Cadastre uma forma de pagamento para que você consiga concluir o seu
        pedido.
      </div>
    </div>
    <div class="mt-4">
      <RouterLink :to="{ name: 'home' }">
        <PrimaryButton>Cadastrar</PrimaryButton>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
