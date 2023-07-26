<script setup lang="ts">
  import { markRaw, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import AddressSelection from '@/components/Address/ListAddressScreen.vue';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import PrimaryButton from '@/components/PrimaryButton.vue';
  import ScreenFooter from '@/components/Screen/ScreenFooter.vue';
  import BackButton from '@/components/BackButton.vue';
  import { useBagStore } from '@/stores/bag';
  import type { BagProduct } from '@/stores/bag';
  import IconButton from '@/components/IconButton.vue';
  import PencilOutlineIcon from 'vue-material-design-icons/PencilOutline.vue';
  import DeleteOutlineIcon from 'vue-material-design-icons/DeleteOutline.vue';
  import IncrementControl from '@/components/Product/IncrementControl.vue';
  import { formatToCurrency } from '@/utils';
  import DeleteBagItemScreen from '@/components/Bag/DeleteBagItemScreen.vue';
  import BagEmpty from '@/components/Bag/BagEmpty.vue';

  onMounted(() => {});

  const router = useRouter();

  const drawersControlStore = useDrawersControlStore();

  const openAddress = () => {
    const drawer = drawersControlStore.add(markRaw(AddressSelection), {});
    router.push({ hash: `#${drawer.id}` });
  };

  const deleteItem = (bagProduct: BagProduct) => {
    const drawer = drawersControlStore.add<typeof DeleteBagItemScreen>(
      markRaw(DeleteBagItemScreen),
      {
        bagProduct,
        deleted: () => {},
      },
    );
    router.push({ hash: `#${drawer.id}` });
  };

  const bagStore = useBagStore();
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
        <template v-if="bagStore.isEmpty">
          <BagEmpty />
        </template>
        <template v-else>
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
                    >
                      <li
                        v-for="bagGarnishItem in bagChoice.selectedGarnishItems"
                        :key="bagGarnishItem.garnishItemDetails.id"
                        class="ml-4 text-gray-500"
                      >
                        <span class="mr-2">{{ bagGarnishItem.quantity }}</span>
                        <span>{{
                          bagGarnishItem.garnishItemDetails.name
                        }}</span>
                      </li>
                    </ul>
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
                    <span class="text-green-700">{{
                      formatToCurrency(bagStore.calcTotalProduct(bagProduct))
                    }}</span>
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
                    <IconButton class="bg-primary-100 text-primary-600">
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
