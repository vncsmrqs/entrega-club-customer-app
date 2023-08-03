<script setup lang="ts">
  import MapMarkerOutlineIcon from 'vue-material-design-icons/MapMarkerOutline.vue';
  import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import { markRaw, onMounted } from 'vue';
  import AddressSelection from '@/components/Address/ListAddressScreen.vue';
  import { useSelectedAddressStore } from '@/stores/address/selected-address';
  import { useDrawerNavigation } from '@/composables/useDrawerNavigation';

  const drawersControlStore = useDrawersControlStore();
  const selectedAddressStore = useSelectedAddressStore();
  const drawerNavigation = useDrawerNavigation();

  const showAddressDrawer = () => {
    const drawer = drawersControlStore.add(markRaw(AddressSelection), {});
    drawerNavigation.openDrawer(drawer.id);
  };

  onMounted(async () => {});
</script>

<template>
  <div
    @click="showAddressDrawer"
    class="w-full bg-white py-1 gap-2 text-center flex justify-center items-center text-gray-500 text-sm font-medium border-b md:border-none"
  >
    <MapMarkerOutlineIcon
      :size="20"
      class="text-primary-600"
    ></MapMarkerOutlineIcon>
    <span v-if="selectedAddressStore.selectedAddress">
      {{
        selectedAddressStore?.selectedAddress?.streetNumber
          ? `${selectedAddressStore?.selectedAddress?.streetName}, ${selectedAddressStore?.selectedAddress?.streetNumber}`
          : `${selectedAddressStore?.selectedAddress?.streetName}, S/N`
      }}
    </span>
    <span v-else>Selecionar endereço</span>
    <ChevronRightIcon :size="28"></ChevronRightIcon>
  </div>
</template>

<style scoped></style>
