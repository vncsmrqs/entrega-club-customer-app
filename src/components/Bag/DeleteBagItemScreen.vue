<script setup lang="ts">
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import BackButton from '@/components/BackButton.vue';
  import ScreenFooter from '@/components/Screen/ScreenFooter.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import { useRouter } from 'vue-router';
  import SecondaryButton from '@/components/SecondaryButton.vue';
  import DefaultButton from '@/components/DefaultButton.vue';
  import DeleteOutlineIcon from 'vue-material-design-icons/DeleteOutline.vue';
  import type { BagProduct } from '@/stores/bag';
  import { useBagStore } from '@/stores/bag';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';

  const props = defineProps<{
    bagProduct: BagProduct;
    deleted: Function;
  }>();

  const bagStore = useBagStore();

  const confirmDelete = () => {
    bagStore.deleteItem(props.bagProduct);
    props.deleted();
    back();
  };

  const router = useRouter();

  const back = () => {
    router.back();
  };
</script>

<template>
  <ScreenRoot>
    <ScreenHeader>
      <template #left>
        <BackButton></BackButton>
      </template>
      Excluir item
    </ScreenHeader>
    <ScreenMain>
      <ScreenContent
        class="!col-span-full w-full h-full flex flex-col justify-center items-center gap-4"
      >
        <div
          class="w-32 h-32 rounded-full bg-gray-100 text-primary-600 flex justify-center items-center"
        >
          <DeleteOutlineIcon :size="64" />
        </div>
        <div class="text-center">
          <div class="font-semibold text-lg">
            Deseja realmente excluir este item?
          </div>
          <div class="text-sm">
            Todas as informações deste item serão excluídas permanentemente.
          </div>
        </div>
      </ScreenContent>
    </ScreenMain>
    <ScreenFooter>
      <SecondaryButton @click="confirmDelete" class="w-full mb-4">
        <template #left>
          <DeleteOutlineIcon />
        </template>
        Excluir
      </SecondaryButton>
      <DefaultButton @click="back" class="w-full">Cancelar</DefaultButton>
    </ScreenFooter>
  </ScreenRoot>
</template>

<style scoped></style>
