<script setup lang="ts">
  import { onMounted } from 'vue';
  import MobileTopBar from '@/components/MobileTopBar.vue';
  import ChevronLeftIcon from 'vue-material-design-icons/ChevronLeft.vue';
  import CloseIcon from 'vue-material-design-icons/Close.vue';
  import { useRouter } from 'vue-router';

  onMounted(() => {
    alert('mounted::CartDrawer');
  });

  const router = useRouter();

  const hide = () => {
    router.back();
  };
</script>

<template>
  <div class="cart-drawer w-full md:max-w-lg h-screen">
    <div class="h-screen flex flex-col bg-white">
      <MobileTopBar class="z-10" title="Sacola">
        <template #left>
          <button @click="hide" class="text-red-500 p-5 rounded-full">
            <CloseIcon class="md:block" />
            <ChevronLeftIcon class="md:hidden" />
          </button>
        </template>
      </MobileTopBar>
      <div class="flex-1"></div>
      <div
        class="w-full bg-white sticky bottom-0 px-4 py-3 flex border-t gap-4"
      >
        <button
          class="flex-1 px-4 py-3 flex justify-between items-center rounded-lg bg-red-500 text-white font-bold"
        >
          <span>Continuar</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
