<script setup lang="ts">
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import BackButton from '@/components/BackButton.vue';
  import ScreenFooter from '@/components/Screen/ScreenFooter.vue';
  import PencilOutlineIcon from 'vue-material-design-icons/PencilOutline.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import { useRouter } from 'vue-router';
  import type { Address } from '@/stores/customer-address-list';
  import { computed, markRaw, ref } from 'vue';
  import DeleteAddressScreen from '@/components/Address/DeleteAddressScreen.vue';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import IconButton from '@/components/IconButton.vue';
  import DeleteOutlineIcon from 'vue-material-design-icons/DeleteOutline.vue';
  import DefaultButton from '@/components/Buttons/DefaultButton.vue';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';
  import { useSelectedAddressStore } from '@/stores/selected-address';
  import FloatingAlert from '@/components/FloatingAlert.vue';
  import MapAddressSelectionScreen from '@/components/Address/MapAddressSelectionScreen.vue';
  import { timeout } from '@/utils';
  import SecondaryButton from '@/components/Buttons/SecondaryButton.vue';
  import _ from 'lodash';

  const props = defineProps<{
    // isOpened: boolean;
    address: Address;
    edited?: Function;
    deleted?: Function;
  }>();

  const selectedAddressStore = useSelectedAddressStore();

  const isCurrentAddress = computed(() => {
    return selectedAddressStore.selectedAddress?.id === props.address.id;
  });

  const router = useRouter();
  const drawersControlStore = useDrawersControlStore();

  const currentAddressError = ref(false);
  let currentAddressErrorTimeout: any = 0;

  const showCurrentAddressError = () => {
    currentAddressError.value = true;
    clearTimeout(currentAddressErrorTimeout);
    currentAddressErrorTimeout = setTimeout(() => {
      currentAddressError.value = false;
    }, 2000);
  };

  const editAddress = async () => {
    const drawer = drawersControlStore.add(markRaw(MapAddressSelectionScreen), {
      saved: () => {
        back();
        if (props.edited) {
          props.edited();
        }
      },
      address: _.cloneDeep(props.address),
    });
    await timeout(300);
    router.push({ hash: `#${drawer.id}` });
  };

  const deleteAddress = (address: Address) => {
    if (isCurrentAddress.value) {
      showCurrentAddressError();
      return;
    }
    const drawer = drawersControlStore.add<typeof DeleteAddressScreen>(
      markRaw(DeleteAddressScreen),
      {
        address,
        deleted: () => {
          back();
          if (props.deleted) {
            props.deleted();
          }
        },
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
          :class="{
            'text-primary-600': !isCurrentAddress,
            'text-gray-300 cursor-not-allowed': isCurrentAddress,
          }"
          @click="() => deleteAddress(props.address)"
        >
          <DeleteOutlineIcon :size="24" />
        </IconButton>
      </template>
      Opções do endereço
    </ScreenHeader>
    <ScreenMain>
      <FloatingAlert :show="currentAddressError">
        Você não pode excluir o endereço que está usando no momento.
      </FloatingAlert>
      <ScreenContent class="!col-span-full flex flex-col gap-4">
        <div>
          <span class="mr-1 font-medium">Endereço:</span>
          {{ props.address.streetName }}
        </div>
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
          <span class="mr-1 font-medium">Referência:</span>
          {{ props.address.reference || 'Não preenchido' }}
        </div>
        <div>
          <span class="mr-1 font-medium">Coordenadas:</span>
          {{ props.address.coordinates.latitude }},
          {{ props.address.coordinates.longitude }}
        </div>
      </ScreenContent>
    </ScreenMain>
    <ScreenFooter>
      <SecondaryButton class="w-full mb-4" @click="editAddress" full>
        <template #left>
          <PencilOutlineIcon />
        </template>
        Editar
      </SecondaryButton>
      <DefaultButton class="w-full" @click="back"> Voltar</DefaultButton>
    </ScreenFooter>
  </ScreenRoot>
</template>

<style scoped></style>
