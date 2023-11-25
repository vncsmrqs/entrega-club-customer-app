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
} from '@/stores/payment/list-payments';
import type { MerchantDeliveryMode } from '@/stores/merchant/merchant';

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

export type DRAFT = 'DRAFT';
export type WAITING_ONLINE_PAYMENT = 'WAITING_ONLINE_PAYMENT';
export type ONLINE_PAYMENT_IN_PROGRESS = 'ONLINE_PAYMENT_IN_PROGRESS';
export type ONLINE_PAYMENT_APPROVED = 'ONLINE_PAYMENT_APPROVED';
export type ONLINE_PAYMENT_DENIED = 'ONLINE_PAYMENT_DENIED';
export type WAITING_FOR_MERCHANT_APPROVAL = 'WAITING_FOR_MERCHANT_APPROVAL';
export type DENIED_BY_MERCHANT = 'DENIED_BY_MERCHANT';
export type APPROVED_BY_MERCHANT = 'APPROVED_BY_MERCHANT';
export type IN_PREPARATION = 'IN_PREPARATION';
export type CANCELED_BY_CUSTOMER = 'CANCELED_BY_CUSTOMER';
export type CANCELED_BY_MERCHANT = 'CANCELED_BY_MERCHANT';
export type DONE = 'DONE';
export type WAITING_FOR_DRIVER = 'WAITING_FOR_DRIVER';
export type DRIVER_ON_THE_WAY_TO_MERCHANT = 'DRIVER_ON_THE_WAY_TO_MERCHANT';
export type DRIVER_WAITING_PACKAGE = 'DRIVER_WAITING_PACKAGE';
export type DELIVERY_ON_THE_WAY = 'DELIVERY_ON_THE_WAY';
export type DELIVERY_CONFIRMED_BY_MERCHANT = 'DELIVERY_CONFIRMED_BY_MERCHANT';
export type DELIVERY_CONFIRMED_BY_DRIVER = 'DELIVERY_CONFIRMED_BY_DRIVER';
export type DELIVERY_CONFIRMED_BY_CUSTOMER = 'DELIVERY_CONFIRMED_BY_CUSTOMER';
export type CONCLUDED = 'CONCLUDED';
export type OFFLINE_PAYMENT_APPROVED = 'OFFLINE_PAYMENT_APPROVED';
export type WAITING_FOR_TAKEOUT = 'WAITING_FOR_TAKEOUT';
export type TAKEOUT_CONFIRMED_BY_MERCHANT = 'TAKEOUT_CONFIRMED_BY_MERCHANT';
export type TAKEOUT_CONFIRMED_BY_CUSTOMER = 'TAKEOUT_CONFIRMED_BY_CUSTOMER';

export type DELIVERY_ONLINE_PAYMENT =
  | DRAFT
  | WAITING_ONLINE_PAYMENT
  | ONLINE_PAYMENT_IN_PROGRESS
  | ONLINE_PAYMENT_APPROVED
  | ONLINE_PAYMENT_DENIED
  | WAITING_FOR_MERCHANT_APPROVAL
  | DENIED_BY_MERCHANT
  | APPROVED_BY_MERCHANT
  | IN_PREPARATION
  | CANCELED_BY_CUSTOMER
  | CANCELED_BY_MERCHANT
  | DONE
  | WAITING_FOR_DRIVER
  | DRIVER_ON_THE_WAY_TO_MERCHANT
  | DRIVER_WAITING_PACKAGE
  | DELIVERY_ON_THE_WAY
  | DELIVERY_CONFIRMED_BY_MERCHANT
  | DELIVERY_CONFIRMED_BY_DRIVER
  | DELIVERY_CONFIRMED_BY_CUSTOMER
  | CONCLUDED;

export type DELIVERY_OFFLINE_PAYMENT =
  | DRAFT
  | WAITING_FOR_MERCHANT_APPROVAL
  | DENIED_BY_MERCHANT
  | APPROVED_BY_MERCHANT
  | IN_PREPARATION
  | CANCELED_BY_CUSTOMER
  | CANCELED_BY_MERCHANT
  | DONE
  | WAITING_FOR_DRIVER
  | DRIVER_ON_THE_WAY_TO_MERCHANT
  | DRIVER_WAITING_PACKAGE
  | DELIVERY_ON_THE_WAY
  | OFFLINE_PAYMENT_APPROVED
  | DELIVERY_CONFIRMED_BY_MERCHANT
  | DELIVERY_CONFIRMED_BY_DRIVER
  | DELIVERY_CONFIRMED_BY_CUSTOMER
  | CONCLUDED;

export type TAKEOUT_ONLINE_PAYMENT =
  | DRAFT
  | WAITING_ONLINE_PAYMENT
  | ONLINE_PAYMENT_IN_PROGRESS
  | ONLINE_PAYMENT_APPROVED
  | ONLINE_PAYMENT_DENIED
  | WAITING_FOR_MERCHANT_APPROVAL
  | DENIED_BY_MERCHANT
  | APPROVED_BY_MERCHANT
  | IN_PREPARATION
  | CANCELED_BY_CUSTOMER
  | CANCELED_BY_MERCHANT
  | DONE
  | WAITING_FOR_TAKEOUT
  | TAKEOUT_CONFIRMED_BY_MERCHANT
  | TAKEOUT_CONFIRMED_BY_CUSTOMER
  | CONCLUDED;

