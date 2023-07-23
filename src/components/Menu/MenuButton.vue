<script setup lang="ts">
  import MenuIcon from 'vue-material-design-icons/Menu.vue';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import { markRaw } from 'vue';
  import { useRouter } from 'vue-router';
  import IconButton from '@/components/IconButton.vue';
  import MenuScreen from '@/components/Menu/MenuScreen.vue';

  const router = useRouter();

  const drawersControlStore = useDrawersControlStore();

  const showMenu = () => {
    const drawer = drawersControlStore.add(markRaw(MenuScreen), {});
    router.push({ hash: `#${drawer.id}` });
  };
</script>

<template>
  <IconButton class="text-primary-600" @click="showMenu">
    <MenuIcon />
  </IconButton>
</template>

<style scoped></style>
