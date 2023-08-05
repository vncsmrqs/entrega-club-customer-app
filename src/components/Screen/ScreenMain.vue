<script setup lang="ts">
  import ReloadIcon from 'vue-material-design-icons/Reload.vue';
  import { computed, ref } from 'vue';

  const emit = defineEmits(['reload']);

  defineOptions({
    inheritAttrs: false,
  });
  const props = withDefaults(
    defineProps<{
      withPadding?: boolean;
      withReload?: boolean;
    }>(),
    {
      withPadding: true,
      withReload: false,
    },
  );

  const PULL_TO_SCROLL_LIMIT = 360;

  const scrollableElement = ref<HTMLElement | null>(null);

  const touchstartY = ref(0);
  const touchY = ref(0);
  const touchDiff = ref(0);
  const scrollTop = ref(0);
  const startTop = ref(0);

  const touchstart = (e: any) => {
    startTop.value = scrollableElement.value?.scrollTop || 0;
    touchstartY.value = e.touches[0].clientY;
  };

  const touchmove = (e: any) => {
    if (props.withReload && startTop.value === 0) {
      touchY.value = e.touches[0].clientY;
      scrollTop.value = scrollableElement.value?.scrollTop || 0;
      touchDiff.value = touchY.value - touchstartY.value;
    }
  };

  const touchend = (e: any) => {
    if (
      props.withReload &&
      touchDiff.value >= PULL_TO_SCROLL_LIMIT &&
      scrollTop.value === 0
    ) {
      e.preventDefault();
      emit('reload');
    }
    startTop.value = 0;
    touchstartY.value = 0;
    touchY.value = 0;
    touchDiff.value = 0;
  };

  const updateIconYPosition = computed(() => {
    const pulled = touchDiff.value * 0.8;
    if (props.withReload && pulled > 0 && scrollTop.value === 0) {
      return pulled >= PULL_TO_SCROLL_LIMIT ? PULL_TO_SCROLL_LIMIT : pulled;
    }
    return 0;
  });

  const handlers = {
    touchstart,
    touchmove,
    touchend,
  };

  const addHandlers = computed(() => {
    if (props.withReload) {
      return handlers;
    }
    return {};
  });
</script>

<template>
  <div
    ref="scrollableElement"
    class="w-full h-full overflow-auto relative scroll-smooth"
    :class="{ 'p-5': props.withPadding }"
    v-on="addHandlers"
  >
    <div class="fixed z-10 bg-red-500 top-0 left-0">
      <div>start: {{ touchstartY }}</div>
      <div>move: {{ touchY }}</div>
      <div>diff: {{ touchDiff }}</div>
      <div>top: {{ scrollTop }}</div>
      <div>icon-position {{ updateIconYPosition }}</div>
    </div>
    <Transition name="fade">
      <div
        v-show="updateIconYPosition"
        class="w-10 h-10 bg-white drop-shadow rounded-full absolute top-0 left-1/2 z-40 flex items-center justify-center text-primary-600"
        :style="{
          'z-index': 99999,
          transform: `translateX(-50%) translateY(calc(${
            updateIconYPosition / 2
          }px - 100%)) rotate(${updateIconYPosition * 1.25}deg)`,
        }"
      >
        <ReloadIcon
          class="ml-0.5"
          :style="{
            opacity: updateIconYPosition / (PULL_TO_SCROLL_LIMIT / 100) / 100,
          }"
        />
      </div>
    </Transition>
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
