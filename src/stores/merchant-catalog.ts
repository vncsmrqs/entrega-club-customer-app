import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { generateId } from '@/utils';
import type { Product } from '@/stores/product';
import { productFixture } from '@/stores/product';

export type CatalogMenu = {
  id: string;
  name: string;
  available: boolean;
  products: Product[];
};

export type MerchantCatalog = {
  menus: CatalogMenu[];
};

const merchantCatalogFixture = {
  menus: [
    {
      id: generateId(),
      name: 'Hamburger de Carne',
      available: true,
      products: [1, 2, 3].map(() => productFixture),
    },
    {
      id: generateId(),
      name: 'Hamburger de Frango',
      available: true,
      products: [1, 2, 3].map(() => productFixture),
    },
    {
      id: generateId(),
      name: 'Hamburger Vegetariano',
      available: true,
      products: [1, 2, 3].map(() => productFixture),
    },
    {
      id: generateId(),
      name: 'Pizza',
      available: true,
      products: [1, 2, 3].map(() => productFixture),
    },
    {
      id: generateId(),
      name: 'Bebida',
      available: true,
      products: [1, 2, 3].map(() => productFixture),
    },
    {
      id: generateId(),
      name: 'Sobremesa',
      available: true,
      products: [1, 2, 3].map(() => productFixture),
    },
  ],
};

export const useMerchantCatalogStore = defineStore('merchant-catalog', () => {
  /* state */
  const merchantCatalog = reactive<MerchantCatalog>(merchantCatalogFixture);

  /* getters */

  /* actions */

  return {
    /* state */
    merchantCatalog,

    /* getters */

    /* actions */
  };
});
