<script setup lang="ts">
  const props = defineProps<{
    show: boolean;
    progress: number;
  }>();
</script>

<template>
  <Teleport to="body">
    <div
      v-show="props.show"
      class="w-full h-1.5 bg-gray-100 fixed top-0"
      style="z-index: 9999"
    >
      <div
        class="h-full bg-primary-600 skeleton-box"
        style="transition: width 0.5s"
        :style="{ width: props.progress + '%' }"
      ></div>
    </div>
  </Teleport>
</template>

<style scoped></style>
