<script setup lang="ts">
  import { markRaw } from 'vue';
  import MapMarkerOutlineIcon from 'vue-material-design-icons/MapMarkerOutline.vue';
  import ChipRadio from '@/components/Search/ChipRadio.vue';
  import { useBagStore } from '@/stores/bag';
  import { useSelectedAddressStore } from '@/stores/address/selected-address';
  import SecondaryButton from '@/components/Buttons/SecondaryButton.vue';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import { useDrawerNavigation } from '@/composables/useDrawerNavigation';
  import AddressSelection from '@/components/Address/ListAddressScreen.vue';

  const bagStore = useBagStore();
  const selectedAddressStore = useSelectedAddressStore();

  const drawersControlStore = useDrawersControlStore();
  const drawerNavigation = useDrawerNavigation();

  const openAddress = () => {
    const drawer = drawersControlStore.add(markRaw(AddressSelection), {});
    drawerNavigation.openDrawer(drawer.id);
  };
</script>

<template>
  <div>
    <div class="text-lg font-medium mb-2">O seu pedido deverá ser:</div>
    <div class="flex gap-2 mb-6">
      <ChipRadio
        name="delivery"
        @update:model-value="(value) => bagStore.selectDeliveryType(value)"
        :model-value="bagStore.deliveryType"
        value="DELIVERY"
      >
        Entregue
      </ChipRadio>
      <ChipRadio
        name="takeout"
        @update:model-value="(value) => bagStore.selectDeliveryType(value)"
        :model-value="bagStore.deliveryType"
        value="TAKEOUT"
      >
        Retirado
      </ChipRadio>
    </div>
    <div class="text-lg font-medium mb-2">No endereço:</div>
    <template v-if="bagStore.deliveryType === 'TAKEOUT'">
      <div class="border border-primary-600 rounded-lg p-4 flex gap-4">
        <div
          class="py-2 text-primary-600 bg-primary-100 rounded-lg w-10 h-10 flex justify-center"
        >
          <MapMarkerOutlineIcon />
        </div>
        <div v-if="bagStore.currentMerchant">
          <div>
            {{ bagStore.currentMerchant.address.streetName }},
            <span v-if="bagStore.currentMerchant.address.streetNumber">
              {{ bagStore.currentMerchant.address.streetNumber }}
            </span>
            <span v-else>S/N</span>
          </div>
          <div class="text-gray-600 text-sm">
            <span> {{ bagStore.currentMerchant.address.neighborhood }} </span>
            /
            <span>
              {{ bagStore.currentMerchant.address.city }} -
              {{ bagStore.currentMerchant.address.state }}
            </span>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="border border-primary-600 rounded-lg p-4 flex gap-4">
        <div
          class="py-2 text-primary-600 bg-primary-100 rounded-lg w-10 h-10 flex justify-center"
        >
          <MapMarkerOutlineIcon />
        </div>
        <div class="flex-1">
          <div>
            {{ selectedAddressStore.selectedAddress?.streetName }},
            <span v-if="selectedAddressStore.selectedAddress?.streetNumber">
              {{ selectedAddressStore.selectedAddress?.streetNumber }}
            </span>
            <span v-else>S/N</span>
          </div>
          <div class="text-gray-600 text-sm">
            <span>
              {{ selectedAddressStore.selectedAddress?.neighborhood }}
            </span>
            /
            <span>
              {{ selectedAddressStore.selectedAddress?.city }} -
              {{ selectedAddressStore.selectedAddress?.state }}
            </span>
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <SecondaryButton full class="mt-4" @click="openAddress">
          Trocar endereço de entrega
        </SecondaryButton>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
