import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export type Notification = {
  id: string;
  title: string;
  message: string;
};

export const useNotificationStore = defineStore('notification', () => {
  /* state */
  const items = ref<Notification[]>([
    // {
    //   id: generateId(),
    //   title: 'Bem vindo ao Entrega Club!',
    //   message: 'Peça a sua comida e receba rápido onde estiver.',
    // },
  ]);

  /* getters */

  const isEmpty = computed(() => {
    return !items.value.length;
  });

  const total = computed<number>(() => {
    return items.value.length;
  });

  /* actions */

  return {
    /* state */
    items,

    /* getters */
    isEmpty,
    totalPrice: total,

    /* actions */
  };
});
