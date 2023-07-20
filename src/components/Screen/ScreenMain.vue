<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      withPadding?: boolean;
    }>(),
    {
      withPadding: true,
    },
  );
</script>

<template>
  <div
    class="w-full h-full overflow-auto"
    :class="{ 'p-5': props.withPadding }"
  >
    <slot>ScreenMain</slot>
  </div>
</template>

<style scoped></style>
