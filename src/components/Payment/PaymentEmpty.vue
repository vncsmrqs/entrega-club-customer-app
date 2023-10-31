<script setup lang="ts">
  import CreditCardOutlineIcon from 'vue-material-design-icons/CreditCardOutline.vue';
  import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import { useDrawerNavigation } from '@/composables/useDrawerNavigation';
  import { markRaw } from 'vue';
  import AddPaymentScreen from '@/components/Payment/AddPaymentScreen.vue';

  const drawersControlStore = useDrawersControlStore();
  const drawerNavigation = useDrawerNavigation();

  const openAddPaymentScreen = () => {
    const drawer = drawersControlStore.add(markRaw(AddPaymentScreen), {});
    drawerNavigation.openDrawer(drawer.id);
  };
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center gap-4">
    <div
      class="w-32 h-32 rounded-full bg-gray-100 text-primary-600 flex justify-center items-center"
    >
      <CreditCardOutlineIcon :size="64" />
    </div>
    <div class="text-center">
      <div class="font-medium text-xl">Adicione um cartão no EntregaClub</div>
      <div class="text-gray-500 text-sm mt-2">
        É seguro e você não perde tempo na hora de receber o seu pedido.
      </div>
    </div>
    <div class="mt-4">
      <PrimaryButton @click="openAddPaymentScreen"
        >Adicionar cartão
      </PrimaryButton>
    </div>
  </div>
</template>

<style scoped></style>
