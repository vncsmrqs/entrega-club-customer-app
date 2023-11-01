<script setup lang="ts">
  import CreditCardOutlineIcon from 'vue-material-design-icons/CreditCardOutline.vue';
  import DotSeparator from '@/components/DotSeparator.vue';
  import DotsVerticalIcon from 'vue-material-design-icons/DotsVertical.vue';
  import type { CardPayment } from '@/stores/payment/list-customer-card';
  import DefaultButton from '@/components/Buttons/DefaultButton.vue';

  const props = defineProps<{
    card: CardPayment;
  }>();
</script>

<template>
  <div class="border rounded-lg p-4 flex items-center gap-4">
    <div
      class="w-10 h-10 text-gray-500 bg-gray-100 rounded-xl flex items-center justify-center"
    >
      <CreditCardOutlineIcon />
    </div>
    <div class="flex-1 flex flex-col">
      <div class="font-medium">
        <span>{{ props.card.nickname }}</span>
        <DotSeparator class="mx-1" />
        <span>{{ props.card.method }}</span>
      </div>
      <div class="text-sm">{{ props.card.brand.description }}</div>
      <span class="text-gray-500 text-sm">
        <!--        <DotSeparator-->
        <!--          v-for="i in 12"-->
        <!--          :key="i"-->
        <!--          :class="{ 'mr-1': i % 4 === 0 }"-->
        <!--        />-->
        {{ props.card.cardNumber }}
      </span>
    </div>
    <div>
      <DefaultButton small icon>
        <DotsVerticalIcon />
      </DefaultButton>
    </div>
  </div>
</template>

<style scoped></style>
