<script setup lang="ts">
  import { markRaw, onMounted } from 'vue';
  import AddressSelection from '@/components/Address/ListAddressScreen.vue';
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

  onMounted(async () => {
    await bagStore.loadBag();
  });

  const drawersControlStore = useDrawersControlStore();
  const bagStore = useBagStore();
  const drawerNavigation = useDrawerNavigation();

  const openAddress = () => {
    const drawer = drawersControlStore.add(markRaw(AddressSelection), {});
    drawerNavigation.openDrawer(drawer.id);
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
</script>

<template>
  <ScreenRoot>
    <ScreenHeader>
      Sacola
      <template #left>
        <BackButton />
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
          <div v-if="bagStore.currentMerchant">
            <div class="text-lg font-medium mb-2">Você está pedindo em:</div>
            <MerchantHeader
              :merchant="bagStore.currentMerchant"
              class="border rounded-xl"
            />
          </div>
          <div class="text-lg font-medium mt-8 mb-2">Itens selecionados:</div>
          <div class="flex flex-col gap-4">
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
                        <span class="mr-2">{{ bagGarnishItem.quantity }}</span>
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
                        formatToCurrency(bagStore.calcTotalProduct(bagProduct))
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
      </ScreenContent>
    </ScreenMain>
    <ScreenFooter v-if="!bagStore.isEmpty">
      <div class="w-full flex items-center justify-between mb-4">
        <div class="font-bold">Total</div>
        <div class="inline-flex items-center">
          <span class="text-green-700">{{
            formatToCurrency(bagStore.totalPrice)
          }}</span>
          <div class="text-gray-500 ml-2 text-sm line-through">
            {{ formatToCurrency(30) }}
          </div>
        </div>
      </div>
      <PrimaryButton @click="openAddress" class="w-full"
        >Continuar
      </PrimaryButton>
    </ScreenFooter>
  </ScreenRoot>
</template>

<style scoped></style>
