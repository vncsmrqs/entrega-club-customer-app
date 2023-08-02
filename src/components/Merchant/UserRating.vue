<script setup lang="ts">
  import StarIcon from 'vue-material-design-icons/Star.vue';

  const props = defineProps<{
    rating: number;
  }>();
</script>

<template>
  <div
    class="inline-flex text-xs font-medium rounded-lg text-yellow-500 items-center"
  >
    <StarIcon :size="14"></StarIcon>
    <span>{{ props.rating }}</span>
  </div>
</template>

<style scoped></style>
