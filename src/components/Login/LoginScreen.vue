<script setup lang="ts">
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import BackButton from '@/components/BackButton.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';
  import OrderEmpty from '@/components/Order/OrderEmpty.vue';
  import { onMounted, ref } from 'vue';
  import { useOrdersStore } from '@/stores/orders';
  import ScreenLoader from '@/components/Screen/ScreenLoader.vue';
  import ScreenError from '@/components/Screen/ScreenError.vue';
  import TextInput from '@/components/TextInput.vue';
  import AppLogo from '@/components/AppLogo.vue';
  import EyeIcon from 'vue-material-design-icons/Eye.vue';
  import EyeOffIcon from 'vue-material-design-icons/EyeOff.vue';
  import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
  import SecondaryButton from '@/components/Buttons/SecondaryButton.vue';

  const ordersStore = useOrdersStore();

  onMounted(async () => {
    await ordersStore.fetch();
  });
  const showPassword = ref(false);
  const togglePassword = () => (showPassword.value = !showPassword.value);
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
              class="col-span-1"
              name="code-1"
              value=""
              type="number"
              min="0"
              max="9"
            />
            <TextInput
              class="col-span-1"
              name="code-2"
              value=""
              type="number"
              min="0"
              max="9"
            />
            <TextInput
              class="col-span-1"
              name="code-3"
              value=""
              type="number"
              min="0"
              max="9"
            />
            <TextInput
              class="col-span-1"
              name="code-4"
              value=""
              type="number"
              min="0"
              max="9"
            />
            <TextInput
              class="col-span-1"
              name="code-5"
              value=""
              type="number"
              min="0"
              max="9"
            />
            <TextInput
              class="col-span-1"
              name="code-6"
              value=""
              type="number"
              min="0"
              max="9"
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
