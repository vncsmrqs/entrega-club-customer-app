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
    class="w-full h-full overflow-auto relative"
    :class="{ 'p-5': props.withPadding }"
  >
    <div
      class="w-full min-h-full md:max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-3 gap-5"
    >
      <slot>ScreenMain</slot>
    </div>
  </div>
</template>

<style scoped></style>
