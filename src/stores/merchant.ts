import { reactive } from 'vue';
import { defineStore } from 'pinia';

const merchantFixture = {
  id: 'd9969801-5203-4f6a-ba4b-6bc8af8d8fac',
  slug: 'jaiba-mg/o-rei-da-pizza',
  available: true,
  preparationTime: 10,
  name: 'O rei da pizza',
  logo: '/icon-192x192.png',
  minimumOrderValue: 'R$ 40,00',
  userRating: 4.7,
  categories: ['Pizza'],
  distance: 3,
  type: 'RESTAURANT',
  priceRange: 1,
  deliveryFee: 10,
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
};

export const useMerchantStore = defineStore('merchant', () => {
  /* state */
  const merchant = reactive(merchantFixture);

  /* getters */

  /* actions */

  return {
    /* state */
    merchant,

    /* getters */

    /* actions */
  };
});
