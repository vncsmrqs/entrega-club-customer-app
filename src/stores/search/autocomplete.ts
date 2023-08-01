import { ref } from 'vue';
import { defineStore } from 'pinia';
import { timeout } from '@/utils';

export type AutocompleteResult = {
  intentionLabel: string; // 'Itens'
  intentionType: string; // 'ITEM';
  predictionLabel: string; // '[#1A1A1A: Burguer] camarão'
  displayLabel: string; // 'Burguer camarão';
};

export const useSearchAutocompleteStore = defineStore(
  'search-autocomplete',
  () => {
    /* state */
    const result = ref<AutocompleteResult[]>([]);
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);
    /* getters */

    /* actions */
    const fetch = async (): Promise<void> => {
      loading.value = true;
      try {
        await timeout(500);
        result.value = [];
      } catch (e: any) {
        error.value = e.toString();
        result.value = [];
      } finally {
        loading.value = false;
      }
    };

    return {
      /* state */
      result,
      loading,
      error,

      /* getters */

      /* actions */
      fetch,
    };
  },
);
