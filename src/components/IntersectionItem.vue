<script setup lang="ts">
  import { onBeforeUnmount, onMounted, ref } from 'vue';

  const emit = defineEmits(['intersect']);

  const props = defineProps<{
    threshold: number | number[];
  }>();

  const root = ref<InstanceType<typeof HTMLElement> | null>(null);

  const io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        emit('intersect', entry);
      });
    },
    {
      // root: document.querySelector('.merchant-view'),
      rootMargin: '16px',
      threshold: props.threshold,
    },
  );

  onMounted(() => {
    if (root.value) {
      io.observe(root.value);
    }
  });

  onBeforeUnmount(() => {
    if (root.value) {
      io.unobserve(root.value);
    }
  });
</script>

<template>
  <div ref="root">
    <slot></slot>
  </div>
</template>

<style scoped></style>
