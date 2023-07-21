<script setup lang="ts">
  import { markRaw, onMounted } from 'vue';
  import MobileTopBar from '@/components/Screen/ScreenHeader.vue';
  import ChevronLeftIcon from 'vue-material-design-icons/ChevronLeft.vue';
  import CloseIcon from 'vue-material-design-icons/Close.vue';
  import { useRouter } from 'vue-router';
  import AddressSelection from '@/components/Address/AddressListScreen.vue';
  import { useDrawersControlStore } from '@/stores/drawers-control';

  onMounted(() => {});

  const router = useRouter();

  const drawersControlStore = useDrawersControlStore();

  const openAddress = () => {
    const drawer = drawersControlStore.add(markRaw(AddressSelection), {});
    router.push({ hash: `#${drawer.id}` });
  };

  const hide = () => {
    router.back();
  };
</script>

<template>
  <div class="bag-drawer w-full md:max-w-lg h-screen">
    <div class="h-screen flex flex-col bg-white">
      <MobileTopBar class="z-10" title="Sacola">
        <template #left>
          <div class="p-2 flex items-center">
            <div class="md:hidden">
              <button
                @click="hide"
                class="w-10 h-10 flex justify-center items-center rounded-xl hover:bg-gray-100 transition-colors duration-300"
              >
                <ChevronLeftIcon />
              </button>
            </div>
            <div class="hidden md:block">
              <button
                @click="hide"
                class="w-10 h-10 flex justify-center items-center rounded-xl hover:bg-gray-100 transition-colors duration-300"
              >
                <CloseIcon />
              </button>
            </div>
          </div>
        </template>
      </MobileTopBar>
      <div class="flex-1"></div>
      <div
        class="w-full bg-white sticky bottom-0 px-4 py-3 flex border-t gap-4"
      >
        <button
          @click="openAddress"
          class="flex-1 px-4 py-3 flex justify-between items-center rounded-lg bg-primary-600 text-white font-bold"
        >
          <span>Continuar</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
