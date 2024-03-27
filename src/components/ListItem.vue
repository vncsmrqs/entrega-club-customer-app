<script setup lang="ts">
  import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue';

  const props = defineProps<{
    disabled?: boolean;
  }>();
</script>

<template>
  <a
    class="w-full flex items-center gap-4 px-4 h-24 text-gray-500 cursor-pointer hover:bg-primary-50 hover:text-primary-600"
    :class="{
      'opacity-50 pointer-events-none': props.disabled,
    }"
  >
    <div class="p-3 bg-gray-100 rounded-2xl">
      <slot name="icon"></slot>
    </div>
    <div class="w-full text-lg flex flex-col text-left">
      <span class="text-gray-800"><slot name="default"></slot></span>
      <span class="text-xs"><slot name="subtitle"></slot></span>
    </div>
    <div>
      <ChevronRightIcon></ChevronRightIcon>
    </div>
  </a>
</template>

<style scoped></style>
