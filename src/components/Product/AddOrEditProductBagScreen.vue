<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import StoreOutlineIcon from 'vue-material-design-icons/StoreOutline.vue';
  import CircleSmallIcon from 'vue-material-design-icons/CircleSmall.vue';
  import PlusIcon from 'vue-material-design-icons/Plus.vue';
  import MinusIcon from 'vue-material-design-icons/Minus.vue';
  import CheckIcon from 'vue-material-design-icons/Check.vue';
  import CheckBoldIcon from 'vue-material-design-icons/CheckBold.vue';
  import AlertIcon from 'vue-material-design-icons/Alert.vue';
  import CommentTextOutlineIcon from 'vue-material-design-icons/CommentTextOutline.vue';
  import { useRouter } from 'vue-router';
  import { generateEmptyProduct, useProductStore } from '@/stores/product';
  import type { Choice, GarnishItem, Product } from '@/stores/product';
  import { useMerchantStore } from '@/stores/merchant';
  import { formatToCurrency, generateId } from '@/utils';
  import BackButton from '@/components/BackButton.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import ScreenFooter from '@/components/Screen/ScreenFooter.vue';
  import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
  import IconButton from '@/components/IconButton.vue';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';
  import { useBagStore } from '@/stores/bag';
  import type { BagProduct, BagChoice, BagGarnishItem } from '@/stores/bag';
  import IncrementControl from '@/components/Product/IncrementControl.vue';
  import UserRating from '@/components/Merchant/UserRating.vue';
  import _ from 'lodash';
  import FloatingAlert from '@/components/FloatingAlert.vue';

  const router = useRouter();

  export type ProductScreenProps = {
    productProp?: Product;
    bagProductProp?: BagProduct;
  };

  const props = defineProps<ProductScreenProps>();

  const merchantStore = useMerchantStore();
  const merchant = merchantStore.merchant;

  const productStore = useProductStore();

  let bagProduct = ref<BagProduct>({
    id: generateId(),
    productDetails: generateEmptyProduct(),
    selectedChoices: [],
    quantity: 1,
    comment: '',
  });

  onMounted(() => {
    if (props.bagProductProp) {
      bagProduct.value = _.cloneDeep(props.bagProductProp);
      return;
    }
    populateBagProduct(props.productProp || productStore.product);
  });

  const populateBagProduct = (product: Product): void => {
    bagProduct.value.productDetails = _.cloneDeep(product);
  };

  const findSelectedChoiceIndexById = (
    bagProduct: BagProduct,
    choiceId: string,
  ): [boolean, number] => {
    const index = bagProduct.selectedChoices.findIndex(
      (selectedChoice) => selectedChoice.choiceDetails.id === choiceId,
    );

    return [index > -1, index];
  };

  const getSelectedChoice = (
    bagProduct: BagProduct,
    choice: Choice,
  ): BagChoice | null => {
    const [selectedChoiceExists, selectedChoiceIndex] =
      findSelectedChoiceIndexById(bagProduct, choice.id);

    if (selectedChoiceExists) {
      return bagProduct.selectedChoices[selectedChoiceIndex];
    }

    return null;
  };

  const addSelectedChoice = (
    bagProduct: BagProduct,
    choice: Choice,
  ): BagChoice => {
    const [selectedChoiceExists] = findSelectedChoiceIndexById(
      bagProduct,
      choice.id,
    );

    if (!selectedChoiceExists) {
      bagProduct.selectedChoices.push({
        choiceDetails: choice,
        selectedGarnishItems: [],
      });
    }

    return getSelectedChoice(bagProduct, choice) as BagChoice;
  };

  const findSelectedGarnishItemIndexById = (
    selectedChoice: BagChoice,
    garnishItemId: string,
  ): [boolean, number] => {
    const index = selectedChoice.selectedGarnishItems.findIndex(
      (selectedGarnishItem) =>
        selectedGarnishItem.garnishItemDetails.id === garnishItemId,
    );

    return [index > -1, index];
  };

  const getSelectedGarnishItem = (
    selectedChoice: BagChoice,
    garnishItem: GarnishItem,
  ): BagGarnishItem => {
    const [selectedGarnishItemExists] = findSelectedGarnishItemIndexById(
      selectedChoice,
      garnishItem.id,
    );

    if (!selectedGarnishItemExists) {
      selectedChoice.selectedGarnishItems.push({
        garnishItemDetails: garnishItem,
        quantity: 0,
      });
    }

    const [, selectedGarnishItemIndex] = findSelectedGarnishItemIndexById(
      selectedChoice,
      garnishItem.id,
    );

    return selectedChoice.selectedGarnishItems[selectedGarnishItemIndex];
  };

  const incrementGarnishItem = (
    bagProduct: BagProduct,
    choice: Choice,
    garnishItem: GarnishItem,
  ) => {
    const selectedChoice = addSelectedChoice(bagProduct, choice);

    const selectedGarnishItem = getSelectedGarnishItem(
      selectedChoice,
      garnishItem,
    );

    const totalSelected = getTotalOfSelectedItemsOnChoice(bagProduct, choice);

    if (totalSelected >= choice.max) {
      return;
    }
    selectedGarnishItem.quantity++;
  };

  const decrementGarnishItem = (
    bagProduct: BagProduct,
    choice: Choice,
    garnishItem: GarnishItem,
  ) => {
    const totalSelected = getTotalOfSelectedItemsOnChoice(bagProduct, choice);
    if (totalSelected <= 0) {
      return;
    }

    const selectedChoice = getSelectedChoice(bagProduct, choice);

    if (!selectedChoice) {
      return;
    }

    const [selectedGarnishItemExists] = findSelectedGarnishItemIndexById(
      selectedChoice,
      garnishItem.id,
    );

    if (!selectedGarnishItemExists) {
      return;
    }

    const selectedGarnishItem = getSelectedGarnishItem(
      selectedChoice,
      garnishItem,
    );

    if (selectedGarnishItem.quantity <= 0) {
      return;
    }

    selectedGarnishItem.quantity--;
  };

  const getTotalOfSelectedItemsOnChoice = (
    bagProduct: BagProduct,
    choice: Choice,
  ) => {
    const selectedChoice = getSelectedChoice(bagProduct, choice);

    if (!selectedChoice) {
      return 0;
    }

    return selectedChoice.selectedGarnishItems.reduce(
      (total, selectedGarnishItem) => total + selectedGarnishItem.quantity,
      0,
    );
  };

  const getNumberOfGarnishItemsAddedToChoice = (
    bagProduct: BagProduct,
    choice: Choice,
    garnishItem: GarnishItem,
  ): number => {
    const selectedChoice = getSelectedChoice(bagProduct, choice);

    if (selectedChoice) {
      const [selectedGarnishItemExists] = findSelectedGarnishItemIndexById(
        selectedChoice,
        garnishItem.id,
      );

      if (selectedGarnishItemExists) {
        const selectedGarnishItem = getSelectedGarnishItem(
          selectedChoice,
          garnishItem,
        );

        return selectedGarnishItem.quantity;
      }
    }

    return 0;
  };

  const selectGarnishItem = (
    bagProduct: BagProduct,
    choice: Choice,
    garnishItem: GarnishItem,
  ) => {
    const selectedChoice = addSelectedChoice(bagProduct, choice);

    const [hasGarnishItem] = findSelectedGarnishItemIndexById(
      selectedChoice,
      garnishItem.id,
    );

    selectedChoice.selectedGarnishItems = [];

    if (hasGarnishItem) {
      return;
    }

    const selectedGarnishItem = getSelectedGarnishItem(
      selectedChoice,
      garnishItem,
    );

    selectedGarnishItem.quantity = 1;
  };

  const clickGarnishItem = (
    bagProduct: BagProduct,
    choice: Choice,
    garnishItem: GarnishItem,
  ) => {
    if (choice.max === 1) {
      return selectGarnishItem(bagProduct, choice, garnishItem);
    }
    incrementGarnishItem(bagProduct, choice, garnishItem);
  };

  const incrementBagProductItems = (bagProduct: BagProduct) => {
    bagProduct.quantity++;
  };

  const decrementBagProductItems = (bagProduct: BagProduct) => {
    if (bagProduct.quantity > 1) {
      bagProduct.quantity--;
    }
  };

  const bagStore = useBagStore();

  const findRequiredChoices = (bagProduct: BagProduct): Choice | undefined => {
    const choiceToValidateList =
      bagProduct.productDetails?.choices?.filter((choice) => choice.min) || [];

    return choiceToValidateList.find((choice) => {
      const totalAdded = getTotalOfSelectedItemsOnChoice(bagProduct, choice);
      return totalAdded < choice.min;
    });
  };

  const addProductToBag = async (bagProduct: BagProduct) => {
    const choice = findRequiredChoices(bagProduct);

    if (choice) {
      scrollToChoice(choice.id);
      requiredChoiceError.value = true;
      clearTimeout(requiredChoiceErrorTimeoutId);
      requiredChoiceErrorTimeoutId = setTimeout(() => {
        requiredChoiceError.value = false;
      }, 3000);
      return;
    }

    bagStore.addItem(bagProduct);
    await back();
  };

  const scrollToChoice = (choiceId: string) => {
    const elementToShow = document.querySelector(
      `#choice-${choiceId}`,
    ) as HTMLElement;
    const scrollableContainer =
      document.querySelector(`#main-product-view`)?.parentElement;

    if (elementToShow && scrollableContainer) {
      scrollableContainer.scrollTo(0, elementToShow.offsetTop);
    }
  };

  const requiredChoiceError = ref(false);
  let requiredChoiceErrorTimeoutId: any = 0;

  const back = async () => {
    await router.back();
  };
