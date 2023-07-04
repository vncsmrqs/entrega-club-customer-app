<script setup lang="ts">
  import type { DrawerOptions, DrawerInterface } from 'flowbite';
  import { v4 as generateId } from 'uuid';

  import { onMounted, onUnmounted } from 'vue';
  import { Drawer } from 'flowbite';

  let drawer: DrawerInterface | null;

  const show = () => {
    drawer?.show();
  };

  const hide = () => {
    drawer?.hide();
  };

  const drawerId = generateId();

  onMounted(() => {
    const $targetEl = document.getElementById(drawerId);

    const options: DrawerOptions = {
      placement: 'right',
      backdrop: false,
      bodyScrolling: true,
      // edge: false,
      // edgeOffset: '',
      // backdropClasses: '',
      onHide,
      onShow,
      onToggle,
    };

    drawer = new Drawer($targetEl, options);
  });

  onUnmounted(() => {
    hide();
  });

  const emit = defineEmits(['onHide', 'onShow', 'onToggle']);

  const onHide = () => {
    emit('onHide');
  };

  const onShow = () => {
    emit('onShow');
  };

  const onToggle = () => {
    emit('onToggle');
  };

  defineExpose({
    show,
    hide,
  });
</script>

<template>
  <div
    :id="drawerId"
    class="bg-red-100 fixed z-40 w-screen h-screen overflow-y-auto transition-transform translate-x-full"
    tabindex="-1"
    aria-labelledby="drawer-right-label"
  >
    <slot></slot>
  </div>
</template>

<style scoped></style>
