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
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import { useDrawerNavigation } from '@/composables/useDrawerNavigation';
  import { markRaw } from 'vue';
  import AddCreditCardScreen from '@/components/Payment/AddCreditCardScreen.vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const drawersControlStore = useDrawersControlStore();
  const drawerNavigation = useDrawerNavigation();

  const openAddCreditCardScreen = () => {
    const drawer = drawersControlStore.add(markRaw(AddCreditCardScreen), {
      saved: () => {
        router.back();
        router.back();
      },
    });
    drawerNavigation.openDrawer(drawer.id);
  };

  const paymentMethods = [
    {
      type: 'CREDIT',
      name: 'Crédito',
      icon: CreditCardOutlineIcon,
      function: () => openAddCreditCardScreen(),
    },
    {
      type: 'DEBIT',
      name: 'Débito',
      icon: CreditCardIcon,
      function: () => openAddCreditCardScreen(),
    },
    {
      type: 'MEAL_VOUCHER',
      name: 'Vale-refeição',
      icon: SilverwareVariantIcon,
      function: () => openAddCreditCardScreen(),
    },
    {
      type: 'FOOD_VOUCHER',
      name: 'Vale-alimentação',
      icon: CartOutlineIcon,
      function: () => openAddCreditCardScreen(),
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
        <div class="font-semibold text-lg mb-4">
          Qual tipo de cartão você deseja cadastrar?
        </div>
        <div class="flex flex-col gap-4">
          <button
            v-for="(method, index) in paymentMethods"
            :key="index"
            class="p-4 flex gap-4 items-center rounded-xl border"
            @click="() => method.function()"
          >
            <div
              class="w-10 h-10 rounded-xl flex items-center bg-gray-100 text-gray-500 justify-center"
            >
              <component :is="method.icon" />
            </div>
            <div class="text-gray-800">{{ method.name }}</div>
          </button>
        </div>
      </ScreenContent>
    </ScreenMain>
  </ScreenRoot>
</template>

<style scoped></style>
