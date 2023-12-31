import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { timeout } from '@/utils';
import type { Merchant } from '@/stores/merchant/merchant';
import type { Product } from '@/stores/merchant/product';
import { merchantFixture } from '@/stores/merchant/merchant';
import { productFixture } from '@/stores/merchant/product';

export type SearchResult = {
  products: Product[];
  merchants: Merchant[];
};

export const generateEmptySearchResult = (): SearchResult => ({
  products: [],
  merchants: [],
});

export const generateSearchResultFixture = (): SearchResult => ({
  products: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(productFixture),
  merchants: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(merchantFixture),
});

export const useSearchStore = defineStore(
  'search',
  () => {
    /* state */
    const result = ref<SearchResult>(generateEmptySearchResult());
    const term = ref<string>('');

    const lastTerms = ref<string[]>([]);

    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    /* getters */
    const isEmpty = computed(() => {
      return !totalProducts.value || !totalMerchants.value;
    });

    const products = computed<Product[]>(() => {
      return result.value.products;
    });

    const merchants = computed<Merchant[]>(() => {
      return result.value.merchants;
    });

    const totalProducts = computed<number>(() => {
      return products.value.length;
    });

    const totalMerchants = computed<number>(() => {
      return merchants.value.length;
    });

    /* actions */

    const search = async (searchTerm: string): Promise<void> => {
      loading.value = true;
      try {
        term.value = searchTerm;
        await timeout(1000);
        result.value = generateSearchResultFixture();
        error.value = null;
      } catch (e: any) {
        error.value = e.toString();
        result.value = generateEmptySearchResult();
      } finally {
        loading.value = false;
      }
    };

    return {
      /* state */
      result,
      term,
      lastTerms,
      loading,
      error,

      /* getters */
      isEmpty,
      totalProducts,
      totalMerchants,
      products,
      merchants,

      /* actions */
      search,
    };
  },
  {
    persist: {
      storage: sessionStorage,
      paths: ['lastTerms'],
    },
  },
);
