<script setup lang="ts">
  import MenuIcon from 'vue-material-design-icons/Menu.vue';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import { markRaw } from 'vue';
  import IconButton from '@/components/IconButton.vue';
  import MenuScreen from '@/components/Menu/MenuScreen.vue';
  import { useDrawerNavigation } from '@/composables/useDrawerNavigation';
  import { useAuthStore } from '@/stores/auth';
  import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';

  const drawersControlStore = useDrawersControlStore();
  const drawerNavigation = useDrawerNavigation();

  const showMenu = () => {
    const drawer = drawersControlStore.add(markRaw(MenuScreen), {});
    drawerNavigation.openDrawer(drawer.id);
  };

  const authStore = useAuthStore();
</script>

<template>
  <RouterLink v-if="!authStore.isLogged" :to="{ name: 'login' }">
    <PrimaryButton v-show="true" small>Entrar</PrimaryButton>
  </RouterLink>
  <IconButton v-else class="text-primary-600" @click="showMenu">
    <MenuIcon />
  </IconButton>
</template>

<style scoped></style>
