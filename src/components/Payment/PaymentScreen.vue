<script setup lang="ts">
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import BackButton from '@/components/BackButton.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';
  import PaymentEmpty from '@/components/Payment/PaymentEmpty.vue';
  import { computed, markRaw, onMounted } from 'vue';
  import ScreenLoader from '@/components/Screen/ScreenLoader.vue';
  import ScreenError from '@/components/Screen/ScreenError.vue';
  import { useListCustomerCardStore } from '@/stores/payment/list-customer-card';
  import CustomerCardPayment from '@/components/Payment/CustomerCardPayment.vue';
  import ScreenSide from '@/components/Screen/ScreenSide.vue';
  import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
  import ScreenFooter from '@/components/Screen/ScreenFooter.vue';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import { useDrawerNavigation } from '@/composables/useDrawerNavigation';
  import AddPaymentScreen from '@/components/Payment/AddPaymentScreen.vue';

  const listCustomerCardStore = useListCustomerCardStore();

  const load = async () => {
    await listCustomerCardStore.fetch();
  };

  const showContent = computed(() => {
    return !(
      listCustomerCardStore.loading ||
      listCustomerCardStore.error ||
      listCustomerCardStore.isEmpty
    );
  });

  const drawersControlStore = useDrawersControlStore();
  const drawerNavigation = useDrawerNavigation();

  const openAddPaymentScreen = () => {
    const drawer = drawersControlStore.add(markRaw(AddPaymentScreen), {});
    drawerNavigation.openDrawer(drawer.id);
  };

  onMounted(load);
</script>

<template>
  <ScreenRoot>
    <ScreenHeader class="md:hidden">
      Formas de pagamento
      <template #left>
        <BackButton />
      </template>
    </ScreenHeader>
    <ScreenLoader v-if="listCustomerCardStore.loading" />
    <ScreenError v-else-if="listCustomerCardStore.error" />
    <ScreenMain
      v-else
      @reload="load"
      :loading="listCustomerCardStore.loading"
      with-reload
      class="lg:gap-10"
    >
      <ScreenContent
        v-if="listCustomerCardStore.isEmpty"
        class="!col-span-full"
      >
        <PaymentEmpty />
      </ScreenContent>
      <template #side v-if="showContent">
        <ScreenSide class="hidden lg:block">
          <PaymentEmpty />
        </ScreenSide>
      </template>
      <ScreenContent v-if="showContent">
        <div class="font-semibold text-xl mb-4">Cartões disponíveis</div>
        <div class="flex flex-col gap-4">
          <CustomerCardPayment
            v-for="card in listCustomerCardStore.cards"
            :key="card.id"
            :card="card"
          />
        </div>
      </ScreenContent>
    </ScreenMain>
    <ScreenFooter v-if="!listCustomerCardStore.isEmpty" class="lg:hidden">
      <PrimaryButton @click="openAddPaymentScreen" full>
        Adicionar cartão
      </PrimaryButton>
    </ScreenFooter>
  </ScreenRoot>
</template>

<style scoped></style>
