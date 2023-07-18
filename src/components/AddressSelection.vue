<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import MobileTopBar from '@/components/MobileTopBar.vue';
  import MainViewLayout from '@/components/MainViewLayout.vue';
  import ChevronLeftIcon from 'vue-material-design-icons/ChevronLeft.vue';
  import CloseIcon from 'vue-material-design-icons/Close.vue';
  import MapMarkerOutlineIcon from 'vue-material-design-icons/MapMarkerOutline.vue';
  import { useCustomerAddressStore } from '@/stores/address';
  import type { Address } from '@/stores/address';
  import SearchInput from '@/components/SearchInput.vue';
  import { useRouter } from 'vue-router';
  import LoaderComponent from '@/components/LoaderComponent.vue';

  const customerAddressStore = useCustomerAddressStore();

  const router = useRouter();

  const step = ref('ADDRESS_SELECTION');

  onMounted(async () => {
    await customerAddressStore.loadCustomerAddresses();
  });

  const hide = () => {
    router.back();
    setTimeout(() => {
      step.value = 'ADDRESS_SELECTION';
    }, 100);
  };

  const isSelected = (address: Address) => {
    return customerAddressStore.selectedAddress?.id === address.id;
  };

  const selectAddress = (address: Address) => {
    customerAddressStore.selectAddress(address);
    hide();
  };
</script>

<template>
  <MainViewLayout>
    <MobileTopBar class="z-10" title="Endereço">
      <template #left>
        <div class="p-2 flex items-center">
          <div class="md:hidden">
            <button
              @click="hide"
              class="w-10 h-10 flex justify-center items-center rounded-xl hover:bg-gray-100 transition-colors duration-300"
            >
              <ChevronLeftIcon />
            </button>
          </div>
          <div class="hidden md:block">
            <button
              @click="hide"
              class="w-10 h-10 flex justify-center items-center rounded-xl hover:bg-gray-100 transition-colors duration-300"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      </template>
    </MobileTopBar>
    <div
      v-if="customerAddressStore.error"
      class="m-4 p-4 bg-red-100 text-red-500 border border-red-500 rounded-lg"
    >
      {{ customerAddressStore.error }}
    </div>
    <div
      v-if="customerAddressStore.loading"
      class="w-full text-red-500 flex justify-center"
    >
      <LoaderComponent />
    </div>
    <div
      v-if="['SEARCH_ADDRESS', 'ADDRESS_SELECTION'].includes(step)"
      class="flex flex-col items-center gap-4 p-4"
    >
      <div
        class="w-40 h-40 rounded-full bg-red-100 text-red-500 flex justify-center items-center"
      >
        <MapMarkerOutlineIcon :size="80" />
      </div>
      <div>Onde você quer receber o seu pedido?</div>
    </div>
    <div>
      <transition name="fade" mode="out-in" appear :duration="500">
        <div v-if="['SEARCH_ADDRESS', 'ADDRESS_SELECTION'].includes(step)">
          <div class="p-4 sticky top-0 lef-0 w-full bg-white">
            <SearchInput @click="step = 'SEARCH_ADDRESS'"></SearchInput>
          </div>
          <div v-if="step === 'SEARCH_ADDRESS'">
            <div
              v-for="i in 15"
              :key="i"
              class="border rounded-lg p-4"
              @click="step = 'MAP_MARKING'"
            >
              Endereço
            </div>
          </div>
        </div>
      </transition>
      <template v-if="step === 'ADDRESS_SELECTION'">
        <div class="px-4 flex flex-col gap-4">
          <div
            v-for="address in customerAddressStore.availableAddressList"
            :key="address.id"
            class="p-4 rounded-lg border"
            :class="{
              'border-red-500': isSelected(address),
            }"
            @click="() => selectAddress(address)"
          >
            <div class="text-gray-700">
              {{ address.streetName }}, {{ address.streetNumber }}
            </div>
            <div class="text-sm text-gray-500">
              {{ address.neighborhood }}, {{ address.city }} -
              {{ address.state }}
            </div>
          </div>
        </div>
      </template>
      <template v-if="step === 'MAP_MARKING'">
        Selecionando lugar no mapa
        <div
          class="w-full bg-white fixed bottom-0 px-4 py-3 flex border-t gap-4"
        >
          <button
            class="flex-1 px-4 py-3 flex justify-between items-center rounded-lg bg-red-500 text-white font-bold"
            @click="step = 'REGISTERING_ADDRESS'"
          >
            <span>Confirmar localização</span>
          </button>
        </div>
      </template>
      <template v-if="step === 'REGISTERING_ADDRESS'">
        Inserir restando dos dados e salvar
        <div
          class="w-full bg-white fixed bottom-0 px-4 py-3 flex border-t gap-4"
        >
          <button
            @click="hide"
            class="flex-1 px-4 py-3 flex justify-between items-center rounded-lg bg-red-500 text-white font-bold"
          >
            <span>Salvar</span>
          </button>
        </div>
      </template>
    </div>
  </MainViewLayout>
</template>

<style scoped></style>
