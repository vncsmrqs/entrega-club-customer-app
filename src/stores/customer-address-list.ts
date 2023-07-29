import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { generateId, timeout } from '@/utils';
import { useSelectedAddressStore } from '@/stores/selected-address';
// import customerAddressFixture from '@/fixtures/address/customer-address-list.json';

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

const selectedAddressStore = useSelectedAddressStore();

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

export const useCustomerAddressStore = defineStore(
  'customer-address-list',
  () => {
    /* state */
    const customerAddressList = ref<Address[]>([]);
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const deleteAddress = (addressId: string) => {
      customerAddressList.value = customerAddressList.value.filter(
        (address) => addressId !== address.id,
      );

      if (addressId === selectedAddressStore.selectedAddress?.id) {
        selectAddress(customerAddressList.value?.[0]);
      }
    };

    const addAddress = async (address: Address): Promise<Address> => {
      customerAddressList.value.push(address);
      return address;
    };

    /* getters */
    const sortedCustomerAddressList = computed(() => {
      const sortedList = [];

      if (selectedAddressStore.selectedAddress) {
        sortedList.push(selectedAddressStore.selectedAddress);
      }

      return [
        ...sortedList,
        ...customerAddressList.value
          .filter((a) => a.id !== selectedAddressStore.selectedAddress?.id)
          .map((address) => address),
      ];
    });

    /* actions */
    const load = async (): Promise<void> => {
      loading.value = true;
      try {
        await timeout(300);
        // customerAddressList.value = customerAddressFixture;
        error.value = null;
      } catch (e: any) {
        customerAddressList.value = [];
        error.value = e.toString();
      } finally {
        loading.value = false;
      }
    };

    const selectAddress = (address: Address) => {
      selectedAddressStore.selectAddress(address);
    };

    return {
      /* state */
      customerAddressList,
      loading,
      error,

      /* getters */
      sortedCustomerAddressList,

      /* actions */
      addAddress,
      deleteAddress,
      load,
    };
  },
  {
    persist: false,
  },
);
