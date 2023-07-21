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

  const centerCoordinates = {
    lat: -18.913878,
    lng: -48.213595,
  };

  // Note: This example requires that you consent to location sharing when
  // prompted by your browser. If you see the error "The Geolocation service
  // failed.", it means you probably did not give permission for the browser to
  // locate you.
  let map: google.maps.Map;
  // let infoWindow: google.maps.InfoWindow;

  const defaultZoom = 17;

  function initMap(): void {
    map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: centerCoordinates,
      zoom: defaultZoom,
      zoomControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      gestureHandling: 'greedy',
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

    function circleContainsLocation(point: any, circle: any) {
      var radius = circle.getRadius();
      var center = circle.getCenter();
      return (
        google.maps.geometry.spherical.computeDistanceBetween(point, center) <=
        radius
      );
    }

    const locationCenter = new google.maps.Circle({
      strokeColor: '#7d3af2',
      strokeOpacity: 0.2,
      strokeWeight: 2,
      fillColor: '#7d3af2',
      fillOpacity: 0.05,
      map,
      center: centerCoordinates,
      radius: 200,
    });

    // const locationButton = document.createElement('button');
    // locationButton.textContent = 'Pan to Current Location';
    // locationButton.classList.add('custom-map-control-button');
    // map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    // locationButton.addEventListener('click', () => {
    //   goToCurrentLocation();
    // });

    map.addListener('center_changed', () => {
      idle.value = false;
    });

    map.addListener('idle', () => {
      idle.value = true;
      const coordinates = map.getCenter();

      form.coordinates = {
        latitude: coordinates?.lat() || 0,
        longitude: coordinates?.lng() || 0,
      };

      if (!circleContainsLocation(coordinates, locationCenter)) {
        distanceError.value = true;
        clearTimeout(distanceErrorTimeoutId);
        distanceErrorTimeoutId = setTimeout(() => {
          distanceError.value = false;
        }, 5000);
        map.setCenter(centerCoordinates);
        map.setZoom(defaultZoom);
      }
    });
  }

  // const goToCurrentLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position: GeolocationPosition) => {
  //         const pos = {
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         };
  //
  //         infoWindow.setPosition(pos);
  //         infoWindow.setContent('Location found.');
  //         infoWindow.open(map);
  //         map.setCenter(pos);
  //       },
  //       () => {
  //         handleLocationError(true, infoWindow, map.getCenter()!);
  //       },
  //       {
  //         enableHighAccuracy: true,
  //       },
  //     );
  //   } else {
  //     // Browser doesn't support Geolocation
  //     handleLocationError(false, infoWindow, map.getCenter()!);
  //   }
  // };

  // function handleLocationError(
  //   browserHasGeolocation: boolean,
  //   infoWindow: google.maps.InfoWindow,
  //   pos: google.maps.LatLng,
  // ) {
  //   infoWindow.setPosition(pos);
  //   infoWindow.setContent(
  //     browserHasGeolocation
  //       ? 'Error: The Geolocation service failed.'
  //       : "Error: Your browser doesn't support geolocation.",
  //   );
  //   infoWindow.open(map);
  // }

  declare global {
    interface Window {
      initMap: () => void;
    }
  }
  window.initMap = initMap;

  const distanceError = ref(false);
  let distanceErrorTimeoutId: any = 0;
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
    <ScreenMain class="relative w-full h-full" :with-padding="false">
      <Transition name="fade">
        <div
          v-if="distanceError"
          class="w-full z-10 bg-danger-600 font-semibold text-white px-5 py-4 absolute top-0"
        >
          Você informou um local muito longe do endereço selecionado.
        </div>
      </Transition>
      <div class="marker">
        <Transition name="fade">
          <div
            v-if="idle"
            class="w-56 absolute bottom-0 mb-14 p-4 rounded-lg bg-white shadow text-center flex flex-col"
          >
            <span class="font-semibold">Você está aqui?</span>
            <span class="text-sm text-gray-600"
              >Ajuste para a localização exata</span
            >
          </div>
        </Transition>
        <MapMarkerIcon
          class="marker-icon absolute bottom-0"
          :class="{
            'text-gray-800 opacity-50 bottom-2': !idle,
            'text-purple-600': idle,
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
    transform: translateX(-50%);
  }

  .marker-shadow {
    @apply w-3 h-1 bg-gray-500 opacity-50;
    border-radius: 100%;
  }
</style>
