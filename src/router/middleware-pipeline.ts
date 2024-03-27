import type {
  NavigationGuard,
  RouteLocationNormalized,
  RouteLocationRaw,
  RouteRecordNormalized,
} from 'vue-router';

export type RouteMiddlewareResult = void | Error | RouteLocationRaw | boolean;

export const middlewarePipeline: NavigationGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
) => {
  const middlewares: NavigationGuard[] = to.matched.reduce<NavigationGuard[]>(
    (middlewares: NavigationGuard[], record: RouteRecordNormalized) => {
      if (record?.meta?.middlewares?.length) {
        middlewares = middlewares.concat(record.meta.middlewares);
      }
      return middlewares;
    },
    [],
  );

  if (!middlewares || !middlewares.length) {
    return;
  }

  for (const middleware of middlewares) {
    const result = await middleware(to, from, () => {
      throw new Error('Next function is deprecated');
    });

    if (result === true || result === undefined) {
      continue;
    }

    return result;
  }
};
