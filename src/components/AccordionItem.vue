<script setup lang="ts">
  import { nextTick, ref, watch } from 'vue';

  const slotElement = ref<HTMLElement | null>(null);

  const props = defineProps<{
    opened: boolean;
  }>();

  const lastHeight = ref(0);

  const updateLastHeight = () => {
    if (!slotElement.value) {
      return;
    }
    lastHeight.value = slotElement.value.scrollHeight;
  };

  const defineElementHeight = () => {
    if (!slotElement.value) {
      return;
    }
    slotElement.value.style.height = `${lastHeight.value}px`;
  };

  const updateOpened = () => {
    _opened.value = props.opened;
  };

  const resetElementHeight = () => {
    setTimeout(() => {
      if (!slotElement.value) {
        return;
      }
      slotElement.value.style.height = '';
    }, 300);
  };

  watch(
    () => props.opened,
    (opened) => {
      if (opened) {
        defineElementHeight();
        nextTick(() => {
          updateOpened();
          resetElementHeight();
        });
        return;
      }
      updateLastHeight();
      defineElementHeight();
      nextTick(() => {
        updateOpened();
        resetElementHeight();
      });
    },
  );

  const _opened = ref(props.opened);
</script>

<template>
  <Transition name="accordion">
    <div v-show="_opened" ref="slotElement">
      <slot></slot>
    </div>
  </Transition>
</template>

<style scoped></style>
