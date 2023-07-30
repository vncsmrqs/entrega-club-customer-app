<script setup lang="ts">
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import BackButton from '@/components/BackButton.vue';
  import ScreenFooter from '@/components/Screen/ScreenFooter.vue';
  import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
  import CheckIcon from 'vue-material-design-icons/Check.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import { useRouter } from 'vue-router';
  import type { Address } from '@/stores/customer-address-list';
  import DefaultButton from '@/components/Buttons/DefaultButton.vue';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';
  import { useSelectedAddressStore } from '@/stores/selected-address';
  import FloatingAlert from '@/components/FloatingAlert.vue';
  import TextInput from '@/components/TextInput.vue';
  import _ from 'lodash';
  import { useCustomerAddressStore } from '@/stores/customer-address-list';
  import { ref, watch } from 'vue';

  const props = defineProps<{
    address: Address;
    saved: Function;
  }>();

  const selectedAddressStore = useSelectedAddressStore();
  const customerAddressStore = useCustomerAddressStore();

  const router = useRouter();

  const requiredFieldError = ref(false);
  let requiredFieldErrorTimeout: any = 0;

  const showRequiredFieldError = () => {
    requiredFieldError.value = true;
    clearTimeout(requiredFieldErrorTimeout);
    requiredFieldErrorTimeout = setTimeout(() => {
      requiredFieldError.value = false;
    }, 2000);
  };

  const saveAddress = async () => {
    if (findRequiredFields()) {
      showRequiredFieldError();
      return;
    }
    const address = await customerAddressStore.addAddress(form.value.address);
    await customerAddressStore.load();
    await selectedAddressStore.selectAddress(address);
    props.saved(address);
    back();
  };

  const findRequiredFields = () => {
    return false;
  };

  const clonedAddress = _.cloneDeep(props.address);

  const form = ref<{
    noStreetNumber: boolean;
    address: Address;
  }>({
    noStreetNumber: clonedAddress.streetNumber === 's/n',
    address: clonedAddress,
  });

  watch(
    () => form.value.noStreetNumber,
    (value) => {
      if (value) {
        form.value.address.streetNumber = 's/n';
        return;
      }
      form.value.address.streetNumber = '';
    },
  );

  const disabledFields = false;

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
      Salvar endereço
    </ScreenHeader>
    <ScreenMain>
      <FloatingAlert :show="requiredFieldError">
        Preencha corretamente os campos obrigatórios.
      </FloatingAlert>
      <ScreenContent
        class="!col-span-full grid grid-cols-12 grid-flow-row-dense auto-rows-min gap-4"
      >
        <div class="col-span-full">
          <TextInput
            v-model="form.address.streetName"
            label="Endereço"
            :disabled="disabledFields"
          />
        </div>
        <div class="col-span-3">
          <TextInput
            v-model="form.address.streetNumber"
            label="Número"
            :type="form.noStreetNumber ? 'text' : 'number'"
            :disabled="form.noStreetNumber"
          />
        </div>
        <div class="col-span-9 inline-flex items-end">
          <div class="flex justify-start items-center gap-2 h-11">
            <input
              type="checkbox"
              v-model="form.noStreetNumber"
              class="bg-primary-600"
            />
            <label class="text-sm">Sem número</label>
          </div>
        </div>
        <div class="col-span-full">
          <TextInput v-model="form.address.neighborhood" label="Bairro" />
        </div>
        <div class="col-span-6">
          <TextInput
            v-model="form.address.city"
            label="Cidade"
            :disabled="disabledFields"
          />
        </div>
        <div class="col-span-3">
          <TextInput
            v-model="form.address.state"
            label="Estado"
            :disabled="disabledFields"
          />
        </div>
        <div class="col-span-3">
          <TextInput
            v-model="form.address.country"
            label="País"
            :disabled="disabledFields"
          />
        </div>
        <div class="col-span-full">
          <TextInput v-model="form.address.complement" label="Complemento" />
        </div>
        <div class="col-span-full">
          <TextInput v-model="form.address.reference" label="Referência" />
        </div>
      </ScreenContent>
    </ScreenMain>
    <ScreenFooter>
      <DefaultButton class="w-full mb-4" @click="back">Voltar</DefaultButton>
      <PrimaryButton @click="saveAddress" class="w-full">
        Salvar endereço
        <template #right>
          <CheckIcon />
        </template>
      </PrimaryButton>
    </ScreenFooter>
  </ScreenRoot>
</template>

<style scoped></style>
