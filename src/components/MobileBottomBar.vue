<script setup lang="ts">
  import HomeOutlineIcon from 'vue-material-design-icons/HomeOutline.vue';
  import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';
  import TextBoxOutlineIcon from 'vue-material-design-icons/TextBoxOutline.vue';
  import AccountIcon from 'vue-material-design-icons/Account.vue';
  import MobileMenuItem from '@/components/MobileMenuItem.vue';
  import TextBoxIcon from 'vue-material-design-icons/TextBox.vue';
  import AccountOutlineIcon from 'vue-material-design-icons/AccountOutline.vue';
  import HomeIcon from 'vue-material-design-icons/Home.vue';
</script>

<template>
  <nav
    class="mobile-bottom-bar dark:border-gray-950 dark:bg-gray-800 dark:text-white"
  >
    <RouterLink :to="{ name: 'home' }" v-slot="{ isActive }">
      <MobileMenuItem title="Início" :active="isActive" badge="1">
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
    <RouterLink :to="{ name: 'profile' }" v-slot="{ isActive }">
      <MobileMenuItem title="Perfil" :active="isActive">
        <template #icon>
          <AccountIcon v-if="isActive" :size="24"></AccountIcon>
          <AccountOutlineIcon v-else :size="24"></AccountOutlineIcon>
        </template>
      </MobileMenuItem>
    </RouterLink>
  </nav>
</template>

<style scoped>
  .mobile-bottom-bar {
    @apply sticky z-10 bottom-0 bg-white w-full flex justify-around border-t;
  }
</style>
