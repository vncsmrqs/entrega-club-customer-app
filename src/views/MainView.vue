<script setup lang="ts">
  import MobileBottomBar from '@/components/MobileBottomBar.vue';
  import { useCustomerAddressStore } from '@/stores/address';
  import { markRaw, onMounted, ref } from 'vue';
  import AnonymousDrawerWrapper from '@/components/AnonymousDrawerWrapper.vue';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import AddressSelection from '@/components/Address/AddressListScreen.vue';
  import { useRouter } from 'vue-router';
  import CartMobileBar from '@/components/Bag/BagMobileBar.vue';

  const customerAddressStore = useCustomerAddressStore();

  const ready = ref(true);

  const drawersControlStore = useDrawersControlStore();

  const router = useRouter();

  onMounted(async () => {
    await customerAddressStore.loadCurrentAddress();
    if (!customerAddressStore.selectedAddress) {
      const drawer = drawersControlStore.add(markRaw(AddressSelection), {});
      await router.push({ hash: `#${drawer.id}` });
      return;
    }
    ready.value = true;
  });
</script>

<template>
  <div class="main-view dark:bg-gray-900 max-w-screen-lg w-full">
    <template v-if="ready">
      <RouterView v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </RouterView>
      <CartMobileBar />
      <MobileBottomBar />
      <!--      <ProductDrawer />-->
    </template>
    <template v-else>
      <div class="w-full h-full flex justify-center items-center">
        Carregando...
      </div>
    </template>
    <div id="target"></div>
  </div>
</template>

<style scoped>
  .main-view {
    @apply w-screen min-h-screen flex flex-col mx-auto;
  }
</style>
