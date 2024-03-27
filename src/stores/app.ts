import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

export const useAppStore = defineStore('app', () => {
  const started = ref(false);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const showNavigationLoading = ref(false);
  let navigationLoadingInterval: number | undefined;
  const navigationLoadingPercentage = ref<number>(0);

  const startNavigationLoading = () => {
    showNavigationLoading.value = true;
    navigationLoadingPercentage.value = 20;
    clearInterval(navigationLoadingInterval);
    navigationLoadingInterval = setInterval(() => {
      if (navigationLoadingPercentage.value > 95) {
        clearInterval(navigationLoadingInterval);
        return;
      }

      if (navigationLoadingPercentage.value > 90) {
        navigationLoadingPercentage.value += 0.1;
        return;
      }

      if (navigationLoadingPercentage.value > 80) {
        navigationLoadingPercentage.value += 0.5;
        return;
      }

      if (navigationLoadingPercentage.value > 50) {
        navigationLoadingPercentage.value += 1;
        return;
      }

      navigationLoadingPercentage.value += 10;
    }, 300);
  };

  const endNavigationLoading = () => {
    navigationLoadingPercentage.value = 100;
    clearInterval(navigationLoadingInterval);
    setTimeout(() => {
      showNavigationLoading.value = false;
      setTimeout(() => {
        navigationLoadingPercentage.value = 0;
      }, 100);
    }, 300);
  };

  const authStore = useAuthStore();

  const start = async (force: boolean = false) => {
    if (started.value && !force) {
      return;
    }
    loading.value = true;
    try {
      await authStore.auth();
      started.value = true;
      error.value = null;
    } catch (error: any) {
      error.value = error.toString();
    } finally {
      loading.value = false;
    }
  };

  return {
    //State
    loading,
    error,
    showNavigationLoading,
    navigationLoadingPercentage,
    //Actions
    start,
    startNavigationLoading,
    endNavigationLoading,
  };
});
