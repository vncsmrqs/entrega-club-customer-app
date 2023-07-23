<script setup lang="ts">
  import SearchInput from '@/components/SearchInput.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';
  import BackButton from '@/components/BackButton.vue';
  import { generateId } from '@/utils';

  const categories = [
    {
      id: generateId(8),
      name: 'Açaí',
    },
    {
      id: generateId(8),
      name: 'Salgados',
    },
    {
      id: generateId(8),
      name: 'Pizza',
    },
    {
      id: generateId(8),
      name: 'Tapioca',
    },
    {
      id: generateId(8),
      name: 'Saudáveis',
    },
    {
      id: generateId(8),
      name: 'Espetinho',
    },
    {
      id: generateId(8),
      name: 'Vegetariana',
    },
    {
      id: generateId(8),
      name: 'Japonesa',
    },
    {
      id: generateId(8),
      name: 'Árabe',
    },
    {
      id: generateId(8),
      name: 'Lanches',
    },
  ];
</script>

<template>
  <ScreenRoot>
    <ScreenHeader class="lg:hidden">
      Busca
      <template #left>
        <BackButton />
      </template>
    </ScreenHeader>
    <ScreenMain :with-padding="false" class="relative">
      <ScreenContent class="!col-span-full">
        <form class="lg:hidden sticky top-0 left-0 bg-white px-5 py-4 border-b">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >Search</label
          >
          <SearchInput />
        </form>
        <div class="mt-4">
          <h2 class="px-5 font-bold dark:text-gray-100 text-lg">Categorias</h2>
          <div class="grid grid-cols-2 gap-4 p-4">
            <div
              v-for="category in categories"
              :key="category.id"
              class="rounded-lg p-4 bg-gray-100 dark:bg-gray-800 dark:text-white"
            >
              {{ category.name }}
            </div>
          </div>
        </div>
      </ScreenContent>
    </ScreenMain>
  </ScreenRoot>
</template>

<style>
  @media (min-width: 1024px) {
  }
</style>
