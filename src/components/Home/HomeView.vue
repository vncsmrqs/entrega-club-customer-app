<script setup lang="ts">
  import { onMounted } from 'vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import AppLogo from '@/components/AppLogo.vue';
  import AddressSelectionBar from '@/components/Main/AddressSelectionBar.vue';
  import NotificationButton from '@/components/Notification/NotificationButton.vue';
  import TabButton from '@/components/Search/TabButton.vue';

  onMounted(async () => {
    // await customerAddressStore.loadCurrentAddress();
  });
</script>
<template>
  <ScreenRoot>
    <ScreenHeader class="md:hidden flex justify-between">
      <AppLogo />
      <template #right>
        <div class="flex gap-2">
          <NotificationButton />
        </div>
      </template>
    </ScreenHeader>
    <ScreenMain :with-padding="false">
      <ScreenContent class="!col-span-full">
        <AddressSelectionBar class="md:hidden" />
        <div class="grid grid-flow-col overflow-x-auto">
          <RouterLink
            :to="{ name: 'home.index' }"
            v-slot="{ isExactActive, navigate }"
            custom
          >
            <TabButton @click="navigate" :active="isExactActive">
              Início
            </TabButton>
          </RouterLink>
          <RouterLink
            :to="{ name: 'home.restaurants' }"
            v-slot="{ isExactActive, navigate }"
            custom
          >
            <TabButton @click="navigate" :active="isExactActive">
              Restaurantes
            </TabButton>
          </RouterLink>
          <RouterLink
            :to="{ name: 'home.liquor-store' }"
            v-slot="{ isExactActive, navigate }"
            custom
          >
            <TabButton @click="navigate" :active="isExactActive">
              Bebidas
            </TabButton>
          </RouterLink>
        </div>
        <RouterView v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </ScreenContent>
    </ScreenMain>
  </ScreenRoot>
</template>

<style>
  @media (min-width: 1024px) {
  }
</style>
