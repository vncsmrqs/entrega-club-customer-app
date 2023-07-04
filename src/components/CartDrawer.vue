<script setup lang="ts">
  import MobileFullDrawer from '@/components/MobileFullDrawer.vue';
  import { onMounted, ref, watch } from 'vue';
  import MobileTopBar from '@/components/MobileTopBar.vue';
  import MainViewLayout from '@/components/MainViewLayout.vue';
  import ChevronLeftIcon from 'vue-material-design-icons/ChevronLeft.vue';

  const props = defineProps<{
    show?: boolean;
  }>();

  watch(
    () => props.show,
    (show, old) => {
      if (show === old) return;
      show ? drawer.value?.show() : drawer.value?.hide();
    },
  );

  const emit = defineEmits(['close']);

  const drawer = ref<InstanceType<typeof MobileFullDrawer> | null>(null);

  onMounted(() => {});
</script>

<template>
  <MobileFullDrawer ref="drawer" @on-hide="emit('close')">
    <MainViewLayout class="cart-drawer">
      <MobileTopBar class="z-10" title="Sacola">
        <template #left>
          <button @click="emit('close')" class="text-red-500 p-5 rounded-full">
            <ChevronLeftIcon />
          </button>
        </template>
      </MobileTopBar>
    </MainViewLayout>
    <div class="w-full bg-white fixed bottom-0 px-4 py-3 flex border-t gap-4">
      <button
        class="flex-1 px-4 py-3 flex justify-between items-center rounded-lg bg-red-500 text-white font-bold"
      >
        <span>Continuar</span>
      </button>
    </div>
  </MobileFullDrawer>
</template>

<style scoped></style>
