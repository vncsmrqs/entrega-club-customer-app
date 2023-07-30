<script setup lang="ts">
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import BackButton from '@/components/BackButton.vue';
  import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
  import CheckIcon from 'vue-material-design-icons/Check.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import { useRouter } from 'vue-router';
  import type { Address } from '@/stores/customer-address-list';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';
  import { useSelectedAddressStore } from '@/stores/selected-address';
  import FloatingAlert from '@/components/FloatingAlert.vue';
  import TextInput from '@/components/TextInput.vue';
  import _ from 'lodash';
  import { useCustomerAddressStore } from '@/stores/customer-address-list';
  import { reactive, ref, watch } from 'vue';
  import { generateHashId } from '@/utils';

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
    let validForm = false;
    Object.keys(requiredFields).forEach((fieldName) => {
      const valid = validateField(fieldName as keyof Address);
      if (!valid) {
        validForm = true;
      }
    });
    return validForm;
  };

  const validateField = (fieldName: keyof Address) => {
    const required = requiredFields[fieldName];
    const blocked = blockedFields[fieldName];
    const value = form.value.address[fieldName];
    if (
      required &&
      !blocked &&
      (!value || (typeof value === 'string' && !value.length))
    ) {
      errorFields[fieldName] = 'Obrigatório';
      return false;
    }
    errorFields[fieldName] = '';
  };

  const clonedAddress = _.cloneDeep(props.address);

  const form = ref<{
    address: Address;
  }>({
    address: clonedAddress,
  });

  const requiredFields = reactive<Record<string, boolean>>({
    streetName: true,
    streetNumber: true,
    neighborhood: true,
    city: true,
    country: true,
    state: true,
    reference: true,
    complement: false,
  });

  const blockedFields = reactive<Record<string, boolean>>({
    city: true,
    country: true,
    neighborhood: false,
    state: true,
    streetName: true,
    streetNumber:
      props.address.streetNumber.trim().toLocaleLowerCase() === 's/n',
    reference: false,
    complement: false,
  });

  const errorFields = reactive<Record<string, string>>({
    city: '',
    country: '',
    neighborhood: '',
    state: '',
    streetName: '',
    streetNumber: '',
    reference: '',
    complement: '',
  });

  watch(
    () => blockedFields.streetNumber,
    (value) => {
      if (value) {
        form.value.address.streetNumber = 's/n';
        return;
      }
      form.value.address.streetNumber = '';
    },
  );

  const noStreetNumberFieldId = generateHashId();

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
      Completar endereço
    </ScreenHeader>
    <ScreenMain>
      <FloatingAlert :show="requiredFieldError">
        Preencha corretamente os campos obrigatórios.
      </FloatingAlert>
      <ScreenContent
        class="!col-span-full grid grid-cols-12 grid-flow-row-dense auto-rows-min gap-5"
      >
        <div class="col-span-full">
          <TextInput
            v-model="form.address.streetName"
            label="Endereço"
            @blur="() => validateField('streetName')"
            :required="requiredFields['streetName']"
            :blocked="blockedFields['streetName']"
            :error="errorFields['streetName']"
          />
        </div>
        <div class="col-span-4">
          <TextInput
            @blur="() => validateField('streetNumber')"
            v-model="form.address.streetNumber"
            label="Número"
            type="text"
            :required="requiredFields['streetNumber']"
            :blocked="blockedFields['streetNumber']"
            :error="errorFields['streetNumber']"
          />
        </div>
        <div class="col-span-8 inline-flex items-end">
          <div class="flex justify-start items-center gap-2 h-14">
            <input
              :id="noStreetNumberFieldId"
              type="checkbox"
              v-model="blockedFields['streetNumber']"
              @change="() => validateField('streetNumber')"
              class="bg-primary-600"
            />
            <label :id="noStreetNumberFieldId"> Sem número </label>
          </div>
        </div>
        <div class="col-span-full">
          <TextInput
            @blur="() => validateField('neighborhood')"
            v-model="form.address.neighborhood"
            label="Bairro"
            :required="requiredFields['neighborhood']"
            :blocked="blockedFields['neighborhood']"
            :error="errorFields['neighborhood']"
          />
        </div>
        <div class="col-span-full">
          <TextInput
            @blur="() => validateField('city')"
            v-model="form.address.city"
            label="Cidade"
            :required="requiredFields['city']"
            :blocked="blockedFields['city']"
            :error="errorFields['city']"
          />
        </div>
        <div class="col-span-6">
          <TextInput
            @blur="() => validateField('state')"
            v-model="form.address.state"
            label="Estado"
            :required="requiredFields['state']"
            :blocked="blockedFields['state']"
            :error="errorFields['state']"
          />
        </div>
        <div class="col-span-6">
          <TextInput
            @blur="() => validateField('country')"
            v-model="form.address.country"
            label="País"
            :required="requiredFields['country']"
            :blocked="blockedFields['country']"
            :error="errorFields['country']"
          />
        </div>
        <div class="col-span-full">
          <TextInput
            @blur="() => validateField('complement')"
            v-model="form.address.complement"
            label="Complemento"
            :required="requiredFields['complement']"
            :blocked="blockedFields['complement']"
            :error="errorFields['complement']"
          />
        </div>
        <div class="col-span-full">
          <TextInput
            @blur="() => validateField('reference')"
            v-model="form.address.reference"
            label="Referência"
            :required="requiredFields['reference']"
            :blocked="blockedFields['reference']"
            :error="errorFields['reference']"
          />
        </div>
        <div class="col-span-full mt-5">
          <PrimaryButton @click="saveAddress" class="w-full">
            Salvar endereço
            <template #right>
              <CheckIcon />
            </template>
          </PrimaryButton>
        </div>
      </ScreenContent>
    </ScreenMain>
  </ScreenRoot>
</template>

<style scoped></style>
