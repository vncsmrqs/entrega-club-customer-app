import { reactive } from 'vue';
import { defineStore } from 'pinia';
import type { Address } from '@/stores/address';
import { addressFixtureFunc } from '@/stores/address';

export type Merchant = {
  id: string;
  slug: string;
  name: string;
  available: boolean;
  preparationTime: number;
  logoUrl?: string;
  bannerUrl?: string;
  minimumOrderValue: number;
  userRating: number;
  categories: string[];
  distance: number;
  type: 'RESTAURANT' | 'LIQUOR_STORE';
  priceRange:
    | 'VERY_CHEAP'
    | 'CHEAP'
    | 'REGULAR'
    | 'EXPENSIVE'
    | 'VERY_EXPENSIVE';
  deliveryFee: number;
  deliveryMethods: MerchantDeliveryMethod[];
  address: Address;
  shifts: MerchantShift[];
};

export type MerchantDeliveryMethod = {
  deliveredBy: 'MERCHANT' | null;
  mode: 'DELIVERY' | 'TAKEOUT';
  subtitle: string;
  title: string;
  maxTime: number;
  minTime: number;
};

export type MerchantShift = {
  dayOfWeek:
    | 'SUNDAY'
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY';
  duration: number;
  start: string; // '12:00:00';
};

const merchantFixture: Merchant = {
  address: addressFixtureFunc(1),
  shifts: [],
  id: 'd9969801-5203-4f6a-ba4b-6bc8af8d8fac',
  slug: 'jaiba-mg/o-rei-da-pizza',
  available: true,
  preparationTime: 10,
  name: 'O rei da pizza',
  logoUrl: '/logo/primary-white/logo-primary-white-192x192.png',
  minimumOrderValue: 40,
  userRating: 4.7,
  categories: ['Pizza'],
  distance: 3,
  type: 'RESTAURANT',
  priceRange: 'VERY_CHEAP',
  deliveryFee: 10,
  deliveryMethods: [
    {
      deliveredBy: 'MERCHANT',
      mode: 'DELIVERY',
      subtitle: 'O entregador leva até você agora',
      title: 'Entrega',
      maxTime: 10,
      minTime: 0,
    },
    {
      deliveredBy: null,
      maxTime: 10,
      minTime: 0,
      mode: 'TAKEOUT',
      subtitle: 'Você retira seu pedido no local',
      title: 'Retirada',
    },
  ],
};

export const useMerchantStore = defineStore('merchant', () => {
  /* state */
  const merchant = reactive<Merchant>(merchantFixture);

  /* getters */

  /* actions */

  return {
    /* state */
    merchant,

    /* getters */

    /* actions */
  };
});
