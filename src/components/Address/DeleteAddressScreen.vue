<script setup lang="ts">
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import BackButton from '@/components/BackButton.vue';
  import ScreenFooter from '@/components/Screen/ScreenFooter.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import { useRouter } from 'vue-router';
  import SecondaryButton from '@/components/Buttons/SecondaryButton.vue';
  import DefaultButton from '@/components/Buttons/DefaultButton.vue';
  import DeleteOutlineIcon from 'vue-material-design-icons/DeleteOutline.vue';
  import type { Address } from '@/stores/customer-address-list';
  import { useCustomerAddressStore } from '@/stores/customer-address-list';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';

  const props = defineProps<{
    address: Address;
    deleted: Function;
  }>();

  const customerAddressStore = useCustomerAddressStore();

  const confirmDelete = () => {
    customerAddressStore.deleteAddress(props.address.id);
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
      Excluir endereço
    </ScreenHeader>
    <ScreenMain>
      <ScreenContent class="!col-span-full">
        <div
          class="w-full h-full flex flex-col justify-center items-center gap-4"
        >
          <div
            class="w-24 h-24 rounded-full bg-primary-100 text-primary-600 flex justify-center items-center"
          >
            <DeleteOutlineIcon :size="48" />
          </div>
          <div class="text-center">
            <div class="font-semibold text-lg">
              Deseja realmente excluir o endereço?
            </div>
            <div class="text-sm">
              Todas as informações deste endereço serão excluídas
              permanentemente.
            </div>
          </div>
        </div>
      </ScreenContent>
    </ScreenMain>
    <ScreenFooter>
      <SecondaryButton @click="confirmDelete" class="mb-4 w-full">
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
