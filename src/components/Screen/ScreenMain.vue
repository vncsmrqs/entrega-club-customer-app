<script setup lang="ts">
  import ReloadIcon from 'vue-material-design-icons/Reload.vue';
  import { computed, ref, watch } from 'vue';

  const emit = defineEmits(['reload']);

  defineOptions({
    inheritAttrs: false,
  });
  const props = withDefaults(
    defineProps<{
      withPadding?: boolean;
      withReload?: boolean;
      loading?: boolean;
    }>(),
    {
      withPadding: true,
      withReload: false,
      loading: false,
    },
  );

  const PULL_TO_SCROLL_LIMIT = 135;

  const scrollableElement = ref<HTMLElement | null>(null);

  const touchstartY = ref(0);
  const touchY = ref(0);
  const touchDiff = ref(0);
  const scrollTop = ref(0);
  const startTop = ref(0);

  const touchstart = (e: any) => {
    if (props.loading) return;
    startTop.value = scrollableElement.value?.scrollTop || 0;
    touchstartY.value = e.touches[0].clientY;
  };

  const touchmove = (e: any) => {
    if (props.loading) return;
    if (props.withReload && startTop.value === 0) {
      touchY.value = e.touches[0].clientY;
      scrollTop.value = scrollableElement.value?.scrollTop || 0;
      touchDiff.value = touchY.value - touchstartY.value;
    }
  };

  const touchend = (e: any) => {
    if (props.loading) return;
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

  watch(
    () => props.loading,
    (value) => {
      if (value) {
        touchDiff.value = PULL_TO_SCROLL_LIMIT;
        return;
      }
      startTop.value = 0;
      touchstartY.value = 0;
      touchY.value = 0;
      touchDiff.value = 0;
    },
  );

  const updateIconYPosition = computed(() => {
    const pulled = touchDiff.value * 0.5;
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
    if (props.loading) return {};
    if (props.withReload) {
      return handlers;
    }
    return {};
  });

  const rotation = computed(
    () => ((360 * updateIconYPosition.value) / PULL_TO_SCROLL_LIMIT) * 1.25,
  );
</script>

<template>
  <div
    ref="scrollableElement"
    class="w-full h-full overflow-auto relative scroll-smooth"
    :class="{ 'p-5': props.withPadding }"
    v-on="addHandlers"
  >
    <div
      class="w-10 h-10 bg-white drop-shadow rounded-full absolute top-0 left-1/2 z-40 flex items-center justify-center text-primary-600"
      :class="{ 'transition-all duration-300': !touchY }"
      :style="{
        'z-index': 999,
        transform: `translateX(-50%) translateY(calc(${updateIconYPosition}px - 100%)) rotate(${rotation}deg)`,
        opacity: updateIconYPosition,
      }"
    >
      <span
        class="relative duration-300"
        :class="{ 'animate-spin': props.loading }"
      >
        <ReloadIcon
          class="absolute top-1/2 left-1/2"
          :class="{ 'transition-all duration-300': !touchY }"
          :style="{
            transform: 'translateX(-45%) translateY(-50%)',
            opacity: updateIconYPosition / (PULL_TO_SCROLL_LIMIT / 100) / 100,
          }"
        />
      </span>
    </div>
    <div
      class="w-full min-h-full md:max-w-screen-2xl mx-auto grid container grid-cols-1 lg:grid-cols-8"
      v-bind="$attrs"
    >
      <slot name="side">
        <div></div>
      </slot>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
  .container {
    grid-template-rows: min-content auto;
  }
</style>
