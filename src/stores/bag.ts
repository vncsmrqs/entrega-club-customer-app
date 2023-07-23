import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { Choice, GarnishItem, Product } from '@/stores/product';

export type BagProduct = {
  id: string;
  productDetails?: Product;
  selectedChoices: BagChoice[];
  quantity: number;
  comment: string | null;
};

export type BagChoice = {
  choiceDetails: Choice;
  selectedGarnishItems: BagGarnishItem[];
};

export type BagGarnishItem = {
  garnishItemDetails: GarnishItem;
  quantity: number;
};

// export type Bag = {
//   benefits: [];
//   deliveryFee: {
//     value: 0;
//     valueWithDiscount: 0;
//   };
//   items: [
//     {
//       id: '57a021e2-a06f-49f3-a5bf-ab12915f1e9b';
//       uniqueId: '186e447a-bf50-418e-8159-1bde627e411e';
//       externalId: '57a021e2-a06f-49f3-a5bf-ab12915f1e9b';
//       name: 'Parmegiana de Filé de Frango';
//       description: 'Arroz, bife de frango parmegiana ao molho caseiro(molho vermelho e molho branco) e batata palha.\nAprox. 600g';
//       quantity: 2;
//       subItems: [];
//       tags: ['TAG::IMPERDIVEIS70_ABR'];
//       totalPrice: 6998;
//       totalPriceWithDiscount: 6998;
//       unitPrice: 3499;
//       unitPriceWithDiscount: 3499;
//       logoUrl: 'de2eb48a-f14b-4842-a257-1ecd71ee6d85/202012291306_3fyf_.jpeg';
//     },
//   ];
//   subTotal: {
//     // Valor dos itens
//     value: 6998;
//     valueWithDiscount: 6998;
//   };
//   total: {
//     // Valor total pago
//     value: 6998;
//     valueWithDiscount: 6998;
//   };
//   replacementOptions: {
//     mode: 'STORE_REMOVE_ITEMS';
//   };
//   updated: false;
// };

export type Bag = {
  items: BagProduct[];
};

export const useBagStore = defineStore('bag', () => {
  /* state */
  const bag = ref<Bag | null>({
    items: [],
  });

  /* getters */

  const isEmpty = computed(() => {
    return !bag.value?.items.length;
  });

  const items = computed<BagProduct[]>(() => {
    return bag.value?.items || [];
  });

  const total = computed<number>(() => {
    return 10;
  });

  /* actions */
  const addItem = (bagItem: BagProduct) => {
    if (bag.value) {
      bag.value.items.push(bagItem);
    }
  };

  const deleteItem = (bagItem: BagProduct) => {
    if (bag.value) {
      bag.value.items = bag.value?.items.filter(
        (item) => item.id !== bagItem.id,
      );
    }
  };

  return {
    /* state */
    bag,

    /* getters */
    isEmpty,
    items,
    total,

    /* actions */
    addItem,
    deleteItem,
  };
});
