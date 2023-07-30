import { defineStore } from 'pinia';
import type { Address } from '@/stores/customer-address-list';
import {
  addressFixtureFunc,
  generateEmptyAddress,
} from '@/stores/customer-address-list';
import { generateId, timeout } from '@/utils';
import { ref } from 'vue';

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
  logoUrl: '/images/merchant/rei-da-pizza-logo.png',
  bannerUrl: '/images/merchant/rei-da-pizza-banner.png',
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

const generateEmptyMerchant = (): Merchant => ({
  id: generateId(),
  address: generateEmptyAddress(),
  shifts: [],
  slug: '',
  available: false,
  preparationTime: 0,
  name: '',
  logoUrl: '/images/merchant/default-logo.png',
  bannerUrl: '/images/merchant/default-banner.png',
  minimumOrderValue: 0,
  userRating: 0,
  mainCategory: '',
  categories: [],
  distance: 0,
  type: 'RESTAURANT',
  priceRange: 'VERY_CHEAP',
  deliveryFee: 0,
  deliveryMethods: [],
});

export const useMerchantStore = defineStore('merchant', () => {
  /* state */
  const merchant = ref<Merchant>(merchantFixture());
  const loading = ref(false);
  const error = ref<string | null>(null);

  /* getters */
  const fetch = async (merchantId: string) => {
    loading.value = true;
    try {
      await timeout(3000);
      console.log({ merchantId });
      merchant.value = merchantFixture();
      error.value = null;
    } catch (e: any) {
      error.value = e.toString();
      merchant.value = generateEmptyMerchant();
    } finally {
      loading.value = false;
    }
  };

  /* actions */

  return {
    /* state */
    merchant,
    loading,
    error,

    /* getters */

    /* actions */
    fetch,
  };
});
