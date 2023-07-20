<script setup lang="ts">
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import BackButton from '@/components/BackButton.vue';
  import ScreenFooter from '@/components/Screen/ScreenFooter.vue';
  import PrimaryButton from '@/components/PrimaryButton.vue';
  import CheckIcon from 'vue-material-design-icons/Check.vue';
  import MapMarkerIcon from 'vue-material-design-icons/MapMarker.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import { useRouter } from 'vue-router';
  import { useCustomerAddressStore } from '@/stores/address';
  import type { Address } from '@/stores/address';
  import { onMounted, reactive, ref } from 'vue';
  import { generateId } from '@/utils';

  const props = defineProps<{
    added: Function;
  }>();

  const customerAddressStore = useCustomerAddressStore();

  const form: Address = reactive({
    id: generateId(),
    city: 'Jaíba',
    country: 'BR',
    neighborhood: 'Veredas',
    state: 'MG',
    streetName: 'Rua Geraldo Paixão Oliveira',
    streetNumber: '164',
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
    reference: 'Na rua do Atacadão Outro Verde',
    complement: 'Casa',
  });

  const confirmAdd = async () => {
    const address = await customerAddressStore.addAddress(form);
    props.added(address);
    back();
    await customerAddressStore.loadCustomerAddresses();
    await customerAddressStore.selectAddress(address);
  };

  const router = useRouter();

  const back = () => {
    router.back();
  };

  const idle = ref(true);

  // Note: This example requires that you consent to location sharing when
  // prompted by your browser. If you see the error "The Geolocation service
  // failed.", it means you probably did not give permission for the browser to
  // locate you.
  let map: google.maps.Map;
  let infoWindow: google.maps.InfoWindow;

  function initMap(): void {
    map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: {
        lat: -18.913878,
        lng: -48.213595,
      },
      zoom: 16,
      zoomControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      styles: [
        {
          featureType: 'landscape.man_made',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#eceeef',
            },
          ],
        },
        {
          featureType: 'poi',
          stylers: [
            {
              color: '#bababa',
            },
          ],
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.stroke',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#eceeef',
            },
            {
              weight: 0.5,
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.stroke',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
      ],
    });
    infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement('button');

    locationButton.textContent = 'Pan to Current Location';
    locationButton.classList.add('custom-map-control-button');

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

    // let i = 0;
    // map.addListener('center_changed', () => {
    //   console.log('mudou ' + i++);
    // });

    map.addListener('dragstart', () => {
      idle.value = false;
    });

    map.addListener('dragend', () => {
      idle.value = true;
      const coordinates = map.getCenter();
      form.coordinates = {
        latitude: coordinates?.lat() || 0,
        longitude: coordinates?.lng() || 0,
      };
      console.log(form.coordinates);
    });

    locationButton.addEventListener('click', () => {
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter()!);
          },
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter()!);
      }
    });
  }

  function handleLocationError(
    browserHasGeolocation: boolean,
    infoWindow: google.maps.InfoWindow,
    pos: google.maps.LatLng,
  ) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? 'Error: The Geolocation service failed.'
        : "Error: Your browser doesn't support geolocation.",
    );
    infoWindow.open(map);
  }

  declare global {
    interface Window {
      initMap: () => void;
    }
  }
  window.initMap = initMap;

  onMounted(() => {
    initMap();
  });
</script>

<template>
  <ScreenRoot>
    <ScreenHeader>
      <template #left>
        <BackButton></BackButton>
      </template>
      Adicionar endereço
    </ScreenHeader>
    <ScreenMain class="p-0 relative w-full h-full">
      <div class="marker">
        <MapMarkerIcon
          class="marker-icon absolute bottom-0"
          :class="{
            'text-gray-800 bottom-2': !idle,
            'text-red-600': idle,
          }"
          :size="48"
        ></MapMarkerIcon>
        <div class="marker-shadow"></div>
      </div>
      <div id="map"></div>
    </ScreenMain>
    <ScreenFooter>
      <PrimaryButton @click="confirmAdd">
        Salvar
        <template #right>
          <CheckIcon />
        </template>
      </PrimaryButton>
    </ScreenFooter>
  </ScreenRoot>
</template>

<style>
  #map {
    width: 100%;
    height: 100%;
  }

  .gm-style-cc {
    display: none;
  }

  .marker {
    @apply flex flex-col items-center absolute z-10 pointer-events-none;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-100%);
  }

  .marker-shadow {
    @apply w-3 h-1 bg-gray-500 opacity-50;
    border-radius: 100%;
  }
</style>
