<script setup lang="ts">
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import BackButton from '@/components/BackButton.vue';
  import ScreenFooter from '@/components/Screen/ScreenFooter.vue';
  import CrosshairsGpsIcon from 'vue-material-design-icons/CrosshairsGps.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import { useRouter } from 'vue-router';
  import { markRaw, onMounted, ref } from 'vue';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';
  import FloatingAlert from '@/components/FloatingAlert.vue';
  import SecondaryButton from '@/components/Buttons/SecondaryButton.vue';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import MapAddressSelectionScreen from '@/components/Address/MapAddressSelectionScreen.vue';

  export type LocalizationPermissionType = 'denied' | 'granted' | 'prompt';

  const props = defineProps<{
    added: Function;
  }>();

  const router = useRouter();

  const back = () => {
    router.back();
  };

  const drawersControlStore = useDrawersControlStore();

  const showMapAddressSelection = (coordinates: {
    lat: number;
    lng: number;
  }) => {
    const drawer = drawersControlStore.add(markRaw(MapAddressSelectionScreen), {
      added: () => {
        back();
        props.added();
      },
      coordinates,
    });
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
      console.log({ position });
      showMapAddressSelection({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
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

  onMounted(() => {});
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
      </ScreenContent>
    </ScreenMain>
    <ScreenFooter>
      <SecondaryButton
        @click="loadCurrentPosition"
        :loading="loadingLocation"
        class="w-full"
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
