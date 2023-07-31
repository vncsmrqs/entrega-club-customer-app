import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { timeout } from '@/utils';
import type { Merchant } from '@/stores/merchant/merchant';
import type { Product } from '@/stores/merchant/product';

export type SearchResult = {
  products: Product[];
  merchants: Merchant[];
};

export const generateEmptySearchResult = (): SearchResult => ({
  products: [],
  merchants: [],
});

export const useSearchStore = defineStore('search', () => {
  /* state */
  const result = ref<SearchResult>(generateEmptySearchResult());
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

  const search = async (term: string): Promise<void> => {
    loading.value = true;
    try {
      console.log(term);
      await timeout(500);
      result.value = generateEmptySearchResult();
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
});
