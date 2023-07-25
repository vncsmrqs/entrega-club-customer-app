<script setup lang="ts">
  import { onMounted } from 'vue';
  import BackButton from '@/components/BackButton.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import { useNotificationStore } from '@/stores/notification';
  import NotificationEmpty from '@/components/Notification/NotificationEmpty.vue';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';
  import ListItem from '@/components/ListItem.vue';
  import BellOutlineIcon from 'vue-material-design-icons/BellOutline.vue';
  import { generateId } from '@/utils';

  const notificationStore = useNotificationStore();

  onMounted(() => {
    Notification.requestPermission().then((permission) => {
      console.log('permission', permission);

      setTimeout(() => {
        if (permission === 'granted') {
          const notificationOptions: NotificationOptions = {
            body: 'O seu pedido saiu para entrega. Fique atento!',
            data: { hello: 'world' },
            image: '/icon-maskable-512x512.png',
            icon: '/icon-maskable-192x192.png',
            requireInteraction: true,
            renotify: true,
            badge: '/logo/transparent-white/logo-transparent-white-96x96.svg',
            tag: generateId(),
            actions: [
              {
                action: 'action-1',
                icon: '/icon-maskable-192x192.png',
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
  });
</script>
<template>
  <ScreenRoot>
    <ScreenHeader>
      Notificações
      <template #left>
        <BackButton />
      </template>
    </ScreenHeader>
    <ScreenMain :with-padding="false">
      <ScreenContent class="!col-span-full">
        <template v-if="notificationStore.isEmpty">
          <NotificationEmpty />
        </template>
        <template v-else>
          <ListItem
            v-for="notification in notificationStore.items"
            :key="notification.id"
          >
            <template #default>{{ notification.title }}</template>
            <template #icon>
              <BellOutlineIcon />
            </template>
            <template #subtitle>{{ notification.message }}</template>
          </ListItem>
        </template>
      </ScreenContent>
    </ScreenMain>
  </ScreenRoot>
</template>

<style scoped></style>
