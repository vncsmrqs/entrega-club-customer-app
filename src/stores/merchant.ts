import { reactive } from 'vue';
import { defineStore } from 'pinia';
import type { Address } from '@/stores/customer-address-list';
import { addressFixtureFunc } from '@/stores/customer-address-list';
import { generateId } from '@/utils';

export type MerchantPriceRange =
  | 'VERY_CHEAP'
  | 'CHEAP'
  | 'REGULAR'
  | 'EXPENSIVE'
  | 'VERY_EXPENSIVE';

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
  priceRange: MerchantPriceRange;
  deliveryFee: number;
  deliveryMethods: MerchantDeliveryMethod[];
  address: Address;
  shifts: MerchantShift[];
  mainCategory: string;
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

export const merchantFixture = (): Merchant => ({
  address: addressFixtureFunc(1),
  shifts: [],
  id: generateId(),
  slug: 'jaiba-mg/o-rei-da-pizza',
  available: true,
  preparationTime: 10,
  name: 'O rei da pizza',
  logoUrl: '/logo/transparent-white/logo-transparent-white-192x192.png',
  minimumOrderValue: 40,
  userRating: 4.7,
  mainCategory: 'Pizza',
  categories: ['Pizza', 'Esfirra'],
  distance: 3,
  type: 'RESTAURANT',
  priceRange: 'VERY_CHEAP',
  deliveryFee: 0,
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
});

export const useMerchantStore = defineStore('merchant', () => {
  /* state */
  const merchant = reactive<Merchant>(merchantFixture());

  /* getters */

  /* actions */

  return {
    /* state */
    merchant,

    /* getters */

    /* actions */
  };
});
