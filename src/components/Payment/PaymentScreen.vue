<script setup lang="ts">
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import BackButton from '@/components/BackButton.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';
  import PaymentEmpty from '@/components/Payment/PaymentEmpty.vue';
  import { onMounted } from 'vue';
  import ScreenLoader from '@/components/Screen/ScreenLoader.vue';
  import ScreenError from '@/components/Screen/ScreenError.vue';
  import { useListCustomerCardStore } from '@/stores/payment/list-customer-card';
  import CustomerCardPayment from '@/components/Payment/CustomerCardPayment.vue';
  import ScreenSide from '@/components/Screen/ScreenSide.vue';

  const listCustomerCardStore = useListCustomerCardStore();

  const load = async () => {
    await listCustomerCardStore.fetch();
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
    <ScreenMain
      @reload="load"
      :loading="listCustomerCardStore.loading"
      with-reload
      class="lg:gap-10"
    >
      <ScreenLoader v-if="listCustomerCardStore.loading" />
      <ScreenError v-else-if="listCustomerCardStore.error" />
      <ScreenContent
        v-else-if="listCustomerCardStore.isEmpty"
        class="!col-span-full"
      >
        <PaymentEmpty />
      </ScreenContent>
      <template #side>
        <ScreenSide class="hidden lg:block">
          <PaymentEmpty />
        </ScreenSide>
      </template>
      <ScreenContent>
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
  </ScreenRoot>
</template>

<style scoped></style>
