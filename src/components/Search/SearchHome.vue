<script setup lang="ts">
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
</template>

<style scoped></style>
