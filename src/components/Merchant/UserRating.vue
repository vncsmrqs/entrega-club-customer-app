<script setup lang="ts">
  import StarIcon from 'vue-material-design-icons/Star.vue';

  const props = defineProps<{
    rating: number;
  }>();
</script>

<template>
  <div
    class="inline-flex bg-yellow-50 text-xs px-2 py-0.5 font-medium rounded-lg text-yellow-500 items-center"
  >
    <StarIcon :size="14"></StarIcon>
    <span>{{ props.rating }}</span>
  </div>
</template>

<style scoped></style>
