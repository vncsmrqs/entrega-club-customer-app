import type {
  NavigationGuard,
  NavigationGuardNext,
  RouteLocationNormalized,
} from 'vue-router';
import { useAuthStore } from '@/stores/auth';

export const isAuthenticatedMiddleware: NavigationGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();

  alert(`isAuthenticatedMiddleware: ${from.name} -> ${to.name}`);

  if (!authStore.isLogged) {
    return next({ name: 'login' });
  }

  next();
};
