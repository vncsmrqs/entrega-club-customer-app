<script setup lang="ts">
  defineOptions({
    inheritAttrs: false,
  });
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
    class="w-full h-full overflow-auto relative scroll-smooth"
    :class="{ 'p-5': props.withPadding }"
  >
    <div
      class="w-full min-h-full md:max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-8 md:gap-5"
      v-bind="$attrs"
    >
      <slot>ScreenMain</slot>
    </div>
  </div>
</template>

<style scoped></style>
