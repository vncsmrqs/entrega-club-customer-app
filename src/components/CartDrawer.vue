<script setup lang="ts">
  import MobileFullDrawer from '@/components/MobileFullDrawer.vue';
  import { onMounted, ref } from 'vue';
  import MobileTopBar from '@/components/MobileTopBar.vue';
  import MainViewLayout from '@/components/MainViewLayout.vue';
  import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue';

  const drawer = ref<InstanceType<typeof MobileFullDrawer> | null>(null);

  onMounted(() => {});

  const show = () => {
    if (drawer.value?.isHidden()) {
      drawer.value?.show();
    }
  };

  const hide = () => {
    if (drawer.value?.isVisible()) {
      drawer.value?.hide();
    }
  };

  defineExpose({
    show,
    hide,
  });
</script>

<template>
  <MobileFullDrawer
    ref="drawer"
    class="cart-drawer w-screen h-screen"
    position="bottom"
  >
    <MainViewLayout>
      <MobileTopBar class="z-10" title="Sacola">
        <template #left>
          <button @click="hide" class="text-red-500 p-5 rounded-full">
            <ChevronDownIcon />
          </button>
        </template>
      </MobileTopBar>
      <div class="w-full bg-white fixed bottom-0 px-4 py-3 flex border-t gap-4">
        <button
          class="flex-1 px-4 py-3 flex justify-between items-center rounded-lg bg-red-500 text-white font-bold"
        >
          <span>Continuar</span>
        </button>
      </div>
    </MainViewLayout>
  </MobileFullDrawer>
</template>

<style scoped></style>
