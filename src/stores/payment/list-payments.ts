import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { timeout } from '@/utils';

export type PaymentOptionsType = 'ONLINE' | 'OFFLINE';

export type PaymentMethod =
  | CardPaymentMethod
  | 'PIX'
  | 'DIGITAL_WALLET'
  | 'CASH';

export type CardPaymentMethod =
  | 'DEBIT'
  | 'CREDIT'
  | 'MEAL_VOUCHER' // Vale-refeição
  | 'FOOD_VOUCHER'; // Vale-alimentação

export type PaymentMethodBrand = {
  id: string; //'ed4f2cee-a87d-4659-9b0b-c37b854c99eb'
  name: string; //'DINERS'
  description: string; // 'Diners';
  imageUrl?: string;
  regex?: string; //'^3(?:0[0-5]|[68][0-9])[0-9]{11}$'
  cvv_regex?: string; //'^[0-9]{3}$';
};

export type PaymentLiability = 'APP' | 'MERCHANT';

export type Payment = {
  id: string;
  type: PaymentOptionsType;
  method: PaymentMethod;
  liability: PaymentLiability;
  brand: PaymentMethodBrand;
};

export const useListPaymentStore = defineStore('list-payment', () => {
  /* state */
  const payments = ref<Payment[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  /* getters */
  const isEmpty = computed(() => {
    return !payments.value.length;
  });

  /* actions */
  const fetch = async (): Promise<void> => {
    loading.value = true;
    try {
      await timeout(500);
      payments.value = [];
    } catch (e: any) {
      error.value = e.toString();
      payments.value = [];
    } finally {
      loading.value = false;
    }
  };

  return {
    /* state */
    payments,
    loading,
    error,

    /* getters */
    isEmpty,

    /* actions */
    fetch,
  };
});
