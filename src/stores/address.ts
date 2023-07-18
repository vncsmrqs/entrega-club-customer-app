import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import { generateId, timeout } from '@/utils';

export type Coordinates = {
  latitude: number; // -18.913878;
  longitude: number; // -48.213595;
};

export type Address = {
  id: string;
  city: string; // 'Uberlândia';
  country: string; // 'BR';
  neighborhood: string; // 'Complexo Integração';
  state: string; // 'MG';
  streetName: string; // 'Av. Manuel Lúcio';
  streetNumber: string; // '130';
  coordinates: Coordinates;
  reference: string; // 'Em Frente Ao Bar Do Zé';
  complement: string; // 'Portão Branco';
};

export const addressFixtureFunc = (index: number) => ({
  id: generateId(),
  city: 'Uberlândia',
  country: 'BR',
  neighborhood: 'Complexo Integração',
  state: 'MG',
  streetName: `${index} - Av. Manuel Lúcio`,
  streetNumber: '130',
  coordinates: {
    latitude: -18.913878,
    longitude: -48.213595,
  },
  reference: 'Em Frente Ao Bar Do Zé',
  complement: 'Portão Branco',
});

export const addressListFixture: Address[] = [1, 2, 3, 4, 5].map((_, i) =>
  addressFixtureFunc(i),
);

// console.log(addressListFixture);

export const useCustomerAddressStore = defineStore('customer-address', () => {
  /* state */
  const selectedAddress = ref<Address | null>(null);
  const availableAddressList = ref<Address[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  /* getters */

  /* actions */
  const loadCustomerAddresses = async (): Promise<void> => {
    loading.value = true;
    try {
      await timeout(3000);
      availableAddressList.value = addressListFixture;
      error.value = null;
    } catch (e: any) {
      availableAddressList.value = [];
      error.value = e.toString();
    } finally {
      loading.value = false;
    }
  };

  const loadCurrentAddress = async (): Promise<void> => {
    loading.value = true;
    selectedAddress.value = null;
    try {
      await timeout(1000);
      selectAddress(addressListFixture[0]);
      error.value = null;
    } catch (e: any) {
      error.value = e.toString();
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  const selectAddress = (address: Address) => {
    selectedAddress.value = address;
  };

  return {
    /* state */
    selectedAddress,
    availableAddressList,
    loading,
    error,

    /* getters */

    /* actions */
    loadCustomerAddresses,
    loadCurrentAddress,
    selectAddress,
  };
});
