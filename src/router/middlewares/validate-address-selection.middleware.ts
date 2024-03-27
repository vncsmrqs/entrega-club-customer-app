import type {
  NavigationGuard,
  NavigationGuardNext,
  RouteLocationNormalized,
} from 'vue-router';
import { useSelectedAddressStore } from '@/stores/address/selected-address';

export const validateAddressSelectionMiddleware: NavigationGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const selectedAddressStore = useSelectedAddressStore();
  // await selectedAddressStore.loadCurrentAddress();
  // alert(`validateAddressSelectionMiddleware: ${from.name} -> ${to.name}`);

  const { ignoreAddressValidationMiddleware } = to.meta;

  if (selectedAddressStore.selectedAddress && to.name === 'select-address') {
    return next({ name: 'home' });
  }

  if (
    !ignoreAddressValidationMiddleware &&
    !selectedAddressStore.selectedAddress
  ) {
    return next({ name: 'select-address' });
  }

  next();
};
