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
  import ScreenLoader from '@/components/Screen/ScreenLoader.vue';
  import ScreenError from '@/components/Screen/ScreenError.vue';

  const notificationStore = useNotificationStore();

  const load = async () => {
    await notificationStore.fetch();
    await notificationStore.dispatch();
  };
  onMounted(load);
</script>
<template>
  <ScreenRoot>
    <ScreenHeader>
      Notificações
      <template #left>
        <BackButton />
      </template>
    </ScreenHeader>
    <ScreenLoader v-if="notificationStore.loading" />
    <ScreenError v-else-if="notificationStore.error" />
    <ScreenMain v-else :with-padding="false" @reload="load">
      <ScreenContent class="!col-span-full">
        <template v-if="notificationStore.isEmpty">
          <NotificationEmpty />
        </template>
        <template v-else>
          <ListItem
            v-for="notification in notificationStore.notifications"
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