<script setup lang="ts">
  import { initDropdowns } from 'flowbite';
  import { onMounted } from 'vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import AppLogo from '@/components/AppLogo.vue';
  import AddressSelectionBar from '@/components/Main/AddressSelectionBar.vue';
  import NotificationButton from '@/components/Notification/NotificationButton.vue';
  import LoginButton from '@/components/Login/LoginButton.vue';
  import TabButton from '@/components/Search/TabButton.vue';

  onMounted(async () => {
    initDropdowns();
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
          <LoginButton />
        </div>
      </template>
    </ScreenHeader>
    <ScreenMain :with-padding="false" class="md:p-5">
      <ScreenContent class="!col-span-full">
        <AddressSelectionBar class="md:hidden" />
        <div class="grid grid-flow-col lg:flex md:mb-5 overflow-x-auto">
          <RouterLink
            :to="{ name: 'home-default' }"
            v-slot="{ isActive, navigate }"
            custom
          >
            <TabButton @click="navigate" :active="isActive">Início</TabButton>
          </RouterLink>
          <RouterLink
            :to="{ name: 'restaurants' }"
            v-slot="{ isActive, navigate }"
            custom
          >
            <TabButton @click="navigate" :active="isActive">
              Restaurantes
            </TabButton>
          </RouterLink>
          <RouterLink
            :to="{ name: 'liquor-store' }"
            v-slot="{ isActive, navigate }"
            custom
          >
            <TabButton @click="navigate" :active="isActive">Bebidas</TabButton>
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
