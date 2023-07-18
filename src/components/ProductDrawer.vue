<script setup lang="ts">
  import { onMounted, reactive, ref, watch } from 'vue';
  import MobileTopBar from '@/components/MobileTopBar.vue';
  import StoreOutlineIcon from 'vue-material-design-icons/StoreOutline.vue';
  import StarIcon from 'vue-material-design-icons/Star.vue';
  import CircleSmallIcon from 'vue-material-design-icons/CircleSmall.vue';
  import PlusIcon from 'vue-material-design-icons/Plus.vue';
  import MinusIcon from 'vue-material-design-icons/Minus.vue';
  import CheckIcon from 'vue-material-design-icons/Check.vue';
  import CommentTextOutlineIcon from 'vue-material-design-icons/CommentTextOutline.vue';
  import { useRoute, useRouter } from 'vue-router';
  import type { LocationQueryValue } from 'vue-router';
  import { useProductStore } from '@/stores/product';

  import type { Choice, GarnishItem, Product } from '@/stores/product';
  import { useMerchantStore } from '@/stores/merchant';
  import { formatToCurrency } from '@/utils';
  import ChevronLeftIcon from 'vue-material-design-icons/ChevronLeft.vue';
  import CloseIcon from 'vue-material-design-icons/Close.vue';

  const route = useRoute();
  const router = useRouter();

  const merchantStore = useMerchantStore();
  const merchant = merchantStore.merchant;

  const productStore = useProductStore();
  const product = productStore.product;

  let productCart: ProductCart = reactive({
    selectedChoices: [],
    totalItems: 1,
    comment: null,
  });

  let productId = ref<string | null>('');

  const show = (newProductId: string) => {
    productId.value = newProductId;
  };

  onMounted(async () => {
    productCart = generateProductCart(product);
  });

  type ProductCart = {
    productDetails?: Product;
    selectedChoices: ChoiceCart[];
    totalItems: number;
    comment: string | null;
  };

  type ChoiceCart = {
    choiceDetails: Choice;
    selectedGarnishItems: GarnishItemCart[];
  };

  type GarnishItemCart = {
    garnishItemDetails: GarnishItem;
    totalItems: number;
  };

  const generateProductCart = (product: Product): ProductCart => {
    const productCart: ProductCart = {
      productDetails: product,
      selectedChoices: [],
      totalItems: 1,
      comment: null,
    };

    return reactive<ProductCart>(productCart);
  };

  const findSelectedChoiceIndexById = (
    productCart: ProductCart,
    choiceId: string,
  ): [boolean, number] => {
    const index = productCart.selectedChoices.findIndex(
      (selectedChoice) => selectedChoice.choiceDetails.id === choiceId,
    );

    return [index > -1, index];
  };

  const getSelectedChoice = (
    productCart: ProductCart,
    choice: Choice,
  ): ChoiceCart | null => {
    const [selectedChoiceExists, selectedChoiceIndex] =
      findSelectedChoiceIndexById(productCart, choice.id);

    if (selectedChoiceExists) {
      return productCart.selectedChoices[selectedChoiceIndex];
    }

    return null;
  };

  const addSelectedChoice = (
    productCart: ProductCart,
    choice: Choice,
  ): ChoiceCart => {
    const [selectedChoiceExists] = findSelectedChoiceIndexById(
      productCart,
      choice.id,
    );

    if (!selectedChoiceExists) {
      productCart.selectedChoices.push({
        choiceDetails: choice,
        selectedGarnishItems: [],
      });
    }

    return getSelectedChoice(productCart, choice) as ChoiceCart;
  };

  const findSelectedGarnishItemIndexById = (
    selectedChoice: ChoiceCart,
    garnishItemId: string,
  ): [boolean, number] => {
    const index = selectedChoice.selectedGarnishItems.findIndex(
      (selectedGarnishItem) =>
        selectedGarnishItem.garnishItemDetails.id === garnishItemId,
    );

    return [index > -1, index];
  };

  const getSelectedGarnishItem = (
    selectedChoice: ChoiceCart,
    garnishItem: GarnishItem,
  ): GarnishItemCart => {
    const [selectedGarnishItemExists] = findSelectedGarnishItemIndexById(
      selectedChoice,
      garnishItem.id,
    );

    if (!selectedGarnishItemExists) {
      selectedChoice.selectedGarnishItems.push({
        garnishItemDetails: garnishItem,
        totalItems: 0,
      });
    }

    const [, selectedGarnishItemIndex] = findSelectedGarnishItemIndexById(
      selectedChoice,
      garnishItem.id,
    );

    return selectedChoice.selectedGarnishItems[selectedGarnishItemIndex];
  };

  const incrementGarnishItem = (
    productCart: ProductCart,
    choice: Choice,
    garnishItem: GarnishItem,
  ) => {
    const selectedChoice = addSelectedChoice(productCart, choice);

    const selectedGarnishItem = getSelectedGarnishItem(
      selectedChoice,
      garnishItem,
    );

    const totalSelected = getTotalOfSelectedItemsOnChoice(productCart, choice);

    if (totalSelected >= choice.max) {
      return;
    }
    selectedGarnishItem.totalItems++;
  };

  const decrementGarnishItem = (
    productCart: ProductCart,
    choice: Choice,
    garnishItem: GarnishItem,
  ) => {
    const totalSelected = getTotalOfSelectedItemsOnChoice(productCart, choice);
    if (totalSelected <= 0) {
      return;
    }

    const selectedChoice = getSelectedChoice(productCart, choice);

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

    if (selectedGarnishItem.totalItems <= 0) {
      return;
    }

    selectedGarnishItem.totalItems--;
  };

  const getTotalOfSelectedItemsOnChoice = (
    productCart: ProductCart,
    choice: Choice,
  ) => {
    const selectedChoice = getSelectedChoice(productCart, choice);

    if (!selectedChoice) {
      return 0;
    }

    return selectedChoice.selectedGarnishItems.reduce(
      (total, selectedGarnishItem) => total + selectedGarnishItem.totalItems,
      0,
    );
  };

  const getNumberOfGarnishItemsAddedToChoice = (
    productCart: ProductCart,
    choice: Choice,
    garnishItem: GarnishItem,
  ): number => {
    const selectedChoice = getSelectedChoice(productCart, choice);

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

        return selectedGarnishItem.totalItems;
      }
    }

    return 0;
  };

  const selectGarnishItem = (
    productCart: ProductCart,
    choice: Choice,
    garnishItem: GarnishItem,
  ) => {
    const selectedChoice = addSelectedChoice(productCart, choice);

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

    selectedGarnishItem.totalItems = 1;
  };

  const clickGarnishItem = (
    productCart: ProductCart,
    choice: Choice,
    garnishItem: GarnishItem,
  ) => {
    if (choice.max === 1) {
      return selectGarnishItem(productCart, choice, garnishItem);
    }
    incrementGarnishItem(productCart, choice, garnishItem);
  };

  const totalPrice = (productCart: ProductCart) => {
    if (!productCart.productDetails) {
      return 0;
    }
    const totalChoicesPrice = productCart.selectedChoices.reduce(
      (totalChoicesPrice, selectedChoice) => {
        const totalChoicePrice = selectedChoice.selectedGarnishItems.reduce(
          (totalChoicePrice, selectedGarnishItem) => {
            const totalGarnishItemPrice =
              selectedGarnishItem.totalItems *
              (selectedGarnishItem.garnishItemDetails?.unitPrice || 0);
            return totalChoicePrice + totalGarnishItemPrice;
          },
          0,
        );
        return totalChoicesPrice + totalChoicePrice;
      },
      0,
    );

    const totalUniqueProduct =
      productCart.productDetails.unitPrice +
      totalChoicesPrice * productCart.totalItems;

    return totalUniqueProduct * productCart.totalItems;
  };

  const incrementProductCartItems = (productCart: ProductCart) => {
    productCart.totalItems++;
  };

  const decrementProductCartItems = (productCart: ProductCart) => {
    if (productCart.totalItems > 1) {
      productCart.totalItems--;
    }
  };

  const addProductToCart = () => {
    closeProductDrawer();
  };

  const closeProductDrawer = () => {
    hide();
  };

  const hide = () => {
    // productId.value = null;
    router.back();
  };
