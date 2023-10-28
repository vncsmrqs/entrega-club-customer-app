import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { Choice, GarnishItem, Product } from '@/stores/merchant/product';
import _ from 'lodash';
import type { Merchant } from '@/stores/merchant/merchant';
import { getMerchantById } from '@/gateways';
import { useAuthStore } from '@/stores/auth';

export type BagProduct = {
  id: string;
  productDetails: Product;
  selectedChoices: BagChoice[];
  quantity: number;
  comment: string;
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
  merchantId: string;
  accountId: string | null;
  items: BagProduct[];
};

type DeliveryType = 'DELIVERY' | 'TAKEOUT';
type PaymentType = 'ONLINE' | 'ON_DELIVERY';

export const useBagStore = defineStore(
  'bag',
  () => {
    /* state */
    const merchantState = ref<{
      data: Merchant | null;
      loading: boolean;
      error: string | null;
    }>({
      data: null,
      loading: false,
      error: null,
    });

    const authStore = useAuthStore();

    const bag = ref<Bag | null>(null);

    const deliveryType = ref<DeliveryType>('DELIVERY');
    const paymentType = ref<PaymentType>('ONLINE');

    /* getters */
    const isEmpty = computed(() => {
      return !bag.value?.items.length;
    });

    const currentMerchant = computed<Merchant | null>(() => {
      return merchantState.value.data;
    });

    const errorOnLoadCurrentMerchant = computed<string | null>(() => {
      return merchantState.value.error;
    });

    const loadingCurrentMerchant = computed<boolean>(() => {
      return merchantState.value.loading;
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

    const subtotalPrice = computed<number>(() => {
      if (!bag.value) {
        return 0;
      }
      return bag.value.items.reduce((totalBag, bagProduct) => {
        const totalProduct = calcTotalProduct(bagProduct);
        return totalBag + totalProduct;
      }, 0);
    });

    const totalPrice = computed<number>(() => {
      return subtotalPrice.value + deliveryFee.value + serviceFee.value;
    });

    const deliveryFee = computed(() => {
      if (deliveryType.value === 'TAKEOUT') {
        return 0;
      }

      return merchantState.value.data?.deliveryFee || 0;
    });

    const serviceFee = computed(() => 1);

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

    const initBag = (merchantId: string, accountId: string | null) => {
      bag.value = {
        accountId,
        merchantId,
        items: [],
      };
    };

    const addItem = async (bagItem: BagProduct, merchantId: string) => {
      if (!bag.value || bag.value.merchantId !== merchantId) {
        initBag(merchantId, authStore.account?.id || null);
      }

      if (bag.value) {
        const itemIndex = bag.value.items.findIndex(
          (item) => item.id === bagItem.id,
        );

        if (itemIndex >= 0) {
          bag.value.items.splice(itemIndex, 1, bagItem);
          return;
        }

        bag.value.items.push(_.cloneDeep(bagItem));

        return;
      }
    };

    const deleteItem = (bagItem: BagProduct) => {
      if (bag.value) {
        bag.value.items = bag.value?.items.filter(
          (item) => item.id !== bagItem.id,
        );
      }
    };

    const loadBag = async () => {
      if (bag.value) {
        if (
          bag.value.accountId === null ||
          authStore.account?.id === bag.value.accountId
        ) {
          await loadMerchant();
          return;
        }
        bag.value = null;
      }
    };

    const loadMerchant = async (): Promise<void> => {
      if (bag.value) {
        merchantState.value.loading = true;
        try {
          merchantState.value.error = null;
          merchantState.value.data = await getMerchantById({
            merchantId: bag.value.merchantId,
          });
        } catch (error: any) {
          merchantState.value.data = null;
          merchantState.value.error = `Erro ao buscar dados do estabelecimento. ${error.toString()}`;
        } finally {
          merchantState.value.loading = false;
        }
      }
    };

    const purchase = async (): Promise<void> => {
      return;
    };

    const selectDeliveryType = (_deliveryType: DeliveryType): void => {
      deliveryType.value = _deliveryType;
    };

    const selectPaymentType = (_paymentType: PaymentType): void => {
      paymentType.value = _paymentType;
    };

    return {
      /* state */
      bag,
      deliveryType,
      paymentType,

      /* getters */
      isEmpty,
      items,
      currentMerchant,
      loadingCurrentMerchant,
      errorOnLoadCurrentMerchant,
      subtotalPrice,
      totalPrice,
      totalItems,
      deliveryFee,
      serviceFee,

      /* actions */
      loadBag,
      addItem,
      deleteItem,
      calcTotalProduct,
      incrementProduct,
      decrementProduct,
      selectDeliveryType,
      selectPaymentType,
      purchase,
    };
  },
  {
    persist: {
      storage: localStorage,
      paths: ['bag', 'accountId'],
      debug: true,
    },
  },
);
