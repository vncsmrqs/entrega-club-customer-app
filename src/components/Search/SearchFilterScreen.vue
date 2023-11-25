<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import type { Component } from 'vue';
  import BackButton from '@/components/BackButton.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';
  import ScreenLoader from '@/components/Screen/ScreenLoader.vue';
  import ScreenError from '@/components/Screen/ScreenError.vue';
  import StarOutlineIcon from 'vue-material-design-icons/StarOutline.vue';
  import RacingHelmetIcon from 'vue-material-design-icons/RacingHelmet.vue';
  import SwapVerticalIcon from 'vue-material-design-icons/SwapVertical.vue';
  import CurrencyUsdIcon from 'vue-material-design-icons/CurrencyUsd.vue';
  import ClockFastIcon from 'vue-material-design-icons/ClockFast.vue';
  import MapMarkerOutlineIcon from 'vue-material-design-icons/MapMarkerOutline.vue';
  import StoreIcon from 'vue-material-design-icons/Store.vue';
  import GlassMugVariantIcon from 'vue-material-design-icons/GlassMugVariant.vue';
  import SilverwareIcon from 'vue-material-design-icons/Silverware.vue';
  import EraserVariantIcon from 'vue-material-design-icons/Eraser.vue';
  import CheckIcon from 'vue-material-design-icons/Check.vue';
  import { useSearchFilterStore } from '@/stores/search/search-filter';
  import type { SortType } from '@/stores/search/search-filter';
  import { formatToCurrency } from '@/utils';
  import ScreenFooter from '@/components/Screen/ScreenFooter.vue';
  import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
  import TabButton from '@/components/Search/TabButton.vue';
  import ChipRadio from '@/components/Search/ChipRadio.vue';
  import type {
    MerchantDeliveryMode,
    MerchantPriceRange,
    MerchantType,
  } from '@/stores/merchant/merchant';
  import CircleRadio from '@/components/Search/CircleRadio.vue';
  import ChipCheckbox from '@/components/Search/ChipCheckbox.vue';
  import SearchPriceRange from '@/components/Search/SearchPriceRange.vue';
  import SecondaryButton from '@/components/Buttons/SecondaryButton.vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const searchFilterStore = useSearchFilterStore();

  const generateEmptyFilter = () => ({
    deliveryMode: null,
    sortBy: null,
    distance: searchFilterStore.availableFilters.distance.max,
    categories: [],
    merchantType: null,
    deliveryFee: null,
    onlinePayment: [],
    paymentOnDelivery: [],
    priceRange: null,
  });

  const form = ref<{
    deliveryMode: MerchantDeliveryMode | null;
    sortBy: SortType | null;
    distance: number;
    categories: string[];
    merchantType: MerchantType | null;
    deliveryFee: number | null;
    priceRange: MerchantPriceRange | null;
    onlinePayment: string[];
    paymentOnDelivery: string[];
  }>(generateEmptyFilter());

  const selectedTab = ref(1);

  onMounted(async () => {
    await searchFilterStore.fetch();
  });

  const reset = () => (form.value = generateEmptyFilter());

  const sortByLabelMap: Record<SortType, { icon: Component; label: string }> = {
    PRICE: {
      icon: CurrencyUsdIcon,
      label: 'Preço',
    },
    RATING: {
      icon: StarOutlineIcon,
      label: 'Avaliação',
    },
    DELIVERY_TIME: {
      icon: ClockFastIcon,
      label: 'Tempo de entrega',
    },
    DELIVERY_FEE: {
      icon: RacingHelmetIcon,
      label: 'Taxa de entrega',
    },
    DISTANCE: {
      icon: MapMarkerOutlineIcon,
      label: 'Distância',
    },
  };

  const formattedDistance = computed(() => {
    if (
      form.value.distance === searchFilterStore.availableFilters.distance.max
    ) {
      return `${form.value.distance}km ou mais`;
    }
    return `${form.value.distance}km ou menos`;
  });

  const formatDeliveryFee = (deliveryFeeOption: number) => {
    if (deliveryFeeOption > 0) {
      return `até ${formatToCurrency(deliveryFeeOption)}`;
    }
    return `Grátis`;
  };

  const formatMerchantTypeName = (merchantType: MerchantType) => {
    const map: Record<MerchantType, string> = {
      RESTAURANT: 'Restaurante',
      LIQUOR_STORE: 'Bebiba',
    };

    return map[merchantType];
  };

  const formatMerchantTypeIcon = (merchantType: MerchantType) => {
    const map: Record<MerchantType, Component> = {
      RESTAURANT: SilverwareIcon,
      LIQUOR_STORE: GlassMugVariantIcon,
    };

    return map[merchantType];
  };

  const basicTabChange = computed(() => {
    return (
      form.value.deliveryMode ||
      form.value.sortBy ||
      form.value.distance !== searchFilterStore.availableFilters.distance.max ||
      form.value.deliveryFee !== null
    );
  });

  const categoriesTabChange = computed(() => {
    return form.value.merchantType || form.value.categories.length;
  });

  const paymentsTabChange = computed(() => {
    return (
      form.value.priceRange ||
      form.value.onlinePayment.length ||
      form.value.paymentOnDelivery.length
    );
  });

  const apply = () => {
    router.back();
  };
