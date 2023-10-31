import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Address } from '@/stores/address/customer-address-list';
import type { Phone } from '@/stores/auth';
import type { Bag } from '@/stores/bag';
import { timeout } from '@/utils';
import type {
  PaymentMethod,
  PaymentMethodBrand,
  PaymentOptionsType,
} from '@/stores/payment';
import type { DeliveryMode } from '@/stores/merchant/merchant';

export type OrderMerchant = {
  id: string;
  name: string;
  phone: Phone;
  logoUrl?: string;
  type: 'RESTAURANT';
  address: Address;
};

export type OrderPaymentTotalType = {
  currency: 'BRL';
  value: number;
};

export type OrderPaymentAmountType = {
  currency: 'BRL';
  value: number;
};

export type OrderPayment = {
  methods: [
    {
      id: string;
      method: {
        name: PaymentMethod;
        description: string;
      };
      type: {
        name: PaymentOptionsType;
        description: string;
      };
      brand: PaymentMethodBrand;
      amount: OrderPaymentAmountType;
      credit?: {
        cardNumber: string; // "************6814"
      };
      debit?: {
        cardNumber: string; // "************6814"
      };
      mealVoucher?: {
        cardNumber: string; // "************6814"
      };
      foodVoucher?: {
        cardNumber: string; // "************6814"
      };
      pix?: {};
      digitalWallet?: {};
      cash?: {};
      transactions: [];
    },
  ];
  total: OrderPaymentTotalType;
};

export type Order = {
  id: string; // 'f34e956a-4bcd-4b5a-9ecc-caf438f90657';
  orderNumber: string; // '7063';
  createdAt: string; // '2022-08-12T13:50:46-03:00';
  updatedAt: string; // '2022-08-12T14:28:38-03:00';
  closedAt: string; // '2022-08-12T14:28:38-03:00';
  delivery: {
    address: Address;
    estimatedTimeOfArrival: {
      deliversAt: '2022-08-12T14:15:46-03:00';
      updatedAt: '2022-08-12T14:28:38-03:00';
      deliversEndAt: '2022-08-12T14:25:46-03:00';
    };
    expectedDeliveryTime: '2022-08-12T14:15:46-03:00';
    expectedDuration: 1500;
    expectedDeliveryTimeEnd: '2022-08-12T14:25:46-03:00';
    isFullService: false;
  };
  lastStatus:
    | 'WAITING_FOR_APPROVAL'
    | 'DENIED'
    | 'CANCELED_BY_CUSTOMER'
    | 'CANCELED_BY_MERCHANT'
    | 'IN_PREPARATION'
    | 'WAITING_FOR_TAKEOUT'
    | 'CONCLUDED';
  merchant: OrderMerchant;
  payments: OrderPayment;
  bag: Bag;
  deliveryMode: {
    mode: DeliveryMode;
    note: string;
  };
  fees: [];
};

export const useOrdersStore = defineStore('orders', () => {
  /* state */
  const orders = ref<Order[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  /* getters */

  /* actions */
  const fetch = async (): Promise<void> => {
    loading.value = true;
    try {
      //todo: Pegar pedidos a partir do ID do usuário
      await timeout(500);
      orders.value = [];
    } catch (e: any) {
      error.value = e.toString();
      orders.value = [];
    } finally {
      loading.value = false;
    }
  };

  return {
    /* state */
    orders,
    loading,
    error,

    /* getters */

    /* actions */
    fetch,
  };
});
