<script setup lang="ts">
  import SearchInput from '@/components/SearchInput.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';
  import { computed, onBeforeMount, ref, watch } from 'vue';
  import SearchResult from '@/components/Search/SearchResult.vue';
  import SearchHome from '@/components/Search/SearchHome.vue';
  import SearchAutocomplete from '@/components/Search/SearchAutocomplete.vue';
  import { useSearchStore } from '@/stores/search/search';
  import { useRoute, useRouter } from 'vue-router';
  import type { LocationQueryValue } from 'vue-router';
  import CloseIcon from 'vue-material-design-icons/Close.vue';
  import IconButton from '@/components/IconButton.vue';

  const router = useRouter();
  const route = useRoute();
  const searchStore = useSearchStore();

  const searchTerm = ref('');
  const showSearchHome = ref(false);
  const showSearchResults = ref(false);

  const submitSearch = () => {
    router.push({
      query: { q: searchTerm.value },
      replace: true,
    });
  };

  const search = async (term: string) => {
    searchTerm.value = term;
    await searchStore.search(term);
  };

  const handleQueryParams = (
    term: string | LocationQueryValue | LocationQueryValue[],
  ) => {
    if (term) {
      showSearchHome.value = false;
      showSearchResults.value = true;

      if (Array.isArray(term)) {
        search(term[0] as string);
        return;
      }

      search(term as string);
      return;
    }

    searchTerm.value = '';
    showSearchHome.value = true;
    showSearchResults.value = false;
  };

  const clearSearch = () => {
    router.push({
      replace: true,
    });
  };

  const showHome = computed(
    () => showSearchHome.value && !showSearchResults.value,
  );

  watch(() => route.query.q, handleQueryParams);

  onBeforeMount(() => {
    handleQueryParams(route.query.q);
  });
</script>

<template>
  <ScreenRoot>
    <ScreenMain :with-padding="false" class="relative">
      <ScreenContent class="!col-span-full">
        <div
          class="md:hidden w-full sticky top-0 left-0 bg-white px-5 py-4 border-b flex gap-4 z-40"
          @submit.prevent="submitSearch"
        >
          <form class="w-full relative">
            <SearchInput class="w-full" v-model="searchTerm" />
            <SearchAutocomplete v-show="false" />
          </form>
          <IconButton v-show="!showHome" @click="clearSearch">
            <CloseIcon class="text-danger-600" />
          </IconButton>
        </div>
        <Transition name="fade" mode="out-in">
          <SearchHome v-if="showHome" />
          <SearchResult v-else />
        </Transition>
      </ScreenContent>
    </ScreenMain>
  </ScreenRoot>
</template>

<style scoped></style>
