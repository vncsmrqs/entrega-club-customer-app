import { computed, reactive } from 'vue';
import type { Component } from 'vue';
import { defineStore } from 'pinia';
import { generateId } from '@/utils';

export type Drawer<ComponentType = any, ComponentProps = any> = {
  id: string;
  state: 'CLOSED' | 'OPENED';
  destroyWhenClosed: boolean;
  component: ComponentType;
  componentProps: ComponentProps;
  beforeBackdropClose?: Function;
  routePosition?: number;
};

export const useDrawersControlStore = defineStore('drawers-control', () => {
  /* state */
  const drawersControl = reactive<{
    drawers: Drawer[];
  }>({
    drawers: [],
  });

  /* getters */
  const drawers = computed(() => drawersControl.drawers);

  /* actions */
  const add = <ComponentType = Component, ComponentProps = any>(
    component: ComponentType,
    componentProps: ComponentProps,
    destroyWhenClosed: boolean = true,
    beforeBackdropClose?: Function,
  ) => {
    const id = generateId(8);
    const drawer: Drawer<ComponentType, ComponentProps> = {
      id,
      state: 'CLOSED',
      destroyWhenClosed,
      component,
      componentProps,
      beforeBackdropClose,
    };
    drawersControl.drawers.push(drawer);
    return drawer;
  };

  const remove = (drawerId: string) => {
    const drawerIndex = drawersControl.drawers.findIndex(
      (drawer) => drawer.id === drawerId,
    );
    drawersControl.drawers = drawersControl.drawers.filter(
      (_, index) => index !== drawerIndex,
    );
  };

  const find = (drawerId: string) => {
    return drawersControl.drawers.find((drawer) => drawer.id === drawerId);
  };

  const hide = (drawerId: string) => {
    const drawer = find(drawerId);
    if (drawer) {
      drawer.state = 'CLOSED';
    }
  };

  const show = (drawerId: string, routePosition: number) => {
    const drawer = find(drawerId);
    if (drawer) {
      // console.log('open:', drawerId);
      drawer.state = 'OPENED';
      drawer.routePosition = routePosition;
    }
  };

  const blockBodyScroll = computed(() => {
    return drawersControl.drawers.some((drawer) => drawer.state === 'OPENED');
  });

  return {
    /* state */
    /* getters */
    drawers,
    blockBodyScroll,
    /* actions */
    add,
    remove,
    hide,
    show,
    find,
  };
});