</script>
<template>
  <ScreenRoot>
    <ScreenHeader>
      <template #left>
        <BackButton />
      </template>
      Filtro
    </ScreenHeader>
    <ScreenLoader v-if="searchFilterStore.loading" />
    <ScreenError v-else-if="searchFilterStore.error" />
    <ScreenMain v-else :with-padding="false">
      <ScreenContent class="!col-span-full">
        <div class="grid grid-cols-3 bg-white sticky top-0 z-10">
          <TabButton :active="selectedTab === 1" @click="selectedTab = 1">
            <span class="relative">
              Básico
              <span
                v-show="basicTabChange"
                class="bg-primary-600 w-1.5 h-1.5 rounded-full absolute top-0 -right-3"
              ></span>
            </span>
          </TabButton>
          <TabButton :active="selectedTab === 2" @click="selectedTab = 2">
            <span class="relative">
              Categorias
              <span
                v-show="categoriesTabChange"
                class="bg-primary-600 w-1.5 h-1.5 rounded-full absolute top-0 -right-3"
              ></span>
            </span>
          </TabButton>
          <TabButton :active="selectedTab === 3" @click="selectedTab = 3">
            <span class="relative">
              Pagamentos
              <span
                v-show="paymentsTabChange"
                class="bg-primary-600 w-1.5 h-1.5 rounded-full absolute top-0 -right-3"
              ></span>
            </span>
          </TabButton>
        </div>
        <Transition name="fade" mode="out-in">
          <div class="w-full" v-if="selectedTab === 1">
            <div class="w-full p-5 flex flex-col gap-4">
              <div class="font-medium text-lg">Modo de entrega</div>
              <div class="flex flex-wrap gap-2">
                <ChipRadio
                  v-model="form.deliveryMode"
                  name="deliveryMode"
                  :value="null"
                >
                  Qualquer um
                </ChipRadio>
                <ChipRadio
                  v-model="form.deliveryMode"
                  name="deliveryMode"
                  value="DELIVERY"
                >
                  Entrega
                </ChipRadio>
                <ChipRadio
                  v-model="form.deliveryMode"
                  name="deliveryMode"
                  value="TAKEOUT"
                >
                  Retirada
                </ChipRadio>
              </div>
            </div>
            <div
              v-if="searchFilterStore.availableFilters.sortBy.length"
              class="p-5 flex flex-col gap-4"
            >
              <div class="font-medium text-lg">Ordernar por</div>
              <div class="grid grid-cols-3 auto-rows-min grid-flow-row gap-4">
                <CircleRadio
                  label="Ordenação padrão"
                  name="sortBy"
                  v-model="form.sortBy"
                  :value="null"
                >
                  <SwapVerticalIcon :size="40" />
                </CircleRadio>
                <CircleRadio
                  v-for="sortOption in searchFilterStore.availableFilters
                    .sortBy"
                  :key="sortOption"
                  :label="sortByLabelMap[sortOption].label"
                  name="sortBy"
                  v-model="form.sortBy"
                  :value="sortOption"
                >
                  <component :is="sortByLabelMap[sortOption].icon" :size="40" />
                </CircleRadio>
              </div>
            </div>
            <div
              v-if="searchFilterStore.availableFilters.distance"
              class="p-5 flex flex-col gap-2"
            >
              <div>
                <div class="font-medium text-lg">Distância</div>
                <div class="text-gray-500">{{ formattedDistance }}</div>
              </div>
              <div>
                <div class="flex justify-between text-gray-500">
                  <span>
                    {{ searchFilterStore.availableFilters.distance.min }}km
                  </span>
                  <span>
                    {{ searchFilterStore.availableFilters.distance.max }}km
                  </span>
                </div>
                <input
                  :value="form.distance"
                  @input="(event: any) => (form.distance = parseInt(event.target.value || 0))"
                  class="w-full accent-primary-600"
                  step="1"
                  type="range"
                  :min="0"
                  :max="100"
                />
              </div>
            </div>
            <div class="p-5 flex flex-col gap-4 mb-5">
              <div class="font-medium text-lg">Taxa de entrega</div>
              <div class="flex flex-wrap gap-2">
                <ChipRadio
                  v-model="form.deliveryFee"
                  name="deliveryFee"
                  :value="null"
                >
                  Qualquer valor
                </ChipRadio>
                <ChipRadio
                  v-for="deliveryFeeOption in searchFilterStore.availableFilters
                    .deliveryFee"
                  :key="deliveryFeeOption"
                  v-model="form.deliveryFee"
                  name="deliveryFee"
                  :value="deliveryFeeOption"
                >
                  {{ formatDeliveryFee(deliveryFeeOption) }}
                </ChipRadio>
              </div>
            </div>
          </div>
          <div class="w-full" v-else-if="selectedTab === 2">
            <div class="p-5 flex flex-col gap-4">
              <div class="font-medium text-lg">Tipo de loja</div>
              <div class="flex flex-wrap gap-2">
                <ChipRadio
                  v-model="form.merchantType"
                  name="merchantType"
                  :value="null"
                >
                  <StoreIcon :size="20" />
                  <span>Todos os estabelecimentos</span>
                </ChipRadio>
                <ChipRadio
                  v-for="merchantType in searchFilterStore.availableFilters
                    .merchantType"
                  :key="merchantType"
                  v-model="form.merchantType"
                  name="merchantType"
                  :value="merchantType"
                >
                  <component
                    :is="formatMerchantTypeIcon(merchantType)"
                    :size="20"
                  />
                  <span>{{ formatMerchantTypeName(merchantType) }}</span>
                </ChipRadio>
              </div>
            </div>
            <div class="p-5 flex flex-col gap-4 mb-5">
              <div class="font-medium text-lg">Categorias</div>
              <div class="flex flex-wrap gap-2">
                <ChipCheckbox
                  v-for="category in searchFilterStore.availableFilters
                    .categories"
                  :key="category.id"
                  v-model="form.categories"
                  name="deliveryFee"
                  :value="category.id"
                >
                  {{ category.name }}
                </ChipCheckbox>
              </div>
            </div>
          </div>
          <div class="w-full" v-else-if="selectedTab === 3">
            <div class="p-5 flex flex-col gap-4">
              <div class="font-medium text-lg">Preço médio</div>
              <div class="flex flex-wrap gap-2">
                <ChipRadio
                  v-model="form.priceRange"
                  name="priceRange"
                  :value="null"
                >
                  <span>Qualquer um</span>
                </ChipRadio>
                <ChipRadio
                  v-for="priceRange in searchFilterStore.availableFilters
                    .priceRange"
                  :key="priceRange"
                  v-model="form.priceRange"
                  name="priceRange"
                  :value="priceRange"
                >
                  <SearchPriceRange :price-range="priceRange" />
                </ChipRadio>
              </div>
            </div>
            <div class="p-5 flex flex-col gap-4">
              <div class="font-medium text-lg">Pagamento pelo app</div>
              <div class="flex flex-wrap gap-2">
                <ChipCheckbox
                  v-for="payment in searchFilterStore.availableFilters
                    .onlinePayment"
                  :key="payment.id"
                  v-model="form.onlinePayment"
                  name="onlinePayment"
                  :value="payment.id"
                >
                  {{ payment.name }}
                </ChipCheckbox>
              </div>
            </div>
            <div class="p-5 flex flex-col gap-4 mb-5">
              <div class="font-medium text-lg">Pagamento na entrega</div>
              <div class="flex flex-wrap gap-2">
                <ChipCheckbox
                  v-for="payment in searchFilterStore.availableFilters
                    .paymentOnDelivery"
                  :key="payment.id"
                  v-model="form.paymentOnDelivery"
                  name="paymentOnDelivery"
                  :value="payment.id"
                >
                  {{ payment.name }}
                </ChipCheckbox>
              </div>
            </div>
          </div>
        </Transition>
      </ScreenContent>
    </ScreenMain>
    <ScreenFooter>
      <SecondaryButton @click="reset" full class="mb-4">
        <template #left>
          <EraserVariantIcon />
        </template>
        Limpar
      </SecondaryButton>
      <PrimaryButton @click="apply" full>
        Ver resultados
        <template #right>
          <CheckIcon />
        </template>
      </PrimaryButton>
    </ScreenFooter>
  </ScreenRoot>
</template>

<style scoped></style>
