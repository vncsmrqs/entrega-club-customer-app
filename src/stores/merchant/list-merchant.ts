import { defineStore } from 'pinia';
import { ref } from 'vue';
import { listMerchantsByLocation } from '@/gateways';
import type { Merchant } from '@/stores/merchant/merchant';

export const useListMerchantStore = defineStore('list-merchant', () => {
  /* state */
  const merchantList = ref<Merchant[]>([]);
  const offset = ref(0);
  const limit = ref(10);
  const loading = ref(false);
  const error = ref<string | null>(null);

  /* getters */

  /* actions */
  const fetch = async (_offset = 0, _limit = limit.value) => {
    loading.value = true;
    try {
      if (!offset.value) {
        merchantList.value = [];
      }
      const result = await listMerchantsByLocation({
        latitude: '1',
        longitude: '2',
        offset: _offset,
        limit: _limit,
      });

      offset.value = _offset;
      limit.value = _limit;

      if (offset.value) {
        merchantList.value = merchantList.value.concat(result);
      } else {
        merchantList.value = result;
      }

      error.value = null;
    } catch (e: any) {
      error.value = e.toString();

      if (!offset.value) {
        merchantList.value = [];
      }
    } finally {
      loading.value = false;
    }
  };

  return {
    /* state */
    merchantList,
    loading,
    error,
    offset,
    limit,

    /* getters */

    /* actions */
    fetch,
  };
});
