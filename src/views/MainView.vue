<script setup lang="ts">
  import AnonymousDrawerWrapper from '@/components/AnonymousDrawerWrapper.vue';
  import BagMobileBar from '@/components/Bag/BagMobileBar.vue';
  import MainNavigation from '@/components/Main/MainNavigation.vue';
  import { onMounted, ref } from 'vue';
  import { useSelectedAddressStore } from '@/stores/address/selected-address';
  import LoaderComponent from '@/components/LoaderComponent.vue';
  import ValidateAddressSelection from '@/components/Address/ValidateAddressSelection.vue';
  import { useAuthStore } from '@/stores/auth';

  const loading = ref(false);
  const error = ref<string | null>(null);
  const showAddressSelectionScreen = ref(false);

  const selectedAddressStore = useSelectedAddressStore();
  const authStore = useAuthStore();

  onMounted(async () => {
    loading.value = true;
    try {
      await authStore.auth();
      await selectedAddressStore.loadCurrentAddress();
      if (!selectedAddressStore.selectedAddress) {
        showAddressSelectionScreen.value = true;
      }
      error.value = null;
    } catch (error: any) {
      error.value = error.toString();
    } finally {
      loading.value = false;
    }
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
        <transition name="fade" mode="out-in">
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
