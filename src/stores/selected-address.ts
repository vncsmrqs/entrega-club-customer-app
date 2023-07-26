import { ref } from 'vue';
import { defineStore } from 'pinia';
import { generateId, timeout } from '@/utils';
import type { Address } from '@/stores/customer-address-list';

export const useSelectedAddressStore = defineStore(
  'selected-address',
  () => {
    /* state */
    const accountId = ref<string | null>(generateId());
    const selectedAddress = ref<Address | null>(null);
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const loadCurrentAddress = async (): Promise<void> => {
      loading.value = true;
      try {
        await timeout(3000);
        // selectAddress(null);
        error.value = null;
      } catch (e: any) {
        error.value = e.toString();
        console.error(e);
      } finally {
        loading.value = false;
      }
    };

    const selectAddress = (address: Address | null) => {
      selectedAddress.value = address;
    };

    return {
      /* state */
      accountId,
      selectedAddress,
      loading,
      error,

      /* getters */

      /* actions */
      loadCurrentAddress,
      selectAddress,
    };
  },
  {
    persist: {
      paths: ['userId', 'selectedAddress'],
      afterRestore: () => {
        //todo: remover endereço caso usuário logado seja outro
      },
    },
  },
);