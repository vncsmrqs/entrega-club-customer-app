import { ref } from 'vue';
import { defineStore } from 'pinia';
import { timeout } from '@/utils';

export type Phone = {
  countryCode: number; // 55
  areaCode: number; // 77
  number: string; // '991815309'
  fullNumber: string; // '77991815309'
};

export type Account = {
  id: string;
  active: boolean;
  name: string;
  phone: Phone;
  email: string;
  registrationDate: string; // '2018-11-17T12:35:07.974Z'
  tenantId: string; // 'ENTREGA_CLUB'
  userType: string; // 'CUSTOMER'
};

export const accountFixture: Account = {
  id: 'dacebc31-30b7-4fe1-ad4b-8936899db9a5',
  name: 'Vinicius Marques',
  phone: {
    countryCode: 55,
    areaCode: 77,
    number: '991815309',
    fullNumber: '77991815309',
  },
  email: 'vncsmrqs@gmail.com',
  registrationDate: '2018-11-17T12:35:07.974Z',
  tenantId: 'ENTREGA_CLUB',
  active: true,
  userType: 'CUSTOMER',
};

export const useAuthStore = defineStore(
  'auth',
  () => {
    /* state */
    const account = ref<Account | null>();
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    /* getters */

    /* actions */
    const auth = async (): Promise<void> => {
      loading.value = true;
      try {
        await timeout(3000);
        account.value = accountFixture;
      } catch (e: any) {
        error.value = e.toString();
        account.value = null;
      } finally {
        loading.value = false;
      }
    };

    return {
      /* state */
      account,
      loading,
      error,

      /* getters */

      /* actions */
      auth,
    };
  },
  {
    persist: {
      paths: ['account'],
    },
  },
);
