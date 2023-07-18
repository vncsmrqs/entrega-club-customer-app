<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      show: boolean;
      beforeHide?: Function;
      index: number;
    }>(),
    {
      beforeHide: () => true,
    },
  );
  const emit = defineEmits(['hide']);

  const hide = () => {
    props?.beforeHide() ? emit('hide') : false;
    return;
  };
</script>

<template>
  <div class="drawer">
    <Transition name="fade">
      <div v-show="props.show" class="w-full h-full" @click="hide">
        <div class="drawer-backdrop"></div>
      </div>
    </Transition>
    <div class="drawer-container" :class="{ 'translate-x-full': !props.show }">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
  .drawer {
    @apply z-40 fixed top-0 left-0 w-screen h-screen pointer-events-none;
    z-index: calc(1000 + v-bind('props.index'));
  }

  .drawer-backdrop {
    @apply bg-black opacity-25 w-full h-full pointer-events-auto;
  }

  .drawer-container {
    @apply fixed top-0 right-0 w-full h-full bg-white duration-300 pointer-events-auto ease-out transform-gpu;
    z-index: calc(1000 + v-bind('props.index') + 1);
  }

  @media (min-width: 768px) {
    .drawer-container {
      max-width: calc(32rem - v-bind('props.index') * 0.5rem);
    }
  }
</style>
