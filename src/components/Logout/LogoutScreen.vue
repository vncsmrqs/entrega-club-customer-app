<script setup lang="ts">
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';
  import { useAuthStore } from '@/stores/auth';
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const authStore = useAuthStore();

  onMounted(async () => {
    await authStore.logout();
    await router.replace({ name: 'home' });
  });
</script>

<template>
  <ScreenRoot class="bg-white">
    <ScreenMain>
      <ScreenContent class="!col-span-full flex flex-col gap-5 items-center">
        Saindo...
      </ScreenContent>
    </ScreenMain>
  </ScreenRoot>
</template>

<style scoped></style>
