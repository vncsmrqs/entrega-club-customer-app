<script setup lang="ts">
  import NotificationButton from '@/components/Notification/NotificationButton.vue';
  import MenuButton from '@/components/Menu/MenuButton.vue';
  import BagButton from '@/components/Bag/BagButton.vue';
  import SearchInput from '@/components/SearchInput.vue';
  import AppLogo from '@/components/AppLogo.vue';
  import { ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import type { LocationQueryValue } from 'vue-router';

  const router = useRouter();
  const route = useRoute();

  const submitSearch = () => {
    router.push({
      name: 'search',
      query: { q: searchTerm.value },
      replace: true,
    });
  };

  const parseQueryParamsToString = (
    value: string | LocationQueryValue | LocationQueryValue[],
  ): string => {
    if (value && Array.isArray(value)) {
      return value[0] || '';
    }
    return value || '';
  };

  const searchTerm = ref<string>(parseQueryParamsToString(route.query.q));

  watch(
    () => route.query.q,
    (term: string | LocationQueryValue | LocationQueryValue[]) => {
      searchTerm.value = parseQueryParamsToString(term);
    },
  );
</script>

<template>
  <div class="w-full flex flex-col">
    <div
      class="w-full flex px-5 py-2 md:py-4 border-b gap-2 bg-white dark:border-gray-950 items-center dark:bg-gray-800 dark:text-white"
    >
      <AppLogo />
      <div class="flex-1"></div>
      <form class="flex-1" @submit.prevent="submitSearch">
        <SearchInput small class="w-full" v-model="searchTerm" />
      </form>
      <NotificationButton />
      <BagButton small />
      <MenuButton />
    </div>
  </div>
</template>

<style scoped></style>
