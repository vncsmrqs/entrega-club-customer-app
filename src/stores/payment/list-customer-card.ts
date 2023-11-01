import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { generateHashId, generateId, timeout } from '@/utils';
import type {
  CardPaymentMethod,
  Payment,
  PaymentMethodBrand,
} from '@/stores/payment/list-payments';

export type CardPayment = Payment & {
  type: 'ONLINE';
  method: CardPaymentMethod;
  liability: 'APP';
  nickname: string;
  cardNumber: string;
  token: string;
};

export const generateEmptyPaymentMethodBrand = (): PaymentMethodBrand => ({
  id: generateId(),
  name: 'MASTERCARD ONLINE' + generateHashId(),
  description: 'Mastercard ' + generateHashId(),
  imageUrl: 'https://loremflickr.com/400/300/pizza?hash=' + generateHashId(),
  regex: '^3(?:0[0-5]|[68][0-9])[0-9]{11}$',
  cvv_regex: '^[0-9]{3}$',
});

export const generateEmptyCardPayment = (): CardPayment => ({
  id: generateId(),
  type: 'ONLINE',
  method: 'CREDIT',
  liability: 'APP',
  nickname: 'Nubank Virtual',
  cardNumber: '**** **** **** 1233',
  token: generateHashId(16),
  brand: generateEmptyPaymentMethodBrand(),
});

export const useListCustomerCardStore = defineStore(
  'list-customer-card',
  () => {
    /* state */
    const cards = ref<CardPayment[]>([]);
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    /* getters */
    const isEmpty = computed(() => {
      return !cards.value.length;
    });

    /* actions */
    const fetch = async (): Promise<void> => {
      loading.value = true;
      try {
        await timeout(500);
        cards.value = [1, 2, 3, 4, 5].map(generateEmptyCardPayment);
      } catch (e: any) {
        error.value = e.toString();
        cards.value = [];
      } finally {
        loading.value = false;
      }
    };

    return {
      /* state */
      cards,
      loading,
      error,

      /* getters */
      isEmpty,

      /* actions */
      fetch,
    };
  },
);
