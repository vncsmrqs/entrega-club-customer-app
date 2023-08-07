<script setup lang="ts">
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';
  import { onMounted } from 'vue';
  import { useOrdersStore } from '@/stores/orders';
  import TextInput from '@/components/TextInput.vue';
  import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
  import SecondaryButton from '@/components/Buttons/SecondaryButton.vue';

  const ordersStore = useOrdersStore();

  onMounted(async () => {
    await ordersStore.fetch();
  });
  // const showPassword = ref(false);
  // const togglePassword = () => (showPassword.value = !showPassword.value);

  const handleFocusCode = (event: any) => {
    // event.target.setSelectionRange(0, 1);
    event.target.select();
  };

  const handleInputCode = (event: any, codeNumber: number) => {
    const length = event.target.value.length;
    if (length > 1) {
      event.target.value = event.target.value.slice(length - 1, length);
    }

    if (event.target.value.length) {
      const nextInput = document.querySelector(
        `input[name=code-${codeNumber + 1}]`,
      );

      if (nextInput && nextInput instanceof HTMLInputElement) {
        nextInput.focus();
      }
    }
  };

  const handleKeyUpCode = (event: any, codeNumber: number) => {
    const length = event.target.value.length;

    if (!length && Number(event.keyCode) === 8) {
      const previousInput = document.querySelector(
        `input[name=code-${codeNumber - 1}]`,
      );

      if (previousInput && previousInput instanceof HTMLInputElement) {
        previousInput.focus();
      }
    }
  };
</script>

<template>
  <ScreenRoot class="bg-primary-600">
    <ScreenMain>
      <ScreenContent class="!col-span-full flex flex-col gap-5 items-center">
        <div
          class="w-full grid grid-cols-1 grid-flow-row bg-white rounded-xl p-5 gap-5 drop-shadow-2xl"
        >
          <div class="font-medium text-2xl">Qual o seu e-mail?</div>
          <TextInput name="email" label="E-mail" />
          <div class="w-full mt-10">
            <div class="text-xs text-gra-500 mb-3">
              O Entrega Club poderá enviar comunicações neste e-mail. Para
              cancelar a inscrição, acesse 'Configurações'.
            </div>
            <PrimaryButton full>Continuar</PrimaryButton>
          </div>
        </div>
        <div
          class="w-full grid grid-cols-1 grid-flow-row bg-white rounded-xl p-5 gap-4 drop-shadow-2xl"
        >
          <div class="font-medium text-2xl">
            Qual é o número do seu celular?
          </div>
          <div class="grid grid-cols-12 gap-5">
            <TextInput
              class="col-span-3"
              name="phone"
              label="País"
              value="+55"
              blocked
            />
            <TextInput class="col-span-9" name="phone" label="Número" />
            <div class="col-span-full ml-2 mt-2 text-xs text-gray-500">
              Número de acesso à conta. Por segurança, essa informação não
              poderá ser alterada
            </div>
          </div>
          <PrimaryButton class="mt-5" blocked>Receber código</PrimaryButton>
        </div>
        <div
          class="w-full grid grid-cols-1 grid-flow-row bg-white rounded-xl p-5 gap-4 drop-shadow-2xl"
        >
          <div class="font-medium text-2xl">
            Digite o código de 6 dígitos que enviamos para o seu email
            <span class="font-bold text-primary-600">vncsmrqs@gmail.com</span>
          </div>
          <div class="grid grid-cols-6 gap-2">
            <TextInput
              v-for="i in 6"
              :key="i"
              class="col-span-1"
              :name="'code-' + i"
              value=""
              type="number"
              min="0"
              max="9"
              @focus="handleFocusCode"
              @input="(e: any) => handleInputCode(e, i)"
              @keyup="(e: any) => handleKeyUpCode(e, i)"
            />
          </div>
          <div class="mt-10 flex flex-col items-center">
            <SecondaryButton class="!bg-transparent" small
              >Não recebi meu código
            </SecondaryButton>
            <PrimaryButton class="mt-2" blocked full>Continuar</PrimaryButton>
          </div>
        </div>
      </ScreenContent>
    </ScreenMain>
    <!--          <TextInput name="password" label="Senha">-->
    <!--            <template #right>-->
    <!--              <button @click="togglePassword" class="text-gray-400">-->
    <!--                <EyeIcon v-if="showPassword" />-->
    <!--                <EyeOffIcon v-else />-->
    <!--              </button>-->
    <!--            </template>-->
    <!--          </TextInput>-->
  </ScreenRoot>
</template>

<style scoped></style>
