<script setup lang="ts">
  import CloseIcon from 'vue-material-design-icons/Close.vue';
  import ChevronLeftIcon from 'vue-material-design-icons/ChevronLeft.vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const props = withDefaults(defineProps<{ useEvents?: boolean }>(), {
    useEvents: false,
  });

  const click = (isMobile: boolean = false) => {
    if (props.useEvents) {
      emit('back', isMobile);
      return;
    }

    router.back();
  };

  const emit = defineEmits(['back']);
</script>

<template>
  <button
    @click="() => click()"
    class="hidden md:flex w-10 h-10 justify-center items-center rounded-xl hover:bg-gray-100 transition-colors duration-300"
  >
    <CloseIcon />
  </button>
  <button
    @click="() => click(true)"
    class="md:hidden w-10 h-10 flex justify-center items-center rounded-xl hover:bg-gray-100 transition-colors duration-300"
  >
    <ChevronLeftIcon />
  </button>
</template>

<style scoped></style>
