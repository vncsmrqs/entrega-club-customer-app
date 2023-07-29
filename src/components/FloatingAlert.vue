<script lang="ts" setup>
  import AlertIcon from 'vue-material-design-icons/Alert.vue';

  const props = defineProps<{ show: boolean }>();
</script>

<template>
  <Transition name="slide-up">
    <div
      v-if="props.show"
      class="w-full gap-4 flex z-40 bg-danger-600 fixed top-0 left-0 font-semibold text-white px-5 py-4"
    >
      <AlertIcon :size="48" />
      <div>
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>
