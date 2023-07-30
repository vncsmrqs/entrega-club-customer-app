import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { generateId, timeout } from '@/utils';
import { useAuthStore } from '@/stores/auth';

export type Notification = {
  id: string;
  title: string;
  message: string;
  openedAt?: string;
};

const authStore = useAuthStore();

export const useNotificationStore = defineStore('notification', () => {
  /* state */
  const notifications = ref<Notification[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  /* getters */
  const isEmpty = computed(() => {
    return !notifications.value.length;
  });

  const total = computed<number>(() => {
    return notifications.value.length;
  });

  /* actions */

  const fetch = async (): Promise<void> => {
    loading.value = true;
    try {
      await timeout(500);
      if (!authStore.isLogged) {
        notifications.value = [];
        error.value = null;
        return;
      }
      //todo: Pegar notificacoes a partir do ID do usuário
      notifications.value = [];
      error.value = null;
    } catch (e: any) {
      error.value = e.toString();
      notifications.value = [];
    } finally {
      loading.value = false;
    }
  };

  const dispatch = async () => {
    Notification.requestPermission().then((permission) => {
      console.log('permission', permission);

      setTimeout(() => {
        if (permission === 'granted') {
          const notificationOptions: NotificationOptions = {
            body: 'O seu pedido saiu para entrega. Fique atento!',
            data: { hello: 'world' },
            image: '/logo/primary-white/logo-primary-white-512x512.png',
            icon: '/logo/primary-white/logo-primary-white-192x192.png',
            requireInteraction: true,
            renotify: true,
            badge: '/logo/transparent-white/logo-transparent-white-96x96.svg',
            tag: generateId(),
            actions: [
              {
                action: 'action-1',
                icon: '/logo/primary-white/logo-primary-white-192x192.png',
                title: 'FECHAR',
              },
              {
                action: 'action-2',
                title: 'ACOMPANHAR',
              },
            ],
            vibrate: [200, 100, 200, 100, 200, 100, 200],
          };

          navigator.serviceWorker.ready.then(
            async (serviceWorkerRegistration) => {
              await serviceWorkerRegistration.showNotification(
                'Pedido #2145 - Saiu para entrega!',
                notificationOptions,
              );
            },
          );
        }
      }, 1000);
    });
  };

  return {
    /* state */
    notifications,
    loading,
    error,

    /* getters */
    isEmpty,
    total,

    /* actions */
    fetch,
    dispatch,
  };
});
