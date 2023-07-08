<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { generateId } from '@/utils';

  const defaultMerchantLogoUrl = ref('/images/merchant/logo-default.png');

  const merchants = reactive([
    {
      id: generateId(),
      name: 'O Rei da Pizza',
      logoUrl: defaultMerchantLogoUrl,
    },
    {
      id: generateId(),
      name: 'Mania Jovem',
      logoUrl: defaultMerchantLogoUrl,
    },
    {
      id: generateId(),
      name: 'Victor Lanches',
      logoUrl: defaultMerchantLogoUrl,
    },
    {
      id: generateId(),
      name: 'Massa do Rei',
      logoUrl: defaultMerchantLogoUrl,
    },
    {
      id: generateId(),
      name: 'Las Portas',
      logoUrl: defaultMerchantLogoUrl,
    },
  ]);
</script>

<template>
  <div class="p-4">
    <div class="flex items-center justify-between mb-4">
      <span class="font-bold">Famosos no Entrega Club</span>
      <span class="text-xs text-red-500">Ver mais</span>
    </div>
    <div class="grid grid-cols-3 gap-4 dark:text-white">
      <RouterLink
        v-for="merchant in merchants"
        :key="merchant.id"
        :to="{ name: 'merchant', params: { merchantId: merchant.id } }"
        class=""
      >
        <div
          class="rounded-lg bg-red-100 dark:bg-gray-800 border aspect-photo overflow-hidden"
        >
          <img
            class="w-full h-full object-cover"
            :src="merchant.logoUrl ? merchant.logoUrl : defaultMerchantLogoUrl"
            :alt="merchant.name"
          />
        </div>
        <div class="mt-1">{{ merchant.name }}</div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
