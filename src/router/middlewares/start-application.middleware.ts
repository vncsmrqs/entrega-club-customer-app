import type { NavigationGuard } from 'vue-router';
import { useAppStore } from '@/stores/app';

export const startApplicationMiddleware: NavigationGuard = async () => {
  const appStore = useAppStore();
  await appStore.start();
};
