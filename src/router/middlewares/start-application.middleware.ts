import type {
  NavigationGuard,
  NavigationGuardNext,
  RouteLocationNormalized,
} from 'vue-router';
import { useAppStore } from '@/stores/app';

export const startApplicationMiddleware: NavigationGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const appStore = useAppStore();
  await appStore.start();
  console.log(`startApplicationMiddleware: ${from.name} -> ${to.name}`);
  next();
};
