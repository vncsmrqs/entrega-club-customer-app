<script setup lang="ts">
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import BackButton from '@/components/BackButton.vue';
  import ScreenFooter from '@/components/Screen/ScreenFooter.vue';
  import CheckIcon from 'vue-material-design-icons/Check.vue';
  import CrosshairsGpsIcon from 'vue-material-design-icons/CrosshairsGps.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import { useRouter } from 'vue-router';
  import { markRaw, onMounted, ref } from 'vue';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';
  import FloatingAlert from '@/components/FloatingAlert.vue';
  import SecondaryButton from '@/components/Buttons/SecondaryButton.vue';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import MapAddressSelectionScreen from '@/components/Address/MapAddressSelectionScreen.vue';
  import AccordionItem from '@/components/AccordionItem.vue';
  import MapMarkerOutlineIcon from 'vue-material-design-icons/MapMarkerOutline.vue';
  import SearchInput from '@/components/SearchInput.vue';
  import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue';
  import IconButton from '@/components/IconButton.vue';
  import type { Address } from '@/stores/customer-address-list';
  import {
    addressFixtureFunc,
    generateEmptyAddressFunc,
  } from '@/stores/customer-address-list';
  import { timeout } from '@/utils';

  export type LocalizationPermissionType = 'denied' | 'granted' | 'prompt';

  const props = defineProps<{
    added: Function;
  }>();

  const router = useRouter();

  const back = () => {
    router.back();
  };

  const drawersControlStore = useDrawersControlStore();

  const showMapAddressSelection = async (address: Address) => {
    const drawer = drawersControlStore.add(markRaw(MapAddressSelectionScreen), {
      saved: () => {
        back();
        props.added();
      },
      address,
    });

    await timeout(300);
    router.push({ hash: `#${drawer.id}` });
  };

  const localizationPermission = ref<LocalizationPermissionType | null>(null);

  const loadLocalizationPermission = async (): Promise<void> => {
    const result = await navigator.permissions.query({ name: 'geolocation' });
    result.addEventListener('change', () => {
      localizationPermission.value = result.state;
    });
  };

  const loadCurrentPosition = async () => {
    if (loadingLocation.value) {
      return;
    }

    if (!navigator.geolocation) {
      deviceDontSupportGeolocation();
      return;
    }

    if (!localizationPermission.value) {
      await loadLocalizationPermission();
    }

    if (localizationPermission.value === 'denied') {
      geolocationPermissionDenied();
      return;
    }

    const locationSuccess = (position: GeolocationPosition) => {
      loadingLocation.value = false;

      showMapAddressSelection({
        ...generateEmptyAddressFunc(),
        coordinates: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      });

      alert('Sucesso ao pegar localização!');
    };

    const locationFailure = (positionError: GeolocationPositionError) => {
      loadingLocation.value = false;
      loadingLocationFailure();
      console.log({ positionError });
    };

    loadingLocation.value = true;

    navigator.geolocation.getCurrentPosition(locationSuccess, locationFailure, {
      enableHighAccuracy: true,
    });
  };

  const deviceDontSupportGeolocation = () => {
    alert('Dispositivo não suporta localização');
  };

  const geolocationPermissionDenied = () => {
    alert('Permissão negada para acessar a localização');
  };

  const loadingLocationFailure = () => {
    if (localizationPermission.value === 'denied') {
      geolocationPermissionDenied();
      return;
    }
    alert('Falha ao acessar a localização');
  };

  const loadingLocation = ref(false);

  const error = ref(false);
  let errorTimeout: any = 0;

  const showIcon = ref(true);

  const addressList = ref<Address[]>([]);

  const selectAddress = async (address: Address) => {
    selectedAddress.value = address;
    showMapAddressSelection(address);
  };

  onMounted(() => {});

  const searchValue = ref('');

  const inputSearch = (value: string) => {
    searchValue.value = value;

    if (!searchValue.value.length) {
      addressList.value = [];
      return;
    }

    if (addressList.value?.[searchValue.value.length]) {
      addressList.value.splice(searchValue.value.length, 1);
      return;
    }

    addressList.value.push(addressFixtureFunc(searchValue.value.length));
  };

  const toggleFocus = (value: boolean) => {
    if (searchValue.value.length) {
      showIcon.value = false;
      return;
    }
    showIcon.value = value;
  };

  const selectedAddress = ref<Address | null>(null);

  const isSelected = (address: Address) => {
    return address.id === selectedAddress.value?.id;
  };

  const submitSearch = (event: Event) => {
    console.log('SubmitEvent', event);
  };
</script>

<template>
  <ScreenRoot>
    <ScreenHeader>
      <template #left>
        <BackButton></BackButton>
      </template>
      Adicionar endereço
    </ScreenHeader>
    <ScreenMain class="relative" :with-padding="false">
      <ScreenContent class="!col-span-full">
        <FloatingAlert :show="error"> Algum erro encontrado.</FloatingAlert>
        <AccordionItem :opened="showIcon">
          <div class="w-full flex flex-col gap-5 p-5 items-center">
            <div
              class="w-32 h-32 rounded-full bg-gray-100 text-primary-600 flex justify-center items-center"
            >
              <MapMarkerOutlineIcon :size="64" />
            </div>
            <div class="text-center">
              <div class="font-medium text-xl">
                Onde você quer receber seu pedido?
              </div>
              <div class="text-gray-500 text-sm mt-2">
                Informe seu endereço para validar a disponibilidade e cobertura
                na sua região.
              </div>
            </div>
          </div>
        </AccordionItem>
        <form
          class="sticky top-0 left-0 bg-white px-5 py-4 z-10"
          :class="{ 'border-b': !showIcon }"
          @submit.prevent.stop="submitSearch"
        >
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >Search</label
          >
          <SearchInput
            :model-value="searchValue"
            @update:model-value="inputSearch"
            @focus="() => toggleFocus(false)"
            @blur="() => toggleFocus(true)"
            placeholder="ex: Avenida Paulista, 156"
          />
          <div v-show="!showIcon" class="flex justify-end mt-4">
            <img src="/powered-by-google.svg" alt="Powered by Google Image" />
          </div>
        </form>
        <div class="w-full flex flex-col p-5 gap-4 relative">
          <TransitionGroup name="list">
            <div
              v-for="address in addressList"
              :key="address.id"
              class="w-full p-4 flex items-center gap-4 border rounded-xl cursor-pointer transition-colors"
              :class="{ 'border-primary-600': isSelected(address) }"
              @click="() => selectAddress(address)"
            >
              <CheckIcon
                class="text-primary-600"
                v-show="isSelected(address)"
              />
              <MapMarkerOutlineIcon v-show="!isSelected(address)" />
              <div class="flex-1">
                <div class="text-gray-700">
                  {{ address.streetName }}, {{ address.streetNumber }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ address.neighborhood }}, {{ address.city }} -
                  {{ address.state }}
                </div>
              </div>
              <div class="inline-flex flex-col gap-2">
                <IconButton>
                  <ChevronRightIcon />
                </IconButton>
              </div>
            </div>
          </TransitionGroup>
        </div>
      </ScreenContent>
    </ScreenMain>
    <ScreenFooter>
      <SecondaryButton
        @click="loadCurrentPosition"
        :loading="loadingLocation"
        full
      >
        Usar localização atual
        <template #left>
          <CrosshairsGpsIcon />
        </template>
      </SecondaryButton>
    </ScreenFooter>
  </ScreenRoot>
</template>

<style></style>
