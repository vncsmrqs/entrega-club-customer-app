<script setup lang="ts">
  import FilterOutlineIcon from 'vue-material-design-icons/FilterOutline.vue';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import { markRaw, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import IconButton from '@/components/IconButton.vue';
  import { useSearchFilterStore } from '@/stores/search/search-filter';
  import SearchFilterScreen from '@/components/Search/SearchFilterScreen.vue';

  const router = useRouter();
  const drawersControlStore = useDrawersControlStore();
  const searchFilterStore = useSearchFilterStore();

  const showSearchFilter = () => {
    const drawer = drawersControlStore.add(markRaw(SearchFilterScreen), {});
    router.push({ hash: `#${drawer.id}` });
  };

  onMounted(() => {
    searchFilterStore.fetch();
  });
</script>

<template>
  <IconButton @click="showSearchFilter" class="text-primary-600">
    <span class="relative">
      <span
        v-show="!searchFilterStore.isEmpty"
        class="absolute -top-2 -right-2 rounded-lg bg-primary-600 text-xs px-1 text-white"
      >
        {{ searchFilterStore.totalApplied }}
      </span>
      <FilterOutlineIcon />
    </span>
  </IconButton>
</template>

<style scoped></style>
