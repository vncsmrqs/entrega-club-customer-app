import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import type { Address } from '@/stores/address';
import type { Phone } from '@/stores/auth';
import type { Bag } from '@/stores/bag';

export type OrderMerchant = {
  id: string;
  name: string;
  phone: Phone;
  logoUrl?: string;
  type: 'RESTAURANT';
  address: Address;
};

export type OrderDeliveryMethod = {
  mode: 'DELIVERY' | 'TAKEOUT';
  note: string;
};

export type PaymentMethodType = {
  name: 'MEAL_VOUCHER';
  description: 'Vale-refeição';
};

export type PaymentType = {
  name: 'ONLINE' | 'ON_DELIVERY';
  description: string;
};

export type PaymentMethodBrand = {
  id: string;
  imageUrl?: string;
  name: string;
  description: string;
};

export type PaymentAmount = {
  currency: 'BRL';
  value: number;
};

export type OrderPayment = {
  methods: [
    {
      id: string;
      method: PaymentMethodType;
      type: PaymentType;
      brand: PaymentMethodBrand;
      amount: PaymentAmount;
      credit?: {
        cardNumber: string; // "************6814"
      };
      mealVoucher?: {
        cardNumber: string; // "************6814"
      };
    },
  ];
  total: {
    currency: 'BRL';
    value: number;
  };
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
  deliveryMethod: OrderDeliveryMethod;

  fees: [];
};

export const useOrdersStore = defineStore('orders', () => {
  /* state */
  const orders = ref<Order[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  /* getters */

  /* actions */
  const list = async (): Promise<void> => {
    loading.value = true;
    try {
      setTimeout(() => {
        orders.value = [];
      }, 3000);
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
    list,
  };
});
