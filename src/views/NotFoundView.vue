<script setup lang="ts">
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';
  import ScreenFooter from '@/components/Screen/ScreenFooter.vue';
  import CancelIcon from 'vue-material-design-icons/Cancel.vue';
  import HomeOutlineIcon from 'vue-material-design-icons/HomeOutline.vue';
  import AppLogo from '@/components/AppLogo.vue';
  import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
</script>

<template>
  <ScreenRoot>
    <ScreenHeader>
      <AppLogo />
    </ScreenHeader>
    <ScreenMain>
      <ScreenContent class="!col-span-full">
        <div
          class="w-full h-full flex flex-col items-center justify-center gap-4"
        >
          <div
            class="w-32 h-32 rounded-full bg-gray-100 text-primary-600 flex justify-center items-center"
          >
            <CancelIcon :size="64" />
          </div>
          <div class="text-center">
            <div class="font-medium text-xl">Puxa, esta página não existe</div>
            <div class="text-gray-500 text-sm mt-2">
              Confira se você digitou algo errado. Talvez o endereço não esteja
              mais disponível
            </div>
          </div>
        </div>
      </ScreenContent>
    </ScreenMain>
    <ScreenFooter class="flex justify-center">
      <RouterLink
        :to="{ name: 'home', replace: true }"
        custom
        v-slot="{ navigate }"
      >
        <PrimaryButton class="w-full md:w-auto" @click="navigate">
          <template #left>
            <HomeOutlineIcon />
          </template>
          Ir para o início
        </PrimaryButton>
      </RouterLink>
    </ScreenFooter>
  </ScreenRoot>
</template>

<style scoped></style>
