<script setup lang="ts">
  import { markRaw, onMounted, ref, watch } from 'vue';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
  import ScreenFooter from '@/components/Screen/ScreenFooter.vue';
  import BackButton from '@/components/BackButton.vue';
  import { useBagStore } from '@/stores/bag';
  import type { BagProduct } from '@/stores/bag';
  import IconButton from '@/components/IconButton.vue';
  import PencilOutlineIcon from 'vue-material-design-icons/PencilOutline.vue';
  import DeleteOutlineIcon from 'vue-material-design-icons/DeleteOutline.vue';
  import ChevronUpIcon from 'vue-material-design-icons/ChevronUp.vue';
  import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue';
  import ReloadIcon from 'vue-material-design-icons/Reload.vue';
  import IncrementControl from '@/components/Product/IncrementControl.vue';
  import { formatToCurrency } from '@/utils';
  import DeleteBagItemScreen from '@/components/Bag/DeleteBagItemScreen.vue';
  import BagEmpty from '@/components/Bag/BagEmpty.vue';
  import AddOrEditProductBagScreen from '@/components/Product/AddOrEditProductBagScreen.vue';
  import type { ProductScreenProps } from '@/components/Product/AddOrEditProductBagScreen.vue';
  import MerchantHeader from '@/components/Merchant/MerchantHeader.vue';
  import { useDrawerNavigation } from '@/composables/useDrawerNavigation';
  import FloatingAlert from '@/components/FloatingAlert.vue';
  import FloatingLoader from '@/components/FloatingLoader.vue';
  import BagDeliveryTypeSelection from '@/components/Bag/BagDeliveryTypeSelection.vue';
  import DefaultButton from '@/components/Buttons/DefaultButton.vue';
  import BagPayment from '@/components/Bag/BagPayment.vue';
  import AccordionItem from '@/components/AccordionItem.vue';
  import { useRoute, useRouter } from 'vue-router';
  import type { LocationQueryValue } from 'vue-router';

  const router = useRouter();
  const route = useRoute();

  const baseScreenHistoryPosition = ref(0);

  onMounted(async () => {
    baseScreenHistoryPosition.value =
      (router.options.history.state.position as number) || 0;
    await bagStore.loadBag();
  });

  type StepType = 'BAG' | 'DELIVERY_TYPE' | 'PAYMENT';

  const DEFAULT_STEP = 'BAG';
  const step = ref<StepType>(DEFAULT_STEP);

  const bagStore = useBagStore();

  const setStep = (value: StepType | string | undefined | null) => {
    if (value === step.value) {
      return;
    }

    const validSteps = ['BAG', 'DELIVERY_TYPE', 'PAYMENT'];

    if (value && validSteps.includes(value)) {
      step.value = value as StepType;
      updateStepRoute();
      return;
    }
    step.value = DEFAULT_STEP;
    updateStepRoute();
  };

  const updateStepRoute = () => {
    if (route.query.step === step.value) {
      return;
    }

    drawerNavigation.navigate(
      { query: { step: step.value } },
      { preserveHash: true, preserveQuery: true },
    );
  };

  watch(
    () => route.query.step,
    (value: string | null | LocationQueryValue[]) => {
      if (value) {
        if (Array.isArray(value)) {
          setStep(value[0]);
          return;
        }
        setStep(value);
        return;
      }

      step.value = DEFAULT_STEP;
    },
  );

  const nextStep = () => {
    if (step.value === 'BAG') {
      setStep('DELIVERY_TYPE');
    } else if (step.value === 'DELIVERY_TYPE') {
      setStep('PAYMENT');
    } else {
      setStep('PAYMENT');
    }
  };

  const editItem = (bagProduct: BagProduct) => {
    const drawer = drawersControlStore.add<
      typeof AddOrEditProductBagScreen,
      ProductScreenProps
    >(markRaw(AddOrEditProductBagScreen), {
      bagProductProp: bagProduct,
    });
    drawerNavigation.openDrawer(drawer.id);
  };

  const deleteItem = (bagProduct: BagProduct) => {
    const drawer = drawersControlStore.add<typeof DeleteBagItemScreen>(
      markRaw(DeleteBagItemScreen),
      {
        bagProduct,
        deleted: () => {},
      },
    );
    drawerNavigation.openDrawer(drawer.id);
  };

  const showTotalDetails = ref(false);

  const drawersControlStore = useDrawersControlStore();
  const drawerNavigation = useDrawerNavigation();

  const emit = defineEmits(['hide']);

  const back = (isMobile: boolean) => {
    if (!isMobile) {
      emit('hide');
      return;
    }

    router.back();
  };
