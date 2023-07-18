<script setup lang="ts">
  import { initDropdowns } from 'flowbite';
  import { markRaw, onMounted } from 'vue';
  import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue';
  import BellOutlineIcon from 'vue-material-design-icons/BellOutline.vue';
  import MopedOutlineIcon from 'vue-material-design-icons/MopedOutline.vue';
  import MainViewLayout from '@/components/MainViewLayout.vue';
  import IconRounded from '@/components/IconRounded.vue';
  import { useCustomerAddressStore } from '@/stores/address';
  import AddressSelection from '@/components/AddressSelection.vue';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import { useRouter } from 'vue-router';

  const drawersControlStore = useDrawersControlStore();
  const customerAddressStore = useCustomerAddressStore();

  const router = useRouter();

  const showAddressDrawer = () => {
    const drawer = drawersControlStore.add(markRaw(AddressSelection), {});
    router.push({ hash: `#${drawer.id}` });
  };

  onMounted(async () => {
    initDropdowns();
    // await customerAddressStore.loadCurrentAddress();
  });
</script>
<template>
  <MainViewLayout>
    <main class="w-full relative">
      <div class="border-b sticky top-0">
        <div
          class="flex border-b gap-4 bg-white dark:border-gray-950 items-center dark:bg-gray-800 dark:text-white"
        >
          <div class="ml-5 flex items-center text-red-500">
            <MopedOutlineIcon :size="36"></MopedOutlineIcon>
            <h1 class="ml-1 text-lg font-bold">
              <span>Entrega</span>
              <span>Club</span>
            </h1>
          </div>
          <div class="flex-1"></div>
          <RouterLink :to="{ name: 'notifications' }">
            <IconRounded ghost>
              <BellOutlineIcon />
            </IconRounded>
          </RouterLink>
        </div>
        <div
          v-if="customerAddressStore.selectedAddress"
          @click="showAddressDrawer"
          class="bg-white py-2 text-center flex justify-center items-center text-gray-500 text-sm font-bold"
        >
          <span>{{ customerAddressStore.selectedAddress?.streetName }}</span>
          <ChevronDownIcon class="text-red-500"></ChevronDownIcon>
        </div>
      </div>
      <div class="flex p-4 gap-2 text-sm">
        <RouterLink :to="{ name: 'home-default' }" v-slot="{ isActive }">
          <span
            class="text-red-500 font-medium rounded-lg px-4 py-2 text-center"
            :class="{ 'bg-red-100': isActive }"
            >Início</span
          >
        </RouterLink>
        <RouterLink :to="{ name: 'restaurants' }" v-slot="{ isActive }">
          <span
            class="text-red-500 font-medium rounded-lg px-4 py-2 text-center"
            :class="{ 'bg-red-100': isActive }"
            >Restaurantes</span
          >
        </RouterLink>
        <RouterLink :to="{ name: 'liquor-store' }" v-slot="{ isActive }">
          <span
            class="text-red-500 font-medium rounded-lg px-4 py-2 text-center"
            :class="{ 'bg-red-100': isActive }"
            >Bebidas</span
          >
        </RouterLink>
      </div>
      <RouterView></RouterView>
    </main>
  </MainViewLayout>
</template>

<style>
  @media (min-width: 1024px) {
  }
</style>
