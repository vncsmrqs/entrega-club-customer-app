import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { generateHashId, timeout } from '@/utils';
import type {
  MerchantCategoryType,
  MerchantDeliveryMode,
  MerchantPriceRange,
  MerchantType,
} from '@/stores/merchant/merchant';

export type OnlinePaymentMethod = {
  id: string;
  name: string;
  type: 'CREDIT' | 'DEBIT' | 'PIX';
};

export type OnDeliveryPaymentMethod = {
  id: string;
  name: string;
  type: 'CURRENCY' | 'CREDIT' | 'DEBIT';
};

export type SortType =
  | 'PRICE'
  | 'RATING'
  | 'DELIVERY_TIME'
  | 'DELIVERY_FEE'
  | 'DISTANCE';

export type SearchFilter = {
  /* Básico */
  distance?: number;
  deliveryFee?: number;
  deliveryMode?: MerchantDeliveryMode;
  sortBy?: SortType;

  /* Categorias */
  categories?: string[];
  merchantType?: MerchantType;

  /* Pagamento */
  priceRange?: MerchantPriceRange;
  onlinePayment?: string[];
  paymentOnDelivery?: string[];
};

export type AvailableFilters = {
  /* Básico */
  distance: {
    min: number;
    max: number;
  };
  deliveryFee: number[];
  deliveryMode: MerchantDeliveryMode[];
  sortBy: SortType[];

  /* Categorias */
  categories: MerchantCategoryType[];
  merchantType: MerchantType[];

  /* Pagamento */
  priceRange: MerchantPriceRange[];
  onlinePayment: OnlinePaymentMethod[];
  paymentOnDelivery: OnDeliveryPaymentMethod[];
};

export const generateEmptyAvailableFilters = (): AvailableFilters => ({
  distance: {
    min: 0,
    max: 0,
  },
  deliveryFee: [],
  deliveryMode: [],
  sortBy: [],

  /* Categorias */
  categories: [],
  merchantType: [],

  /* Pagamento */
  priceRange: [],
  onlinePayment: [],
  paymentOnDelivery: [],
});

export const generateAvailableFiltersFixture = (): AvailableFilters => ({
  distance: {
    min: 1,
    max: 100,
  },
  deliveryFee: [0, 5, 10],
  deliveryMode: ['DELIVERY', 'TAKEOUT'],
  sortBy: ['PRICE', 'RATING', 'DELIVERY_TIME', 'DELIVERY_FEE', 'DISTANCE'],

  /* Categorias */
  categories: [
    {
      id: generateHashId(),
      name: 'PIZZA',
    },
    {
      id: generateHashId(),
      name: 'LANCHE',
    },
    {
      id: generateHashId(),
      name: 'AÇAÍ',
    },
  ],
  merchantType: ['RESTAURANT', 'LIQUOR_STORE'],

  /* Pagamento */
  priceRange: ['VERY_CHEAP', 'CHEAP', 'REGULAR', 'EXPENSIVE', 'VERY_EXPENSIVE'],
  onlinePayment: [
    {
      id: generateHashId(),
      name: 'PIX',
      type: 'PIX',
    },
    {
      id: generateHashId(),
      name: 'MASTERCARD - CRÉDITO',
      type: 'CREDIT',
    },
    {
      id: generateHashId(),
      name: 'MASTERCARD - DÉBITO',
      type: 'DEBIT',
    },
    {
      id: generateHashId(),
      name: 'VISA - CRÉDITO',
      type: 'CREDIT',
    },
    {
      id: generateHashId(),
      name: 'VISA - DÉBITO',
      type: 'DEBIT',
    },
  ],
  paymentOnDelivery: [
    {
      id: generateHashId(),
      name: 'DINHEIRO',
      type: 'CURRENCY',
    },
    {
      id: generateHashId(),
      name: 'MASTERCARD - CRÉDITO',
      type: 'CREDIT',
    },
    {
      id: generateHashId(),
      name: 'MASTERCARD - DÉBITO',
      type: 'DEBIT',
    },
    {
      id: generateHashId(),
      name: 'VISA - CRÉDITO',
      type: 'CREDIT',
    },
    {
      id: generateHashId(),
      name: 'VISA - DÉBITO',
      type: 'DEBIT',
    },
  ],
});

export const generateEmptyFilters = (): SearchFilter => ({});

export const useSearchFilterStore = defineStore(
  'search-filter',
  () => {
    /* state */
    const availableFilters = ref<AvailableFilters>(
      generateEmptyAvailableFilters(),
    );
    const filters = ref<SearchFilter>(generateEmptyFilters());
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    /* getters */

    const isEmpty = computed(() => !!totalApplied.value);
    const totalApplied = computed(() => 0);

    /* actions */
    const fetch = async (): Promise<void> => {
      loading.value = true;
      try {
        await timeout(1000);
        availableFilters.value = generateAvailableFiltersFixture();
        error.value = null;
      } catch (e: any) {
        console.log('search-filter::fetch::error', e);
        error.value = e.toString();
        availableFilters.value = generateEmptyAvailableFilters();
      } finally {
        loading.value = false;
      }
    };

    const clear = () => (filters.value = generateEmptyFilters());

    return {
      /* state */
      availableFilters,
      filters,
      loading,
      error,

      /* getters */
      isEmpty,
      totalApplied,

      /* actions */
      fetch,
      clear,
    };
  },
  {
    persist: {
      storage: sessionStorage,
      paths: ['filters'],
    },
  },
);
