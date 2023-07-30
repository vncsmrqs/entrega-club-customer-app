<script setup lang="ts">
  import AnonymousDrawerWrapper from '@/components/AnonymousDrawerWrapper.vue';
  import BagMobileBar from '@/components/Bag/BagMobileBar.vue';
  import MainNavigation from '@/components/Main/MainNavigation.vue';
  import { onMounted, ref } from 'vue';
  import { useSelectedAddressStore } from '@/stores/selected-address';
  import LoaderComponent from '@/components/LoaderComponent.vue';
  import ValidateAddressSelection from '@/components/Address/ValidateAddressSelection.vue';
  import { useAuthStore } from '@/stores/auth';
  import AppLogo from '@/components/AppLogo.vue';
  import AccordionItem from '@/components/AccordionItem.vue';
  import { timeout } from '@/utils';

  const loading = ref(true);
  const showAddressSelectionScreen = ref(false);

  const selectedAddressStore = useSelectedAddressStore();
  const authStore = useAuthStore();

  onMounted(async () => {
    await timeout(3000);
    await authStore.auth();
    await selectedAddressStore.loadCurrentAddress();

    if (!selectedAddressStore.selectedAddress) {
      showAddressSelectionScreen.value = true;
    }

    loading.value = false;
  });
</script>

<template>
  <template v-if="loading">
    <div
      class="w-full h-full flex justify-center items-center bg-primary-600 text-white"
    >
      <LoaderComponent />
    </div>
  </template>
  <template v-else>
    <div class="w-full h-full overflow-auto relative">
      <RouterView
        v-if="selectedAddressStore.selectedAddress"
        v-slot="{ Component }"
      >
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </RouterView>
      <BagMobileBar />
    </div>
    <div class="h-px w-full flex-none bg-gray-200"></div>
    <MainNavigation />
    <ValidateAddressSelection v-model:show="showAddressSelectionScreen" />
  </template>
  <AnonymousDrawerWrapper></AnonymousDrawerWrapper>
</template>

<style scoped></style>
