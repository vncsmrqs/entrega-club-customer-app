<script setup lang="ts">
  import ReloadIcon from 'vue-material-design-icons/Reload.vue';
  import { computed, onMounted, ref } from 'vue';

  const emit = defineEmits(['reload']);

  defineOptions({
    inheritAttrs: false,
  });
  const props = withDefaults(
    defineProps<{
      withPadding?: boolean;
    }>(),
    {
      withPadding: true,
    },
  );

  let pullToRefresh: HTMLElement | null = null;

  onMounted(() => {
    pullToRefresh = document.querySelector('.pull-to-refresh');
  });

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
    if (startTop.value === 0) {
      touchY.value = e.touches[0].clientY;
      scrollTop.value = scrollableElement.value?.scrollTop || 0;
      touchDiff.value = touchY.value - touchstartY.value;
    }
  };

  const touchend = (e: any) => {
    if (touchDiff.value > 200 && scrollTop.value === 0) {
      pullToRefresh?.classList.add('visible');
      e.preventDefault();
      emit('reload');
    }
    startTop.value = 0;
    touchstartY.value = 0;
    touchY.value = 0;
    touchDiff.value = 0;
  };

  const updateIconYPosition = computed(() => {
    if (touchDiff.value > 0 && scrollTop.value === 0) {
      return touchDiff.value > 200 ? 200 : touchDiff.value;
    }
    return 0;
  });
</script>

<template>
  <div
    ref="scrollableElement"
    class="w-full h-full overflow-auto relative scroll-smooth"
    :class="{ 'p-5': props.withPadding }"
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend"
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
          }px - 100%)) rotate(${updateIconYPosition * 2}deg)`,
        }"
      >
        <ReloadIcon :style="{ opacity: updateIconYPosition / 2 / 100 }" />
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
