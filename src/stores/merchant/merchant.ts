import { defineStore } from 'pinia';
import type { Address } from '@/stores/address/customer-address-list';
import {
  addressFixtureFunc,
  generateEmptyAddress,
} from '@/stores/address/customer-address-list';
import { generateHashId, generateId, timeout } from '@/utils';
import { ref } from 'vue';

export type MerchantPriceRange =
  | 'VERY_CHEAP'
  | 'CHEAP'
  | 'REGULAR'
  | 'EXPENSIVE'
  | 'VERY_EXPENSIVE';

export type MerchantType = 'RESTAURANT' | 'LIQUOR_STORE';

export type CategoryType = {
  id: string;
  name: string;
  description?: string;
};

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
  categories: CategoryType[];
  distance: number;
  type: MerchantType;
  priceRange: MerchantPriceRange;
  deliveryFee: number;
  deliveryMethods: MerchantDeliveryMethod[];
  address: Address;
  shifts: MerchantShift[];
  mainCategory: CategoryType;
};

export type DeliveryMode = 'DELIVERY' | 'TAKEOUT';

export type MerchantDeliveryMethod = {
  deliveredBy: 'MERCHANT' | null;
  mode: DeliveryMode;
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
  name: `Restaurante ${generateHashId()}`,
  logoUrl: 'https://loremflickr.com/256/256/restaurant?hash=' + generateId(),
  bannerUrl: 'https://loremflickr.com/900/300/restaurant?hash=' + generateId(),
  minimumOrderValue: 40,
  userRating: 4.7,
  mainCategory: {
    id: generateHashId(),
    name: 'Pizza',
  },
  categories: [
    {
      id: generateHashId(),
      name: 'Pizza',
    },
    {
      id: generateHashId(),
      name: 'Esfirra',
    },
  ],
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
  logoUrl: '/images/merchant/logo-default.png',
  bannerUrl: '/images/merchant/banner-default.png',
  minimumOrderValue: 0,
  userRating: 0,
  mainCategory: {
    id: '',
    name: '',
  },
  categories: [],
  distance: 0,
  type: 'RESTAURANT',
  priceRange: 'VERY_CHEAP',
  deliveryFee: 0,
  deliveryMethods: [],
});

export const useMerchantStore = defineStore('merchant', () => {
  /* state */
  const merchant = ref<Merchant>(generateEmptyMerchant());
  const loading = ref(false);
  const error = ref<string | null>(null);

  /* getters */

  /* actions */
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
