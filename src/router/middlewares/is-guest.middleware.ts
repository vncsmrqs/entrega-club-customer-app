import type {
  NavigationGuard,
  NavigationGuardNext,
  RouteLocationNormalized,
} from 'vue-router';
import { useAuthStore } from '@/stores/auth';

export const isGuestMiddleware: NavigationGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  alert(`isGuestMiddleware: ${from.name} -> ${to.name}`);

  const authStore = useAuthStore();

  if (authStore.isLogged) {
    return next({ name: 'home' });
  }

  next();
};
