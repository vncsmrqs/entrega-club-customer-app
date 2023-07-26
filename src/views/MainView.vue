<script setup lang="ts">
  import AnonymousDrawerWrapper from '@/components/AnonymousDrawerWrapper.vue';
  import BagMobileBar from '@/components/Bag/BagMobileBar.vue';
  import MainNavigation from '@/components/Main/MainNavigation.vue';
  import { onMounted, ref } from 'vue';
  import { useSelectedAddressStore } from '@/stores/selected-address';
  import LoaderComponent from '@/components/LoaderComponent.vue';
  import { markRaw } from 'vue';
  import AddressSelection from '@/components/Address/ListAddressScreen.vue';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import { useRouter } from 'vue-router';

  const loading = ref(true);

  const selectedAddressStore = useSelectedAddressStore();
  const drawersControlStore = useDrawersControlStore();

  const router = useRouter();

  onMounted(async () => {
    await selectedAddressStore.loadCurrentAddress();

    if (!selectedAddressStore.selectedAddress) {
      showFixedAddressDrawer();
    }

    loading.value = false;
  });

  const addressSelectionDrawerId = ref<string | null>(null);

  const showFixedAddressDrawer = () => {
    const drawer = drawersControlStore.add(
      markRaw(AddressSelection),
      { showBackButton: false },
      true,
      () => false,
    );
    addressSelectionDrawerId.value = drawer.id;
    router.push({ hash: `#${drawer.id}` });
  };

  router.beforeEach(({ hash }) => {
    if (!selectedAddressStore.selectedAddress) {
      return `#${addressSelectionDrawerId.value}` === hash;
    }
    return true;
  });
</script>

<template>
  <template v-if="loading">
    <div
      class="w-full h-full flex justify-center items-center text-primary-600"
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
  </template>
  <AnonymousDrawerWrapper></AnonymousDrawerWrapper>
</template>

<style scoped></style>
