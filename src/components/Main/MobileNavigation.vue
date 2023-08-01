<script setup lang="ts">
  import HomeOutlineIcon from 'vue-material-design-icons/HomeOutline.vue';
  import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';
  import TextBoxOutlineIcon from 'vue-material-design-icons/TextBoxOutline.vue';
  import MobileMenuItem from '@/components/MobileMenuItem.vue';
  import TextBoxIcon from 'vue-material-design-icons/TextBox.vue';
  import MenuIcon from 'vue-material-design-icons/Menu.vue';
  import HomeIcon from 'vue-material-design-icons/Home.vue';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import { markRaw } from 'vue';
  import MenuScreen from '@/components/Menu/MenuScreen.vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const drawersControlStore = useDrawersControlStore();

  const showMenu = () => {
    const drawer = drawersControlStore.add(markRaw(MenuScreen), {});
    router.push({ hash: `#${drawer.id}` });
  };
</script>

<template>
  <nav class="w-full bg-white flex justify-around">
    <RouterLink :to="{ name: 'home' }" v-slot="{ isActive }">
      <MobileMenuItem title="Início" :active="isActive">
        <template #icon>
          <HomeIcon v-if="isActive" :size="24"></HomeIcon>
          <HomeOutlineIcon v-else :size="24"></HomeOutlineIcon>
        </template>
      </MobileMenuItem>
    </RouterLink>
    <RouterLink :to="{ name: 'search' }" v-slot="{ isActive }">
      <MobileMenuItem title="Busca" :active="isActive">
        <template #icon>
          <MagnifyIcon :size="24"></MagnifyIcon>
        </template>
      </MobileMenuItem>
    </RouterLink>
    <RouterLink :to="{ name: 'orders' }" v-slot="{ isActive }">
      <MobileMenuItem title="Pedidos" :active="isActive">
        <template #icon>
          <TextBoxIcon v-if="isActive" :size="24"></TextBoxIcon>
          <TextBoxOutlineIcon v-else :size="24"></TextBoxOutlineIcon>
        </template>
      </MobileMenuItem>
    </RouterLink>
    <MobileMenuItem title="Menu" :active="false" @click="showMenu">
      <template #icon>
        <MenuIcon />
      </template>
    </MobileMenuItem>
  </nav>
</template>

<style scoped></style>
