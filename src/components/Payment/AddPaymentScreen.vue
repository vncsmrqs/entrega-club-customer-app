<script setup lang="ts">
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import BackButton from '@/components/BackButton.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';
  import CreditCardOutlineIcon from 'vue-material-design-icons/CreditCardOutline.vue';
  import CreditCardIcon from 'vue-material-design-icons/CreditCard.vue';
  import SilverwareVariantIcon from 'vue-material-design-icons/SilverwareVariant.vue';
  import CartOutlineIcon from 'vue-material-design-icons/CartOutline.vue';

  const paymentMethods = [
    {
      type: 'CREDIT',
      name: 'Crédito',
      icon: CreditCardOutlineIcon,
    },
    {
      type: 'DEBIT',
      name: 'Débito',
      icon: CreditCardIcon,
    },
    {
      type: 'MEAL_VOUCHER',
      name: 'Vale-refeição',
      icon: SilverwareVariantIcon,
    },
    {
      type: 'FOOD_VOUCHER',
      name: 'Vale-alimentação',
      icon: CartOutlineIcon,
    },
  ];
</script>

<template>
  <ScreenRoot>
    <ScreenHeader>
      Adicionar cartão
      <template #left>
        <BackButton />
      </template>
    </ScreenHeader>
    <ScreenMain>
      <template #side></template>
      <ScreenContent class="!col-span-full">
        <div class="font-semibold text-lg mb-8">
          Qual forma de pagamento você deseja cadastrar?
        </div>
        <div class="flex flex-col gap-4">
          <div
            v-for="(method, index) in paymentMethods"
            :key="index"
            class="p-4 flex gap-4 items-center rounded-lg border"
          >
            <div
              class="w-10 h-10 rounded flex items-center bg-gray-100 text-gray-500 justify-center"
            >
              <component :is="method.icon" />
            </div>
            <div class="text-gray-800">{{ method.name }}</div>
          </div>
        </div>
      </ScreenContent>
    </ScreenMain>
  </ScreenRoot>
</template>

<style scoped></style>
