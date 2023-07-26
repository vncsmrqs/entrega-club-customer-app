import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { Choice, GarnishItem, Product } from '@/stores/product';
import { generateId } from '@/utils';

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
//   totalPrice: {
//     // Valor totalPrice pago
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

export const useBagStore = defineStore(
  'bag',
  () => {
    /* state */
    const accountId = ref<string | null>(generateId());

    const bag = ref<Bag | null>(null);

    /* getters */

    const isEmpty = computed(() => {
      return !bag.value?.items.length;
    });

    const items = computed<BagProduct[]>(() => {
      return bag.value?.items || [];
    });

    const totalItems = computed(() => {
      return bag.value?.items.reduce(
        (totalItem, item) => totalItem + item.quantity,
        0,
      );
    });

    /* actions */
    const calcTotalProduct = (bagProduct: BagProduct) => {
      const productPrice = bagProduct.productDetails?.unitPrice || 0;
      const totalChoices = calcTotalProductChoices(bagProduct.selectedChoices);
      return (productPrice + totalChoices) * bagProduct.quantity;
    };

    const calcTotalProductChoices = (bagChoiceList: BagChoice[]) => {
      return bagChoiceList.reduce((totalProduct, bagChoice) => {
        const totalChoice = calcTotalChoice(bagChoice);
        return totalProduct + totalChoice;
      }, 0);
    };

    const calcTotalChoice = (bagChoice: BagChoice) => {
      return bagChoice.selectedGarnishItems.reduce(
        (totalChoice, bagGarnishItem) => {
          return totalChoice + calcTotalGarnishItem(bagGarnishItem);
        },
        0,
      );
    };

    const calcTotalGarnishItem = (bagGarnishItem: BagGarnishItem) => {
      const unitPrice = bagGarnishItem.garnishItemDetails.unitPrice || 0;
      return bagGarnishItem.quantity * unitPrice;
    };

    const totalPrice = computed<number>(() => {
      if (!bag.value) {
        return 0;
      }
      return bag.value.items.reduce((totalBag, bagProduct) => {
        const totalProduct = calcTotalProduct(bagProduct);
        return totalBag + totalProduct;
      }, 0);
    });

    const incrementProduct = (bagProduct: BagProduct) => {
      const item = bag.value?.items.find((item) => item.id === bagProduct.id);

      if (item) {
        item.quantity++;
      }
    };

    const decrementProduct = (bagProduct: BagProduct) => {
      const item = bag.value?.items.find((item) => item.id === bagProduct.id);

      if (item && item.quantity > 1) {
        item.quantity--;
      }
    };

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
      accountId,

      /* getters */
      isEmpty,
      items,
      totalPrice,
      totalItems,

      /* actions */
      addItem,
      deleteItem,
      calcTotalProduct,
      incrementProduct,
      decrementProduct,
    };
  },
  {
    persist: {
      paths: ['bag', 'accountId'],
      debug: true,
    },
  },
);
