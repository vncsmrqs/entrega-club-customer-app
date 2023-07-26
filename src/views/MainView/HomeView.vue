<script setup lang="ts">
  import { initDropdowns } from 'flowbite';
  import { onMounted } from 'vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import AppLogo from '@/components/AppLogo.vue';
  import AddressSelectionBar from '@/components/Main/AddressSelectionBar.vue';
  import ScreenSide from '@/components/Screen/ScreenSide.vue';

  onMounted(async () => {
    initDropdowns();
    // await customerAddressStore.loadCurrentAddress();
  });
</script>
<template>
  <ScreenRoot>
    <ScreenHeader class="md:hidden flex justify-between">
      <template #left>
        <AppLogo />
      </template>
      <template #right></template>
    </ScreenHeader>
    <ScreenMain :with-padding="false" class="md:p-5">
      <ScreenSide>
        <AddressSelectionBar class="md:hidden" />
        <div class="border-b md:border md:rounded-xl p-4">
          <div class="flex flex-wrap gap- 2">
            <RouterLink :to="{ name: 'home-default' }" v-slot="{ isActive }">
              <span
                class="text-primary-600 font-medium rounded-lg px-4 py-2 text-center"
                :class="{ 'bg-primary-100': isActive }"
                >Início</span
              >
            </RouterLink>
            <RouterLink :to="{ name: 'restaurants' }" v-slot="{ isActive }">
              <span
                class="text-primary-600 font-medium rounded-lg px-4 py-2 text-center"
                :class="{ 'bg-primary-100': isActive }"
                >Restaurantes</span
              >
            </RouterLink>
            <RouterLink :to="{ name: 'liquor-store' }" v-slot="{ isActive }">
              <span
                class="text-primary-600 font-medium rounded-lg px-4 py-2 text-center"
                :class="{ 'bg-primary-100': isActive }"
                >Bebidas</span
              >
            </RouterLink>
          </div>
        </div>
      </ScreenSide>
      <ScreenContent>
        <RouterView></RouterView>
      </ScreenContent>
    </ScreenMain>
  </ScreenRoot>
</template>

<style>
  @media (min-width: 1024px) {
  }
</style>
