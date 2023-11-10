import type { NavigationFailure, RouteLocationRaw } from 'vue-router';
import { useRoute, useRouter } from 'vue-router';
import { useDrawersControlStore } from '@/stores/drawers-control';

type NavigateOptions = { preserveQuery?: boolean; preserveHash?: boolean };

export const useDrawerNavigation = () => {
  const route = useRoute();
  const router = useRouter();
  const drawersControlStore = useDrawersControlStore();

  const getCurrentPosition = () => {
    return ((router.options.history.state.position as number) || 0) + 1;
  };

  const openDrawer = async (
    drawerId: string,
    options?: NavigateOptions,
  ): Promise<NavigationFailure | void | undefined> => {
    return navigate(
      {
        hash: `#${drawerId}`,
      },
      {
        ...options,
        preserveQuery:
          options?.preserveQuery === undefined || options.preserveQuery,
      },
    );
  };

  const closeDrawer = async (
    drawerId: string,
  ): Promise<NavigationFailure | void | undefined> => {
    const drawer = drawersControlStore.find(drawerId);
    if (drawer && drawer.routePosition) {
      router.go(drawer.routePosition - getCurrentPosition() - 1);
      return;
    }
    router.go(-1);
  };

  const navigate = async (
    to: RouteLocationRaw,
    options?: NavigateOptions,
  ): Promise<NavigationFailure | void | undefined> => {
    if (
      typeof to === 'object' &&
      (options?.preserveQuery || options?.preserveHash)
    ) {
      return router.push({
        ...to,
        query: {
          ...(options?.preserveQuery ? route.query : {}),
          ...to.query,
        },
        hash: options?.preserveHash ? route.hash : to.hash,
      });
    }

    return router.push(to);
  };

  return { openDrawer, closeDrawer, navigate };
};
