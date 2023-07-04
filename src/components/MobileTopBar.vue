<script setup lang="ts">
  import ChevronLeftIcon from 'vue-material-design-icons/ChevronLeft.vue';
  import { useRouter } from 'vue-router';

  const props = defineProps<{
    title: string;
    hideBack?: boolean;
  }>();

  const router = useRouter();

  const goBack = () => router.back();
</script>

<template>
  <div class="mobile-top-bar">
    <div class="relative flex justify-between gap-4">
      <slot name="left">
        <button
          v-if="!props.hideBack"
          @click="goBack"
          class="text-red-500 p-5 rounded-full"
        >
          <ChevronLeftIcon />
        </button>
      </slot>
      <div class="h-16 flex flex-1 items-center">
        <h1 class="uppercase">
          {{ props.title }}
        </h1>
      </div>
      <div v-if="!!$slots.right" class="flex items-center">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .mobile-top-bar {
    @apply w-full sticky top-0 border-b bg-white;
  }
</style>