</script>

<template>
  <div class="overflow-auto h-full">
    <MobileTopBar class="z-20" :title="product.name">
      <template #left>
        <div class="p-2 flex items-center">
          <div class="md:hidden">
            <button
              @click="hide"
              class="w-10 h-10 flex justify-center items-center rounded-xl hover:bg-gray-100 transition-colors duration-300"
            >
              <ChevronLeftIcon />
            </button>
          </div>
          <div class="hidden md:block">
            <button
              @click="hide"
              class="w-10 h-10 flex justify-center items-center rounded-xl hover:bg-gray-100 transition-colors duration-300"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      </template>
    </MobileTopBar>
    <div class="bg-red-500 w-full aspect-photo overflow-hidden">
      <img
        class="w-full h-full object-cover"
        :src="product.imageUrl"
        :alt="product.name"
      />
    </div>
    <div class="p-4 flex gap-4">
      <div class="flex-1">
        <h1 class="text-lg font-bold">{{ product.name }}</h1>
        <div v-if="product.description" class="mt-2 text-gray-500">
          {{ product.description }}
        </div>
        <div class="mt-4 flex items-center">
          <span class="text-green-700">{{
            formatToCurrency(product.unitPrice)
          }}</span>
          <div
            v-if="product.originalUnitPrice"
            class="text-gray-500 ml-2 text-sm line-through"
          >
            {{ formatToCurrency(product.originalUnitPrice) }}
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
        <div class="inline-flex text-yellow-300 items-center">
          <StarIcon :size="14"></StarIcon>
          <span>{{ merchant.userRating }}</span>
        </div>
      </div>
      <div
        class="mt-1 pt-1 text-sm text-gray-400 flex items-center border-t border-dashed"
      >
        <span>30-90 min</span>
        <CircleSmallIcon></CircleSmallIcon>
        <span>{{ formatToCurrency(merchant.deliveryFee) }}</span>
      </div>
    </div>
    <div v-for="choice in product.choices" :key="choice.id">
      <div
        class="sticky top-16 bg-gray-100 text-gray-500 p-4 text-xl flex justify-between z-10"
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
                >{{ getTotalOfSelectedItemsOnChoice(productCart, choice) }} de
                {{ choice.max }}</span
              >
            </span>
            <span v-if="!choice.min">
              Escolha até {{ choice.max }}
              {{ choice.max == 1 ? 'opção' : 'opções' }}
            </span>
          </div>
        </div>
        <div v-if="choice.min" class="w-1/4 text-right">
          <span
            v-if="
              choice.min > getTotalOfSelectedItemsOnChoice(productCart, choice)
            "
            class="text-xs bg-gray-500 rounded-md px-2 py-1 text-gray-100"
          >
            OBRIGATÓRIO
          </span>
          <CheckIcon
            v-else
            :size="24"
            class="inline-block text-green-500"
          ></CheckIcon>
        </div>
      </div>
      <div
        v-for="garnishItem in choice.garnishItems"
        :key="garnishItem.id"
        class="garnish-item p-4 flex border-b gap-4 cursor-pointer"
        @click="() => clickGarnishItem(productCart, choice, garnishItem)"
      >
        <div class="flex-1 flex items-center justify-between">
          <div class="flex flex-col">
            <span>{{ garnishItem.name }}</span>
            <span v-if="garnishItem.description" class="text-sm text-gray-500">
              {{ garnishItem.description }}
            </span>
            <div v-if="garnishItem.unitPrice" class="mt-1 flex items-center">
              <span class="text-green-700 text-sm">
                + {{ formatToCurrency(garnishItem.unitPrice) }}
              </span>
            </div>
          </div>
        </div>
        <div v-if="garnishItem.imageUrl" class="flex items-center">
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
        <div class="items-center relative w-5 inline-flex justify-end">
          <div
            v-if="choice.max > 1"
            class="bg-white border inline-flex items-center py-0.5 rounded-md absolute right-0"
          >
            <MinusIcon
              v-if="
                getNumberOfGarnishItemsAddedToChoice(
                  productCart,
                  choice,
                  garnishItem,
                ) > 0
              "
              class="p-2"
              :size="20"
              :class="[
                getNumberOfGarnishItemsAddedToChoice(
                  productCart,
                  choice,
                  garnishItem,
                ) > 0
                  ? 'text-red-500'
                  : 'text-gray-300',
              ]"
              @click.stop="
                () => decrementGarnishItem(productCart, choice, garnishItem)
              "
            ></MinusIcon>
            <span
              v-if="
                getNumberOfGarnishItemsAddedToChoice(
                  productCart,
                  choice,
                  garnishItem,
                ) > 0
              "
              class="inline-flex justify-center w-8 text-sm"
            >
              {{
                getNumberOfGarnishItemsAddedToChoice(
                  productCart,
                  choice,
                  garnishItem,
                )
              }}
            </span>
            <PlusIcon
              :size="20"
              class="p-2"
              :class="[
                getTotalOfSelectedItemsOnChoice(productCart, choice) <
                choice.max
                  ? 'text-red-500'
                  : 'text-gray-300',
              ]"
              @click.stop="
                () => incrementGarnishItem(productCart, choice, garnishItem)
              "
            ></PlusIcon>
          </div>

          <div v-else>
            <div
              class="w-5 h-5 bg-gray-100 border rounded-full"
              :class="{
                'border-red-500 border-4 bg-white':
                  !!getNumberOfGarnishItemsAddedToChoice(
                    productCart,
                    choice,
                    garnishItem,
                  ),
              }"
            ></div>
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
        <span>0/140</span>
      </label>
      <textarea
        id="product-message"
        rows="4"
        class="block p-4 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Ex: Tirar a cebola, maionese à parte, ponto da carne..."
      ></textarea>
    </div>
    <div
      class="w-full bg-white sticky bottom-0 px-4 py-3 flex border-t gap-4 z-10"
    >
      <div class="border inline-flex items-center px-2 py-1 rounded-md">
        <button @click="() => decrementProductCartItems(productCart)">
          <MinusIcon
            :size="24"
            :class="[
              productCart.totalItems > 1 ? 'text-red-500' : 'text-gray-300',
            ]"
          ></MinusIcon>
        </button>
        <span class="px-2 w-10 text-center text-sm">
          {{ productCart.totalItems }}
        </span>
        <button @click="() => incrementProductCartItems(productCart)">
          <PlusIcon :size="24" class="text-red-500"></PlusIcon>
        </button>
      </div>
      <button
        @click="addProductToCart"
        class="flex-1 px-4 py-3 flex justify-between items-center rounded-lg bg-red-500 text-white font-bold"
      >
        <span>Adicionar</span>
        <span>{{ formatToCurrency(totalPrice(productCart)) }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
  .garnish-item {
    min-height: 5rem;
  }
</style>
