<script setup lang="ts">
  import BellOutlineIcon from 'vue-material-design-icons/BellOutline.vue';
  import NotificationScreen from '@/components/Notification/NotificationScreen.vue';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import { markRaw } from 'vue';
  import { useRouter } from 'vue-router';
  import { useNotificationStore } from '@/stores/notification';
  import IconButton from '@/components/IconButton.vue';

  const router = useRouter();

  const drawersControlStore = useDrawersControlStore();

  const notificationStore = useNotificationStore();

  const showNotification = () => {
    const drawer = drawersControlStore.add(markRaw(NotificationScreen), {});
    router.push({ hash: `#${drawer.id}` });
  };
</script>

<template>
  <IconButton @click="showNotification" class="text-primary-600">
    <span class="relative">
      <span
        v-show="!notificationStore.isEmpty"
        class="absolute -top-2 -right-2 rounded-lg bg-primary-600 text-primary-600 text-xs px-1 text-white"
      >
        {{ notificationStore.totalPrice }}
      </span>
      <BellOutlineIcon />
    </span>
  </IconButton>
</template>

<style scoped></style>
