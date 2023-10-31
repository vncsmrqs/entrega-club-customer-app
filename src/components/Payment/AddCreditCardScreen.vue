<script setup lang="ts">
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import BackButton from '@/components/BackButton.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';
  import TextInput from '@/components/TextInput.vue';
  import FloatingAlert from '@/components/FloatingAlert.vue';
  import { reactive, ref } from 'vue';
  import ScreenFooter from '@/components/Screen/ScreenFooter.vue';
  import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
  import CheckIcon from 'vue-material-design-icons/Check.vue';

  const props = defineProps<{
    saved: Function;
  }>();

  const requiredFieldError = ref(false);
  let requiredFieldErrorTimeout: any = 0;

  const showRequiredFieldError = () => {
    requiredFieldError.value = true;
    clearTimeout(requiredFieldErrorTimeout);
    requiredFieldErrorTimeout = setTimeout(() => {
      requiredFieldError.value = false;
    }, 2000);
  };

  const saveCard = async () => {
    if (hasInvalidFields()) {
      showRequiredFieldError();
      return;
    }
    props.saved();
  };

  const hasInvalidFields = (showErrors = true) => {
    let hasInvalidFields = false;
    Object.keys(requiredFields).forEach((fieldName) => {
      const valid = validateField(fieldName as keyof CreditCard, showErrors);
      if (!valid) {
        hasInvalidFields = true;
      }
    });
    return hasInvalidFields;
  };

  const validateField = (fieldName: keyof CreditCard, showErrors = true) => {
    const required = requiredFields[fieldName];
    const value = form.value.card[fieldName];
    if (required && (!value || (typeof value === 'string' && !value.length))) {
      if (showErrors) {
        errorFields[fieldName] = 'Obrigatório';
      }
      return false;
    }
    errorFields[fieldName] = '';
    return true;
  };

  type CreditCard = {
    cardNumber: string;
    ownerName: string;
    ownerDocument: string;
    dueDate: string;
    cvv: number;
    nickname?: string;
  };

  const form = ref<{
    card: CreditCard;
  }>({
    card: {
      cardNumber: '',
      ownerName: '',
      ownerDocument: '',
      dueDate: '',
      cvv: 0,
      nickname: '',
    },
  });

  const requiredFields = reactive<Record<string, boolean>>({
    cardNumber: true,
    ownerName: true,
    ownerDocument: true,
    dueDate: true,
    cvv: true,
    nickname: false,
  });

  const errorFields = reactive<Record<string, string>>({
    cardNumber: '',
    ownerName: '',
    ownerDocument: '',
    dueDate: '',
    cvv: '',
    nickname: '',
  });
</script>

<template>
  <ScreenRoot>
    <ScreenHeader>
      Adicionar cartão de crédito
      <template #left>
        <BackButton />
      </template>
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
            v-model="form.card.cardNumber"
            label="Número"
            @blur="() => validateField('cardNumber')"
            :required="requiredFields['cardNumber']"
            :error="errorFields['cardNumber']"
          />
        </div>
        <div class="col-span-6">
          <TextInput
            @blur="() => validateField('dueDate')"
            v-model="form.card.dueDate"
            label="Data de vencimento"
            type="text"
            :required="requiredFields['dueDate']"
            :error="errorFields['dueDate']"
          />
        </div>
        <div class="col-span-6">
          <TextInput
            @blur="() => validateField('cvv')"
            @update:model-value="(value) => (form.card.cvv = Number(value))"
            :model-value="form.card.cvv.toString()"
            label="CVV"
            type="number"
            :min="0"
            :max="999"
            :required="requiredFields['cvv']"
            :error="errorFields['cvv']"
          />
        </div>
        <div class="col-span-full">
          <TextInput
            @blur="() => validateField('ownerName')"
            v-model="form.card.ownerName"
            label="Nome do proprietário impresso do cartão"
            :required="requiredFields['ownerName']"
            :error="errorFields['ownerName']"
          />
        </div>
        <div class="col-span-full">
          <TextInput
            @blur="() => validateField('ownerDocument')"
            v-model="form.card.ownerDocument"
            label="CPF do proprietário do cartão"
            :required="requiredFields['ownerDocument']"
            :error="errorFields['ownerDocument']"
          />
        </div>
        <div class="col-span-full">
          <TextInput
            @blur="() => validateField('nickname')"
            v-model="form.card.nickname"
            label="Apelido do cartão"
            :required="requiredFields['nickname']"
            :error="errorFields['nickname']"
          />
        </div>
      </ScreenContent>
    </ScreenMain>
    <ScreenFooter>
      <PrimaryButton @click="saveCard" :blocked="hasInvalidFields(false)" full>
        Salvar cartão
        <template #right>
          <CheckIcon />
        </template>
      </PrimaryButton>
    </ScreenFooter>
  </ScreenRoot>
</template>

<style scoped></style>
