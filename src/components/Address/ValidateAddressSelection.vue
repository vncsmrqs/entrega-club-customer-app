<script setup lang="ts">
  import RightDrawer from '@/components/RightDrawer.vue';
  import ListAddressScreen from '@/components/Address/ListAddressScreen.vue';
  import { useSelectedAddressStore } from '@/stores/address/selected-address';
  import { onMounted, ref, watch } from 'vue';

  const selectedAddress = useSelectedAddressStore();

  const show = ref(false);

  const afterSelection = () => {
    // router.replace({ name: 'home' });
  };

  onMounted(() => {
    setTimeout(() => {
      show.value = !selectedAddress.selectedAddress;
      watch(
        () => selectedAddress.selectedAddress,
        () => (show.value = !selectedAddress.selectedAddress),
      );
    }, 100);
  });
</script>

<template>
  <div>
    <RightDrawer :show="show" :before-backdrop-close="() => false" :index="0">
      <ListAddressScreen
        :show-back-button="false"
        :after-selection="afterSelection"
      />
    </RightDrawer>
  </div>
</template>

<style scoped></style>