export type TAKEOUT_OFFLINE_PAYMENT =
  | DRAFT
  | WAITING_FOR_MERCHANT_APPROVAL
  | DENIED_BY_MERCHANT
  | APPROVED_BY_MERCHANT
  | IN_PREPARATION
  | CANCELED_BY_CUSTOMER
  | CANCELED_BY_MERCHANT
  | DONE
  | WAITING_FOR_TAKEOUT
  | OFFLINE_PAYMENT_APPROVED
  | TAKEOUT_CONFIRMED_BY_MERCHANT
  | TAKEOUT_CONFIRMED_BY_CUSTOMER
  | CONCLUDED;

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
    | DELIVERY_ONLINE_PAYMENT
    | DELIVERY_OFFLINE_PAYMENT
    | TAKEOUT_ONLINE_PAYMENT
    | TAKEOUT_OFFLINE_PAYMENT;

  DELIVERY_ONLINE_PAYMENT:
    | 'DRAFT'
    | 'WAITING_ONLINE_PAYMENT'
    | 'ONLINE_PAYMENT_IN_PROGRESS'
    | 'ONLINE_PAYMENT_APPROVED'
    | 'ONLINE_PAYMENT_DENIED'
    | 'WAITING_FOR_MERCHANT_APPROVAL'
    | 'DENIED_BY_MERCHANT'
    | 'APPROVED_BY_MERCHANT'
    | 'IN_PREPARATION'
    | 'CANCELED_BY_CUSTOMER'
    | 'CANCELED_BY_MERCHANT'
    | 'DONE'
    | 'WAITING_FOR_DRIVER'
    | 'DRIVER_ON_THE_WAY_TO_MERCHANT'
    | 'DRIVER_WAITING_PACKAGE'
    | 'DELIVERY_ON_THE_WAY'
    | 'DELIVERY_CONFIRMED_BY_MERCHANT'
    | 'DELIVERY_CONFIRMED_BY_DRIVER'
    | 'DELIVERY_CONFIRMED_BY_CUSTOMER'
    | 'CONCLUDED';

  TAKEOUT_ONLINE_PAYMENT:
    | 'DRAFT'
    | 'WAITING_ONLINE_PAYMENT'
    | 'ONLINE_PAYMENT_IN_PROGRESS'
    | 'ONLINE_PAYMENT_APPROVED'
    | 'ONLINE_PAYMENT_DENIED'
    | 'WAITING_FOR_MERCHANT_APPROVAL'
    | 'DENIED_BY_MERCHANT'
    | 'APPROVED_BY_MERCHANT'
    | 'IN_PREPARATION'
    | 'CANCELED_BY_CUSTOMER'
    | 'CANCELED_BY_MERCHANT'
    | 'DONE'
    | 'WAITING_FOR_TAKEOUT'
    | 'TAKEOUT_CONFIRMED_BY_MERCHANT'
    | 'TAKEOUT_CONFIRMED_BY_CUSTOMER'
    | 'CONCLUDED';

  DELIVERY_OFFLINE_PAYMENT:
    | 'DRAFT'
    | 'WAITING_FOR_MERCHANT_APPROVAL'
    | 'DENIED_BY_MERCHANT'
    | 'APPROVED_BY_MERCHANT'
    | 'IN_PREPARATION'
    | 'CANCELED_BY_CUSTOMER'
    | 'CANCELED_BY_MERCHANT'
    | 'DONE'
    | 'WAITING_FOR_DRIVER'
    | 'DRIVER_ON_THE_WAY_TO_MERCHANT'
    | 'DRIVER_WAITING_PACKAGE'
    | 'DELIVERY_ON_THE_WAY'
    | 'OFFLINE_PAYMENT_APPROVED'
    | 'DELIVERY_CONFIRMED_BY_MERCHANT'
    | 'DELIVERY_CONFIRMED_BY_DRIVER'
    | 'DELIVERY_CONFIRMED_BY_CUSTOMER'
    | 'CONCLUDED';

  TAKEOUT_OFFLINE_PAYMENT:
    | 'DRAFT'
    | 'WAITING_FOR_MERCHANT_APPROVAL'
    | 'DENIED_BY_MERCHANT'
    | 'APPROVED_BY_MERCHANT'
    | 'IN_PREPARATION'
    | 'CANCELED_BY_CUSTOMER'
    | 'CANCELED_BY_MERCHANT'
    | 'DONE'
    | 'WAITING_FOR_TAKEOUT'
    | 'OFFLINE_PAYMENT_APPROVED'
    | 'TAKEOUT_CONFIRMED_BY_MERCHANT'
    | 'TAKEOUT_CONFIRMED_BY_CUSTOMER'
    | 'CONCLUDED';

  merchant: OrderMerchant;
  payments: OrderPayment;
  bag: Bag;
  deliveryMode: {
    mode: MerchantDeliveryMode;
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
