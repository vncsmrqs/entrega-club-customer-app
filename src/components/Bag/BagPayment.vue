<script setup lang="ts">
  import { markRaw } from 'vue';
  import CashIcon from 'vue-material-design-icons/Cash.vue';
  import DotsVerticalIcon from 'vue-material-design-icons/DotsVertical.vue';
  import CreditCardOutlineIcon from 'vue-material-design-icons/CreditCardOutline.vue';
  import ChipRadio from '@/components/Search/ChipRadio.vue';
  import { useBagStore } from '@/stores/bag';
  import SecondaryButton from '@/components/Buttons/SecondaryButton.vue';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import { useDrawerNavigation } from '@/composables/useDrawerNavigation';
  import DotSeparator from '@/components/DotSeparator.vue';
  import AddPaymentScreen from '@/components/Payment/AddPaymentScreen.vue';

  const bagStore = useBagStore();

  const drawersControlStore = useDrawersControlStore();
  const drawerNavigation = useDrawerNavigation();

  const openAddPaymentScreen = () => {
    const drawer = drawersControlStore.add(markRaw(AddPaymentScreen), {});
    drawerNavigation.openDrawer(drawer.id);
  };
</script>

<template>
  <div>
    <div class="text-lg font-medium mb-2">Como você deseja pagar?</div>
    <div class="flex gap-2 mb-6">
      <ChipRadio
        name="payment-online"
        @update:model-value="(value) => bagStore.selectPaymentType(value)"
        :model-value="bagStore.paymentType"
        value="ONLINE"
      >
        Pagar pelo app
      </ChipRadio>
      <ChipRadio
        name="payment-on-delivery"
        @update:model-value="(value) => bagStore.selectPaymentType(value)"
        :model-value="bagStore.paymentType"
        value="OFFLINE"
      >
        Pagar na entrega
      </ChipRadio>
    </div>
    <div class="text-lg font-medium mb-4">Forma de pagamento</div>
    <template v-if="bagStore.paymentType === 'OFFLINE'">
      <div class="flex flex-col gap-4">
        <div class="border rounded-xl p-4 flex items-center gap-4">
          <div class="w-10 h-10 text-green-600">
            <CashIcon :size="36" />
          </div>
          <div class="flex-1 flex flex-col">
            <span class="">Dinheiro</span>
            <span class="text-gray-500"
              >Deixe o dinheiro trocado para realizar o pagamento ao
              entregador</span
            >
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="flex flex-col gap-4">
        <div class="border rounded-lg p-4 flex items-center gap-4">
          <div class="w-10 h-10">
            <img src="/images/payment/pix/logo-icone-256.png" />
          </div>
          <div class="flex-1 flex flex-col">
            <span class="">Pagar com Pix</span>
            <span class="text-gray-500">
              Use o QR Code ou copie e cole o código
            </span>
          </div>
        </div>
        <div class="border rounded-lg p-4 flex items-center gap-4">
          <div class="w-10 h-10 text-gray-500">
            <CreditCardOutlineIcon :size="36" />
          </div>
          <div class="flex-1 flex flex-col">
            <div class="">
              <span>Nubank</span>
              <DotSeparator class="mx-1" />
              <span>Crédito</span>
              <DotSeparator class="mx-1" />
              <span>Mastercard</span>
            </div>
            <span class="text-gray-500">
              <DotSeparator
                v-for="i in 12"
                :key="i"
                :class="{ 'mr-1': i % 4 === 0 }"
              />
              1234
            </span>
          </div>
          <div>
            <DotsVerticalIcon />
          </div>
        </div>
        <SecondaryButton @click="() => openAddPaymentScreen()" full>
          Adicionar cartão
        </SecondaryButton>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
