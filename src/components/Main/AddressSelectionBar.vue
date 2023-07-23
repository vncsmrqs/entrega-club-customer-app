<script setup lang="ts">
  import MapMarkerOutlineIcon from 'vue-material-design-icons/MapMarkerOutline.vue';
  import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue';
  import { useCustomerAddressStore } from '@/stores/address';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import { useRouter } from 'vue-router';
  import { markRaw, onMounted } from 'vue';
  import AddressSelection from '@/components/Address/ListAddressScreen.vue';

  const customerAddressStore = useCustomerAddressStore();
  const drawersControlStore = useDrawersControlStore();

  const router = useRouter();

  const showAddressDrawer = () => {
    const drawer = drawersControlStore.add(markRaw(AddressSelection), {});
    router.push({ hash: `#${drawer.id}` });
  };

  onMounted(async () => {
    await customerAddressStore.loadCurrentAddress();
    if (!customerAddressStore.selectedAddress) {
      const drawer = drawersControlStore.add(markRaw(AddressSelection), {});
      await router.push({ hash: `#${drawer.id}` });
      return;
    }
  });
</script>

<template>
  <div
    v-if="customerAddressStore.selectedAddress"
    @click="showAddressDrawer"
    class="w-full bg-white py-1 gap-2 text-center flex justify-center items-center text-gray-500 text-sm font-medium border-b md:border-none"
  >
    <MapMarkerOutlineIcon
      :size="20"
      class="text-primary-600"
    ></MapMarkerOutlineIcon>
    <span>
      {{
        customerAddressStore?.selectedAddress?.streetNumber
          ? `${customerAddressStore?.selectedAddress?.streetName}, ${customerAddressStore?.selectedAddress?.streetNumber}`
          : `${customerAddressStore?.selectedAddress?.streetName}, S/N`
      }}
    </span>
    <ChevronRightIcon :size="28"></ChevronRightIcon>
  </div>
</template>

<style scoped></style>
