<script setup lang="ts">
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import BackButton from '@/components/BackButton.vue';
  import ScreenFooter from '@/components/Screen/ScreenFooter.vue';
  import PrimaryButton from '@/components/PrimaryButton.vue';
  import CheckIcon from 'vue-material-design-icons/Check.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import { useRouter } from 'vue-router';
  import { useCustomerAddressStore } from '@/stores/address';
  import type { Address } from '@/stores/address';
  import { reactive } from 'vue';
  import { generateId } from '@/utils';

  const props = defineProps<{
    added: Function;
  }>();

  const customerAddressStore = useCustomerAddressStore();

  const form: Address = reactive({
    id: generateId(),
    city: 'Jaíba',
    country: 'BR',
    neighborhood: 'Veredas',
    state: 'MG',
    streetName: 'Rua Geraldo Paixão Oliveira',
    streetNumber: '164',
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
    reference: 'Na rua do Atacadão Outro Verde',
    complement: 'Casa',
  });

  const confirmAdd = async () => {
    const address = await customerAddressStore.addAddress(form);
    props.added(address);
    back();
    await customerAddressStore.loadCustomerAddresses();
    await customerAddressStore.selectAddress(address);
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
      Adicionar endereço
    </ScreenHeader>
    <ScreenMain></ScreenMain>
    <ScreenFooter>
      <PrimaryButton @click="confirmAdd">
        Salvar
        <template #right>
          <CheckIcon />
        </template>
      </PrimaryButton>
    </ScreenFooter>
  </ScreenRoot>
</template>

<style scoped></style>
