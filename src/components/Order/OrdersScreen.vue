<script setup lang="ts">
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import BackButton from '@/components/BackButton.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';
  import OrderEmpty from '@/components/Order/OrderEmpty.vue';
</script>

<template>
  <ScreenRoot>
    <ScreenHeader class="md:hidden">
      Pedidos
      <template #left>
        <BackButton />
      </template>
    </ScreenHeader>
    <ScreenMain>
      <ScreenContent class="!col-span-full">
        <OrderEmpty />
      </ScreenContent>
    </ScreenMain>
  </ScreenRoot>
</template>

<style scoped></style>