</script>

<template>
  <ScreenRoot>
    <ScreenHeader>
      Sacola
      <template #left>
        <BackButton use-events @back="back" />
      </template>
    </ScreenHeader>
    <ScreenMain>
      <ScreenContent class="!col-span-full">
        <FloatingLoader :show="bagStore.loadingCurrentMerchant">
          Atualizando informações...
        </FloatingLoader>

        <FloatingAlert :show="!!bagStore.errorOnLoadCurrentMerchant">
          <div class="w-full flex justify-between items-center gap-4">
            {{ bagStore.errorOnLoadCurrentMerchant }}
            <IconButton
              class="text-danger-600"
              @click="() => bagStore.loadBag()"
            >
              <ReloadIcon />
            </IconButton>
          </div>
        </FloatingAlert>

        <template v-if="bagStore.isEmpty">
          <BagEmpty />
        </template>

        <template v-else>
          <Transition name="fade" mode="out-in" appear>
            <template v-if="step === 'BAG'">
              <div class="flex flex-col gap-4">
                <template v-if="bagStore.currentMerchant">
                  <div class="text-lg font-medium">Você está pedindo em:</div>
                  <MerchantHeader
                    :merchant="bagStore.currentMerchant"
                    class="border rounded-xl"
                  />
                </template>
                <div class="text-lg font-medium">
                  Os itens selecionados são:
                </div>
                <TransitionGroup name="list">
                  <div
                    v-for="bagProduct in bagStore.items"
                    :key="bagProduct.id"
                    class="rounded-lg border flex flex-col"
                  >
                    <div class="flex gap-4 p-4">
                      <div class="flex-shrink-0">
                        <div
                          class="w-24 aspect-photo border bg-gray-100 rounded-md overflow-hidden"
                        >
                          <img
                            class="w-full"
                            :src="bagProduct.productDetails?.imageUrl"
                            :alt="bagProduct.productDetails?.name"
                          />
                        </div>
                      </div>
                      <div class="flex-1">
                        <div class="font-medium">
                          {{ bagProduct.productDetails?.name }}
                        </div>
                        <ul
                          v-for="bagChoice in bagProduct.selectedChoices"
                          :key="bagChoice.choiceDetails.id"
                          class="text-sm"
                        >
                          <li
                            v-for="bagGarnishItem in bagChoice.selectedGarnishItems.filter(
                              (i) => i.quantity,
                            )"
                            :key="bagGarnishItem.garnishItemDetails.id"
                            class="text-gray-500"
                          >
                            <span class="mr-2">{{
                              bagGarnishItem.quantity
                            }}</span>
                            <span>
                              {{ bagGarnishItem.garnishItemDetails.name }}
                            </span>
                          </li>
                        </ul>
                        <div
                          v-if="bagProduct.comment?.length"
                          class="mt-2 p-2 text-sm text-gray-600 bg-gray-100 rounded-xl"
                        >
                          {{ bagProduct.comment }}
                        </div>
                      </div>
                    </div>
                    <div class="flex justify-end gap-2 border-t p-2">
                      <div class="flex flex-col items-start">
                        <div
                          v-if="bagProduct.productDetails?.originalUnitPrice"
                          class="text-gray-500 text-xs line-through"
                        >
                          {{ formatToCurrency(15) }}
                        </div>
                        <span class="text-green-700">
                          {{
                            formatToCurrency(
                              bagStore.calcTotalProduct(bagProduct),
                            )
                          }}
                        </span>
                      </div>
                      <div class="flex-1"></div>
                      <IncrementControl
                        @increment="bagStore.incrementProduct(bagProduct)"
                        @decrement="bagStore.decrementProduct(bagProduct)"
                        :quantity="bagProduct.quantity"
                      ></IncrementControl>
                      <div class="flex-shrink-0 text-danger-600">
                        <IconButton @click="() => deleteItem(bagProduct)">
                          <DeleteOutlineIcon></DeleteOutlineIcon>
                        </IconButton>
                      </div>
                      <div class="flex-shrink-0">
                        <IconButton
                          @click="() => editItem(bagProduct)"
                          class="text-primary-600"
                        >
                          <PencilOutlineIcon></PencilOutlineIcon>
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </TransitionGroup>
              </div>
            </template>

            <template v-else-if="step === 'DELIVERY_TYPE'">
              <BagDeliveryTypeSelection />
            </template>

            <template v-else-if="step === 'PAYMENT'">
              <BagPayment />
            </template>

            <template v-else>Erro</template>
          </Transition>
        </template>
      </ScreenContent>
    </ScreenMain>
    <ScreenFooter v-if="!bagStore.isEmpty">
      <div class="flex justify-between mb-2">
        <div class="font-semibold">Resumo de valores</div>
        <DefaultButton
          :blocked="step === 'PAYMENT'"
          :disabled="step === 'PAYMENT'"
          small
          dense
          @click="() => (showTotalDetails = !showTotalDetails)"
        >
          <template v-if="!showTotalDetails">
            <ChevronUpIcon />
          </template>
          <template v-else>
            <ChevronDownIcon />
          </template>
        </DefaultButton>
      </div>
      <AccordionItem :opened="showTotalDetails || step === 'PAYMENT'">
        <div class="w-full flex items-center justify-between mb-2 text-sm">
          <div class="">Subtotal</div>
          <div class="inline-flex items-center">
            <span class="text-gray-500">
              {{ formatToCurrency(bagStore.subtotalPrice) }}
            </span>
          </div>
        </div>
        <div class="w-full flex items-center justify-between mb-2 text-sm">
          <div class="">Taxa de serviço</div>
          <div class="inline-flex items-center">
            <span v-if="!bagStore.serviceFee" class="text-green-700">
              Grátis
            </span>
            <span v-else class="text-gray-500">
              {{ formatToCurrency(bagStore.serviceFee) }}
            </span>
          </div>
        </div>
        <div
          v-if="bagStore.deliveryType === 'DELIVERY'"
          class="w-full flex items-center justify-between mb-2 text-sm"
        >
          <div class="">Taxa de entrega</div>
          <div class="inline-flex items-center">
            <span v-if="!bagStore.deliveryFee" class="text-green-700">
              Grátis
            </span>
            <span v-else class="text-gray-500">
              {{ formatToCurrency(bagStore.deliveryFee) }}
            </span>
          </div>
        </div>
      </AccordionItem>
      <div class="w-full flex items-center justify-between mb-4 font-bold">
        <div>Total</div>
        <div class="inline-flex items-center">
          <span class="text-green-700">
            {{ formatToCurrency(bagStore.totalPrice) }}
          </span>
          <!--          <div class="text-gray-500 ml-2 text-sm line-through">-->
          <!--            {{ formatToCurrency(30) }}-->
          <!--          </div>-->
        </div>
      </div>
      <DefaultButton
        v-if="step !== 'BAG'"
        @click="() => router.back()"
        full
        class="hidden md:block mb-4"
      >
        Voltar
      </DefaultButton>
      <PrimaryButton v-if="step !== 'PAYMENT'" @click="nextStep" full>
        Continuar
      </PrimaryButton>
      <PrimaryButton v-if="step === 'PAYMENT'" full>
        <span v-if="bagStore.deliveryType === 'DELIVERY'">Fazer pedido</span>
        <span v-else>Confirmar retirada</span>
      </PrimaryButton>
    </ScreenFooter>
  </ScreenRoot>
</template>

<style scoped></style>
