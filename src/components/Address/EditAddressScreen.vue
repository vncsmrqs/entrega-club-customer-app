<script setup lang="ts">
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import BackButton from '@/components/BackButton.vue';
  import ScreenFooter from '@/components/Screen/ScreenFooter.vue';
  import PrimaryButton from '@/components/PrimaryButton.vue';
  import CheckIcon from 'vue-material-design-icons/Check.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import { useRouter } from 'vue-router';
  import type { Address } from '@/stores/address';
  import { markRaw } from 'vue';
  import DeleteAddressScreen from '@/components/Address/DeleteAddressScreen.vue';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import IconButton from '@/components/IconButton.vue';
  import DeleteOutlineIcon from 'vue-material-design-icons/DeleteOutline.vue';
  import DefaultButton from '@/components/DefaultButton.vue';

  const props = defineProps<{
    address: Address;
  }>();

  const router = useRouter();
  const drawersControlStore = useDrawersControlStore();

  const deleteAddress = (address: Address) => {
    const drawer = drawersControlStore.add(markRaw(DeleteAddressScreen), {
      address,
    });
    router.push({ hash: `#${drawer.id}` });
  };

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
      <template #right>
        <IconButton class="text-red-600" @click="() => deleteAddress(address)">
          <DeleteOutlineIcon :size="24" />
        </IconButton>
      </template>
      Editar endereço
    </ScreenHeader>
    <ScreenMain>
      {{ address.streetName }}
    </ScreenMain>
    <ScreenFooter>
      <DefaultButton class="mb-4" @click="back"> Voltar</DefaultButton>
      <PrimaryButton @click="back">
        Salvar
        <template #right>
          <CheckIcon />
        </template>
      </PrimaryButton>
    </ScreenFooter>
  </ScreenRoot>
</template>

<style scoped></style>
