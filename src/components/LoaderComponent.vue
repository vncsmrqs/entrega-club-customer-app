<script setup lang="ts">
  const props = withDefaults(defineProps<{ color?: string }>(), {
    color: 'currentColor',
  });
</script>

<template>
  <svg
    id="L4"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 48 12"
    xml:space="preserve"
  >
    <circle
      v-for="i in 3"
      :key="i"
      :fill="props.color"
      stroke="none"
      :cx="6 + (i - 1) * 18"
      cy="6"
      r="6"
    >
      <animate
        attributeName="opacity"
        dur="1s"
        values="0;1;0"
        repeatCount="indefinite"
        :begin="i / 10"
      />
    </circle>
  </svg>
</template>

<style scoped>
  svg {
    width: 100px;
    height: 100px;
    display: inline-block;
  }
</style>
