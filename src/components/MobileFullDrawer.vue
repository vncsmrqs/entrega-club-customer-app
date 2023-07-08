<script setup lang="ts">
  import type { DrawerOptions, DrawerInterface } from 'flowbite';
  import { v4 as generateId } from 'uuid';

  import { onMounted, onUnmounted, reactive } from 'vue';
  import { Drawer } from 'flowbite';

  let drawer: DrawerInterface | null;

  const drawerId = generateId();

  onMounted(() => {
    const $targetEl = document.getElementById(drawerId);

    const options: DrawerOptions = reactive({
      placement: props.position,
      bodyScrolling: false,
      // edge: true,
      // edgeOffset: '',
      backdrop: true,
      // backdropClasses:
      //   'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30',
      onHide,
      onShow,
      onToggle,
    });

    drawer = new Drawer($targetEl, options);
  });

  const show = () => {
    if (drawer?.isHidden()) {
      drawer?.show();
    }
  };

  const hide = () => {
    if (drawer?.isVisible()) {
      drawer?.hide();
    }
  };

  const isVisible = () => {
    return drawer?.isVisible();
  };

  const isHidden = () => {
    return drawer?.isHidden();
  };

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

  const props = withDefaults(
    defineProps<{
      position?: 'left' | 'right' | 'bottom' | 'top';
    }>(),
    {
      position: 'left',
    },
  );

  defineExpose({
    show,
    hide,
    isVisible,
    isHidden,
  });
</script>

<template>
  <div
    :id="drawerId"
    class="fixed max-w-screen max-h-screen z-40 transition-transform"
    :class="{
      'overflow-y-auto': true,
      '-translate-x-full top-0 left-0': props.position === 'left',
      'translate-x-full top-0 right-0': props.position === 'right',
      'translate-y-full left-0 bottom-0': props.position === 'bottom',
      '-translate-y-full left-0 top-0': props.position === 'top',
    }"
    tabindex="-1"
  >
    <slot></slot>
  </div>
</template>

<style scoped></style>
