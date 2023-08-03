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
      class="w-full min-h-full md:max-w-screen-xl mx-auto grid container grid-cols-1 lg:grid-cols-8"
      v-bind="$attrs"
    >
      <slot name="side">
        <div class="bg-danger-500"></div>
      </slot>
      <slot>ScreenMain</slot>
    </div>
  </div>
</template>

<style scoped>
  .container {
    grid-template-rows: min-content auto;
  }
</style>
