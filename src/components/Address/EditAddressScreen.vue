<script setup lang="ts">
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import BackButton from '@/components/BackButton.vue';
  import ScreenFooter from '@/components/Screen/ScreenFooter.vue';
  import PrimaryButton from '@/components/PrimaryButton.vue';
  import CheckIcon from 'vue-material-design-icons/Check.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import { useRouter } from 'vue-router';
  import type { Address } from '@/stores/customer-address-list';
  import { markRaw } from 'vue';
  import DeleteAddressScreen from '@/components/Address/DeleteAddressScreen.vue';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import IconButton from '@/components/IconButton.vue';
  import DeleteOutlineIcon from 'vue-material-design-icons/DeleteOutline.vue';
  import DefaultButton from '@/components/DefaultButton.vue';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';

  const props = defineProps<{
    // isOpened: boolean;
    address: Address;
  }>();

  const router = useRouter();
  const drawersControlStore = useDrawersControlStore();

  const deleteAddress = (address: Address) => {
    const drawer = drawersControlStore.add<typeof DeleteAddressScreen>(
      markRaw(DeleteAddressScreen),
      {
        address,
        deleted: () => back(),
      },
    );
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
        <IconButton
          class="text-primary-600"
          @click="() => deleteAddress(props.address)"
        >
          <DeleteOutlineIcon :size="24" />
        </IconButton>
      </template>
      Editar endereço
    </ScreenHeader>
    <ScreenMain>
      <ScreenContent class="!col-span-full flex flex-col gap-4">
        <div>
          <span class="mr-1 font-medium">Logradouro:</span>
          {{ props.address.streetNumber }}
        </div>
        <div>
          <span class="mr-1 font-medium">Bairro:</span>
          {{ props.address.neighborhood }}
        </div>
        <div>
          <span class="mr-1 font-medium">Cidade:</span>
          {{ props.address.city }}
        </div>
        <div>
          <span class="mr-1 font-medium">Estado:</span>
          {{ props.address.state }}
        </div>
        <div>
          <span class="mr-1 font-medium">País:</span>
          {{ props.address.country }}
        </div>
        <div>
          <span class="mr-1 font-medium">Complemento:</span>
          {{ props.address.complement }}
        </div>
        <div>
          <span class="mr-1 font-medium">Logradouro:</span>
          {{ props.address.streetName }}
        </div>
        <div>
          <span class="mr-1 font-medium">Referência:</span>
          {{ props.address.reference }}
        </div>
        <div>
          <span class="mr-1 font-medium">Coordenadas:</span>
          {{ props.address.coordinates.latitude }},
          {{ props.address.coordinates.longitude }}
        </div>
      </ScreenContent>
    </ScreenMain>
    <ScreenFooter>
      <DefaultButton class="w-full mb-4" @click="back"> Voltar</DefaultButton>
      <PrimaryButton @click="back" class="w-full">
        Salvar
        <template #right>
          <CheckIcon />
        </template>
      </PrimaryButton>
    </ScreenFooter>
  </ScreenRoot>
</template>

<style scoped></style>
