import type { NavigationFailure } from 'vue-router';
import { useRoute, useRouter } from 'vue-router';

export const useDrawerNavigation = () => {
  const route = useRoute();
  const router = useRouter();
  const openDrawer = async (
    drawerId: string,
    options?: { preserveQuery?: boolean },
  ): Promise<NavigationFailure | void | undefined> => {
    const preserveQuery: boolean =
      options?.preserveQuery === undefined || options.preserveQuery;
    return router.push({
      query: { ...(preserveQuery ? route.query : {}) },
      hash: `#${drawerId}`,
    });
  };

  return { openDrawer };
};