</script>

<template>
  <ScreenRoot>
    <ScreenHeader>
      <template #left>
        <BackButton />
      </template>
      {{ bagProduct.productDetails.name }}
    </ScreenHeader>
    <ScreenMain :with-padding="false" id="main-product-view">
      <ScreenContent class="!col-span-full">
        <FloatingAlert :show="requiredChoiceError">
          É preciso escolher todos os itens obrigatórios antes de adicionar o
          produto à sacola.
        </FloatingAlert>
        <div class="bg-gray-100 w-full aspect-photo overflow-hidden">
          <img
            class="w-full h-full object-cover"
            :src="bagProduct.productDetails.imageUrl"
            :alt="bagProduct.productDetails.name"
          />
        </div>
        <div class="p-4 flex gap-4">
          <div class="flex-1">
            <h1 class="text-xl font-medium">
              {{ bagProduct.productDetails.name }}
            </h1>
            <div
              v-if="bagProduct.productDetails.description"
              class="mt-2 text-gray-500"
            >
              {{ bagProduct.productDetails.description }}
            </div>
            <div class="mt-4 flex items-center">
              <span class="text-green-700">{{
                formatToCurrency(bagProduct.productDetails.unitPrice)
              }}</span>
              <div
                v-if="bagProduct.productDetails.originalUnitPrice"
                class="text-gray-500 ml-2 text-sm line-through"
              >
                {{
                  formatToCurrency(bagProduct.productDetails.originalUnitPrice)
                }}
              </div>
            </div>
          </div>
        </div>
        <div class="m-4 p-4 border rounded-lg">
          <div class="text-gray-500 flex items-center text-sm pb-1">
            <StoreOutlineIcon :size="16"></StoreOutlineIcon>
            <div class="ml-1">
              {{ merchant.name }}
            </div>
            <div class="flex-1"></div>
            <UserRating :rating="merchant.userRating" />
          </div>
          <div
            class="mt-1 pt-1 text-sm text-gray-400 flex items-center border-t border-dashed"
          >
            <span>30-90 min</span>
            <CircleSmallIcon></CircleSmallIcon>
            <span>{{ formatToCurrency(merchant.deliveryFee) }}</span>
          </div>
        </div>
        <div
          v-for="choice in bagProduct.productDetails.choices"
          :key="choice.id"
          :id="`choice-${choice.id}`"
        >
          <div
            class="sticky top-0 bg-gray-100 text-gray-500 px-5 py-2 text-xl flex justify-between z-10"
          >
            <div class="flex flex-col">
              <span class="font-bold">{{ choice.name }}</span>
              <div class="text-sm text-gray-400">
                <span v-if="choice.min">
                  <span v-if="choice.min != choice.max" class="mr-1">
                    Escolha pelo menos {{ choice.min }}
                    {{ choice.min == 1 ? 'opção' : 'opções' }}.
                  </span>
                  <span
                    >{{
                      getTotalOfSelectedItemsOnChoice(bagProduct, choice)
                    }}
                    de {{ choice.max }}</span
                  >
                </span>
                <span v-if="!choice.min">
                  Escolha até {{ choice.max }}
                  {{ choice.max == 1 ? 'opção' : 'opções' }}
                </span>
              </div>
            </div>
            <div v-if="choice.min" class="w-1/4 flex justify-end items-center">
              <span
                v-if="
                  choice.min >
                  getTotalOfSelectedItemsOnChoice(bagProduct, choice)
                "
                class="text-xs bg-danger-100 rounded-md px-2 py-1 text-danger-600"
              >
                OBRIGATÓRIO
              </span>
              <div v-else class="w-12 flex justify-center">
                <CheckIcon
                  :size="24"
                  class="inline-block text-green-500"
                ></CheckIcon>
              </div>
            </div>
          </div>
          <div
            v-for="garnishItem in choice.garnishItems"
            :key="garnishItem.id"
            class="garnish-item px-5 py-3 flex border-b gap-4 cursor-pointer"
            @click="() => clickGarnishItem(bagProduct, choice, garnishItem)"
          >
            <div class="flex-1 flex items-center justify-between">
              <div class="flex flex-col">
                <span>{{ garnishItem.name }}</span>
                <span
                  v-if="garnishItem.description"
                  class="text-sm text-gray-500"
                >
                  {{ garnishItem.description }}
                </span>
                <div
                  v-if="garnishItem.unitPrice"
                  class="mt-1 flex items-center"
                >
                  <span class="text-green-700 text-sm">
                    + {{ formatToCurrency(garnishItem.unitPrice) }}
                  </span>
                </div>
              </div>
            </div>
            <div v-if="garnishItem.imageUrl" class="flex items-center mr-2">
              <div
                class="w-12 aspect-square border bg-gray-100 rounded-lg overflow-hidden"
              >
                <img
                  class="w-full"
                  :src="garnishItem.imageUrl"
                  :alt="garnishItem.name"
                />
              </div>
            </div>
            <div class="items-center w-6 relative flex justify-center">
              <div
                v-if="choice.max > 1"
                class="bg-white flex items-center p-1 rounded-lg absolute right-0"
                :class="{
                  border:
                    getNumberOfGarnishItemsAddedToChoice(
                      bagProduct,
                      choice,
                      garnishItem,
                    ) > 0,
                }"
              >
                <IconButton
                  v-if="
                    getNumberOfGarnishItemsAddedToChoice(
                      bagProduct,
                      choice,
                      garnishItem,
                    ) > 0
                  "
                  @click.stop="
                    () => decrementGarnishItem(bagProduct, choice, garnishItem)
                  "
                >
                  <MinusIcon
                    :size="16"
                    :class="[
                      getNumberOfGarnishItemsAddedToChoice(
                        bagProduct,
                        choice,
                        garnishItem,
                      ) > 0
                        ? 'text-primary-600'
                        : 'text-gray-300',
                    ]"
                  ></MinusIcon>
                </IconButton>
                <span
                  v-if="
                    getNumberOfGarnishItemsAddedToChoice(
                      bagProduct,
                      choice,
                      garnishItem,
                    ) > 0
                  "
                  class="inline-flex justify-center w-8 text-sm"
                >
                  {{
                    getNumberOfGarnishItemsAddedToChoice(
                      bagProduct,
                      choice,
                      garnishItem,
                    )
                  }}
                </span>
                <IconButton
                  @click.stop="
                    () => incrementGarnishItem(bagProduct, choice, garnishItem)
                  "
                >
                  <PlusIcon
                    :size="16"
                    :class="[
                      getTotalOfSelectedItemsOnChoice(bagProduct, choice) <
                      choice.max
                        ? 'text-primary-600'
                        : 'text-gray-300',
                    ]"
                  ></PlusIcon>
                </IconButton>
              </div>
              <div v-else>
                <IconButton
                  class="min-w-0 mr-5 inline-flex justify-center items-center p-0 w-8 h-8"
                >
                  <CheckBoldIcon
                    v-if="
                      !!getNumberOfGarnishItemsAddedToChoice(
                        bagProduct,
                        choice,
                        garnishItem,
                      )
                    "
                    :size="20"
                    class="text-primary-600"
                  ></CheckBoldIcon>
                  <span v-else class="block w-4 h-4"></span>
                </IconButton>
              </div>
            </div>
          </div>
        </div>
        <div class="px-4 py-6">
          <label
            for="product-message"
            class="mb-2 text-gray-600 flex items-center justify-between"
          >
            <span class="inline-flex items-center">
              <CommentTextOutlineIcon :size="20" class="mr-1" />
              <span class="font-medium">Alguma observação?</span>
            </span>
            <span>{{ bagProduct.comment?.length || 0 }}/140</span>
          </label>
          <textarea
            id="product-message"
            rows="4"
            class="block p-4 w-full text-gray-900 outline-0 bg-gray-100 rounded-xl ring-primary-500 border-0 focus:ring-2"
            placeholder="Ex: Tirar a cebola, maionese à parte, ponto da carne..."
            v-model="bagProduct.comment"
          ></textarea>
        </div>
      </ScreenContent>
    </ScreenMain>
    <ScreenFooter class="flex gap-4">
      <IncrementControl
        :quantity="bagProduct.quantity"
        @increment="() => incrementBagProductItems(bagProduct)"
        @decrement="() => decrementBagProductItems(bagProduct)"
      ></IncrementControl>
      <PrimaryButton
        @click="() => addProductToBag(bagProduct)"
        :class="{
          '!bg-gray-200 !text-gray-400': findRequiredChoices(bagProduct),
        }"
        full
        :center="false"
      >
        <span>{{ !!props.bagProductProp ? 'Atualizar' : 'Adicionar' }}</span>
        <span>{{
          formatToCurrency(bagStore.calcTotalProduct(bagProduct))
        }}</span>
      </PrimaryButton>
    </ScreenFooter>
  </ScreenRoot>
</template>

<style scoped>
  .garnish-item {
    min-height: 5rem;
  }
</style>
