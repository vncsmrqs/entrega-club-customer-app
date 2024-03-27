<script setup lang="ts">
  import RightDrawer from '@/components/RightDrawer.vue';
  import ListAddressScreen from '@/components/Address/ListAddressScreen.vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const afterSelection = () => {
    router.replace({ name: 'home' });
  };
</script>

<template>
  <div>
    <RightDrawer :show="true" :before-backdrop-close="() => false" :index="0">
      <ListAddressScreen
        :show-back-button="false"
        :after-selection="afterSelection"
      />
    </RightDrawer>
  </div>
</template>

<style scoped></style>
