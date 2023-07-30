<script setup lang="ts">
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import BackButton from '@/components/BackButton.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';
  import OrderEmpty from '@/components/Order/OrderEmpty.vue';
  import { onMounted } from 'vue';
  import { useOrdersStore } from '@/stores/orders';
  import ScreenLoader from '@/components/Screen/ScreenLoader.vue';
  import ScreenError from '@/components/Screen/ScreenError.vue';

  const ordersStore = useOrdersStore();

  onMounted(async () => {
    await ordersStore.fetch();
  });
</script>

<template>
  <ScreenRoot>
    <ScreenHeader class="md:hidden">
      Pedidos
      <template #left>
        <BackButton />
      </template>
    </ScreenHeader>
    <ScreenLoader v-if="ordersStore.loading" />
    <ScreenError v-else-if="ordersStore.error" />
    <ScreenMain v-else>
      <ScreenContent class="!col-span-full">
        <OrderEmpty />
      </ScreenContent>
    </ScreenMain>
  </ScreenRoot>
</template>

<style scoped></style>
