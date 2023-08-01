<script setup lang="ts">
  import SearchInput from '@/components/SearchInput.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';

  import { ref } from 'vue';
  import SearchFilterButton from '@/components/Search/SearchFilterButton.vue';
  import SearchResult from '@/components/Search/SearchResult.vue';
  import SearchHome from '@/components/Search/SearchHome.vue';

  const searchValue = ref('');
</script>

<template>
  <ScreenRoot>
    <!--    <ScreenHeader class="lg:hidden">-->
    <!--      <template #left>-->
    <!--        <BackButton />-->
    <!--      </template>-->
    <!--      <SearchInput v-model="searchValue" />-->
    <!--      <template #right> </template>-->
    <!--    </ScreenHeader>-->
    <ScreenMain :with-padding="false" class="relative">
      <ScreenContent class="!col-span-full">
        <div
          class="lg:hidden w-full sticky top-0 left-0 bg-white px-5 py-4 border-b flex gap-4 z-40"
        >
          <SearchInput class="w-full" v-model="searchValue" />
          <SearchFilterButton v-show="false" />
        </div>
        <SearchResult />
        <SearchHome v-show="false" />
      </ScreenContent>
    </ScreenMain>
  </ScreenRoot>
</template>

<style>
  @media (min-width: 1024px) {
  }
</style>
