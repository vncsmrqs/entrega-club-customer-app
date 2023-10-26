<script lang="ts" setup>
  import LoaderComponent from '@/components/LoaderComponent.vue';

  const props = defineProps<{ show: boolean }>();
</script>

<template>
  <Transition name="slide-up">
    <div
      v-if="props.show"
      class="w-full gap-4 flex z-40 bg-primary-100 fixed top-0 left-0 font-semibold text-primary-600 px-5 py-4"
    >
      <LoaderComponent />
      <div class="flex-1 flex items-center">
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>
