import { ref } from 'vue';
import { defineStore } from 'pinia';
import { generateId, timeout } from '@/utils';
import type { Product } from '@/stores/product';
import { productFixture } from '@/stores/product';

export type CatalogMenu = {
  id: string;
  name: string;
  available: boolean;
  products: Product[];
};
export type CatalogSection = {
  id: string;
  available: boolean;
  name: string;
  products: Product[];
};

export type MerchantCatalog = {
  sections: CatalogSection[];
  menus: CatalogMenu[];
};

const merchantCatalogFixture = () => ({
  sections: [
    {
      id: generateId(),
      available: true,
      name: 'Os mais pedidos',
      products: [1, 2, 3, 4, 5].map(() => productFixture()),
    },
  ],
  menus: [
    {
      id: generateId(),
      name: 'Hamburger de Carne',
      available: true,
      products: [1, 2, 3].map(() => productFixture()),
    },
    {
      id: generateId(),
      name: 'Hamburger de Frango',
      available: true,
      products: [1, 2, 3].map(() => productFixture()),
    },
    {
      id: generateId(),
      name: 'Hamburger Vegetariano',
      available: true,
      products: [1, 2, 3].map(() => productFixture()),
    },
    {
      id: generateId(),
      name: 'Pizza',
      available: true,
      products: [1, 2, 3].map(() => productFixture()),
    },
    {
      id: generateId(),
      name: 'Bebida',
      available: true,
      products: [1, 2, 3].map(() => productFixture()),
    },
    {
      id: generateId(),
      name: 'Sobremesa',
      available: true,
      products: [1, 2, 3].map(() => productFixture()),
    },
  ],
});

const generateMerchantCatalogEmpty = (): MerchantCatalog => ({
  sections: [],
  menus: [],
});

export const useMerchantCatalogStore = defineStore('merchant-catalog', () => {
  /* state */
  const merchantCatalog = ref<MerchantCatalog>(generateMerchantCatalogEmpty());
  const loading = ref(false);
  const error = ref<string | null>(null);

  /* getters */

  /* actions */
  const fetch = async (merchantId: string): Promise<void> => {
    loading.value = true;
    try {
      await timeout(300);
      console.log({ merchantId });
      merchantCatalog.value = merchantCatalogFixture();
      error.value = null;
    } catch (e: any) {
      console.log('merchant-catalog::fetch::error', e);
      error.value = e.toString();
      merchantCatalog.value = generateMerchantCatalogEmpty();
    } finally {
      loading.value = false;
    }
  };

  return {
    /* state */
    merchantCatalog,

    /* getters */

    /* actions */
    fetch,
  };
});
