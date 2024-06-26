<script setup lang="ts">
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import { markRaw, onMounted, ref, watch } from 'vue';
  import RightDrawer from '@/components/RightDrawer.vue';
  import { useRouter } from 'vue-router';
  import { useDrawerNavigation } from '@/composables/useDrawerNavigation';

  const drawersControlStore = useDrawersControlStore();

  const router = useRouter();
  const drawerNavigation = useDrawerNavigation();

  watch(
    () => drawersControlStore.blockBodyScroll,
    (blockBodyScroll) => {
      if (blockBodyScroll) {
        return (document.body.style.overflow = 'hidden');
      }
      return (document.body.style.overflow = 'auto');
    },
  );

  type RouteLeftBehind = {
    position: number;
    fullPath: string;
    drawerId: string | null;
  };

  type NavigationAction = 'PUSH' | 'BACKWARD' | 'FORWARD';

  const routeLeftBehindList = ref<RouteLeftBehind[]>([]);

  const currentPosition = ref(0);
  const lastPosition = ref(0);

  const defineCurrentPosition = () => {
    currentPosition.value =
      ((router.options.history.state.position as number) || 0) + 1;
  };

  const defineLastPosition = () => {
    lastPosition.value = currentPosition.value;
  };

  onMounted(() => {
    defineCurrentPosition();
    defineLastPosition();
  });

  router.afterEach((to, from, failure) => {
    if (failure) {
      console.log('router.afterEach::failure', failure);
      return;
    }

    defineCurrentPosition();

    const navigationAction = ref<NavigationAction | null>(null);

    let fromDrawerId = ref<string | null>(null);
    let toDrawerId = ref<string | null>(null);

    if (from.hash) {
      fromDrawerId.value = from.hash.split('#')?.[1] || null;
    }

    if (to.hash) {
      toDrawerId.value = to.hash.split('#')?.[1] || null;
    }

    if (currentPosition.value < lastPosition.value) {
      navigationAction.value = 'BACKWARD';
      routeLeftBehindList.value.push(
        markRaw({
          position: currentPosition.value + 1,
          fullPath: from.fullPath,
          drawerId: fromDrawerId.value,
        }),
      );
    } else {
      const routeLeftBehind = routeLeftBehindList.value.find(
        ({ position }) => position === currentPosition.value,
      );

      if (routeLeftBehind && routeLeftBehind.fullPath === to.fullPath) {
        navigationAction.value = 'FORWARD';
        routeLeftBehindList.value = routeLeftBehindList.value.filter(
          (r) => r.position !== currentPosition.value,
        );
      } else {
        navigationAction.value = 'PUSH';
        const poppedRouteWithDrawerList = routeLeftBehindList.value.filter(
          (route) => route.drawerId && route.drawerId !== fromDrawerId.value,
        );
        poppedRouteWithDrawerList.forEach(({ drawerId }) => {
          if (drawerId) {
            drawersControlStore.remove(drawerId);
          }
        });
        routeLeftBehindList.value = [];
      }
    }

    if (fromDrawerId.value) {
      const navigatingToDrawer =
        ['PUSH', 'FORWARD'].includes(navigationAction.value) &&
        toDrawerId.value;
      const backwardNavigation = ['BACKWARD'].includes(navigationAction.value);

      if (
        fromDrawerId.value !== toDrawerId.value &&
        (backwardNavigation || !navigatingToDrawer)
      ) {
        drawersControlStore.hide(fromDrawerId.value);
      }
    }

    if (fromDrawerId.value !== toDrawerId.value && toDrawerId.value) {
      if (['PUSH', 'FORWARD'].includes(navigationAction.value)) {
        drawersControlStore.show(toDrawerId.value, currentPosition.value);
      }
    }
    defineLastPosition();
  });

  const hide = (drawerId: string) => {
    drawerNavigation.closeDrawer(drawerId);
  };
</script>
<template>
  <RightDrawer
    v-for="(drawer, index) in drawersControlStore.drawers"
    :key="drawer.id"
    :show="drawer.state === 'OPENED'"
    :before-backdrop-close="drawer.beforeBackdropClose"
    @hide="() => hide(drawer.id)"
    :index="index"
  >
    <Transition name="fade">
      <component
        v-if="drawer.state === 'OPENED' || !drawer.destroyWhenClosed"
        :is="drawer.component"
        v-bind="drawer.componentProps"
        @hide="() => hide(drawer.id)"
      ></component>
    </Transition>
  </RightDrawer>
</template>

<style scoped></style>
