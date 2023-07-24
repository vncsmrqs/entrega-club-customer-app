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
  <Teleport to="body">
    <div class="drawer">
      <Transition name="fade">
        <div v-show="props.show" class="drawer-backdrop" @click="hide"></div>
      </Transition>
      <div
        class="drawer-container"
        :class="{ 'translate-x-full': !props.show }"
      >
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
  .drawer {
    @apply z-40 fixed top-0 left-0 w-screen h-screen pointer-events-none;
    z-index: calc(1000 + v-bind('props.index'));
  }

  .drawer-backdrop {
    @apply w-full h-full pointer-events-auto;
    backdrop-filter: blur(2px);
    background: rgba(0, 0, 0, 0.1);
  }

  .drawer-container {
    @apply drop-shadow-lg fixed top-0 right-0 w-full h-full bg-white duration-300 pointer-events-auto transform-gpu;
    z-index: calc(1000 + v-bind('props.index') + 1);
  }

  @media (min-width: 768px) {
    .drawer-container {
      max-width: calc(32rem - v-bind('props.index') * 0.5rem);
    }
  }
</style>
