<script setup lang="ts">
  import NotificationButton from '@/components/Notification/NotificationButton.vue';
  import MenuButton from '@/components/Menu/MenuButton.vue';
  import BagButton from '@/components/Bag/BagButton.vue';
  import SearchInput from '@/components/SearchInput.vue';
  import AppLogo from '@/components/AppLogo.vue';
  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { useSearchStore } from '@/stores/search/search';

  const router = useRouter();
  const searchStore = useSearchStore();

  const submitSearch = () => {
    router.push({
      query: { q: searchTerm.value },
      replace: true,
    });
  };

  const searchTerm = ref('');

  watch(
    () => searchStore.term,
    (value: string) => {
      searchTerm.value = value;
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
        <SearchInput class="w-full" v-model="searchTerm" />
      </form>
      <NotificationButton />
      <BagButton small />
      <MenuButton />
    </div>
  </div>
</template>

<style scoped></style>
