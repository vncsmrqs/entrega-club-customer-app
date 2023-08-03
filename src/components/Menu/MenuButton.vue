<script setup lang="ts">
  import MenuIcon from 'vue-material-design-icons/Menu.vue';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import { markRaw } from 'vue';
  import IconButton from '@/components/IconButton.vue';
  import MenuScreen from '@/components/Menu/MenuScreen.vue';
  import { useDrawerNavigation } from '@/composables/useDrawerNavigation';

  const drawersControlStore = useDrawersControlStore();
  const drawerNavigation = useDrawerNavigation();

  const showMenu = () => {
    const drawer = drawersControlStore.add(markRaw(MenuScreen), {});
    drawerNavigation.openDrawer(drawer.id);
  };
</script>

<template>
  <IconButton class="text-primary-600" @click="showMenu">
    <MenuIcon />
  </IconButton>
</template>

<style scoped></style>
