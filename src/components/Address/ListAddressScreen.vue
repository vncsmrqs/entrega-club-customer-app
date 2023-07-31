<script setup lang="ts">
  import { markRaw, onMounted } from 'vue';
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue';
  import CheckIcon from 'vue-material-design-icons/Check.vue';
  import PlusIcon from 'vue-material-design-icons/Plus.vue';
  import { useCustomerAddressStore } from '@/stores/address/customer-address-list';
  import type { Address } from '@/stores/address/customer-address-list';
  import { useRouter } from 'vue-router';
  import BackButton from '@/components/BackButton.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import ScreenFooter from '@/components/Screen/ScreenFooter.vue';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';
  import ScreenLoader from '@/components/Screen/ScreenLoader.vue';
  import ScreenError from '@/components/Screen/ScreenError.vue';
  import SecondaryButton from '@/components/Buttons/SecondaryButton.vue';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import AddAddressScreen from '@/components/Address/AddAddressScreen.vue';
  import IconButton from '@/components/IconButton.vue';
  import EditAddressScreen from '@/components/Address/ViewAddressScreen.vue';
  import { useSelectedAddressStore } from '@/stores/address/selected-address';
  import ListAddressEmpty from '@/components/Address/ListAddressEmpty.vue';
  import MapMarkerOutlineIcon from 'vue-material-design-icons/MapMarkerOutline.vue';

  const customerAddressStore = useCustomerAddressStore();
  const selectedAddressStore = useSelectedAddressStore();
  const drawersControlStore = useDrawersControlStore();

  const props = withDefaults(
    defineProps<{
      showBackButton?: boolean;
      selected?: Function;
    }>(),
    {
      showBackButton: true,
    },
  );

  const router = useRouter();

  onMounted(async () => {
    await customerAddressStore.load();
    if (!customerAddressStore.customerAddressList.length) {
      addAddress();
    }
  });

  const addAddress = () => {
    const drawer = drawersControlStore.add(markRaw(AddAddressScreen), {
      added: () => onSelected(),
    });
    router.push({ hash: `#${drawer.id}` });
  };

  const editAddress = (address: Address) => {
    const drawer = drawersControlStore.add(markRaw(EditAddressScreen), {
      address,
      saved: () => {},
    });
    router.push({ hash: `#${drawer.id}` });
  };

  const back = () => {
    router.back();
  };

  const isSelected = (address: Address) => {
    return selectedAddressStore.selectedAddress?.id === address.id;
  };

  const onSelected = () => {
    setTimeout(() => {
      if (props.selected) {
        props.selected();
        return;
      }
      back();
    }, 500);
  };

  const selectAddress = (address: Address) => {
    selectedAddressStore.selectAddress(address);
    onSelected();
  };
</script>

<template>
  <ScreenRoot>
    <ScreenHeader>
      <template v-if="props.showBackButton" #left>
        <BackButton></BackButton>
      </template>
      Endereço de entrega
    </ScreenHeader>
    <ScreenLoader v-if="customerAddressStore.loading" />
    <ScreenError v-else-if="customerAddressStore.error" />
    <template v-else>
      <ScreenMain>
        <ScreenContent class="!col-span-full">
          <template
            v-if="!customerAddressStore.sortedCustomerAddressList.length"
          >
            <ListAddressEmpty />
          </template>
          <template v-else>
            <div class="flex flex-col gap-4 relative">
              <TransitionGroup name="list">
                <div
                  v-for="address in customerAddressStore.sortedCustomerAddressList"
                  :key="address.id"
                  class="p-4 flex items-center gap-4 border rounded-xl cursor-pointer transition-colors"
                  :class="{ 'border-primary-600': isSelected(address) }"
                  @click="() => selectAddress(address)"
                >
                  <CheckIcon
                    class="text-primary-600"
                    v-show="isSelected(address)"
                  ></CheckIcon>
                  <MapMarkerOutlineIcon
                    class="text-gray-500"
                    v-show="!isSelected(address)"
                  />
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
                    <IconButton @click.stop="() => editAddress(address)">
                      <ChevronRightIcon />
                    </IconButton>
                  </div>
                </div>
              </TransitionGroup>
            </div>
          </template>
        </ScreenContent>
      </ScreenMain>
      <ScreenFooter>
        <SecondaryButton @click="addAddress" full>
          Adicionar endereço
          <template #left>
            <PlusIcon />
          </template>
        </SecondaryButton>
      </ScreenFooter>
    </template>
  </ScreenRoot>
</template>

<style scoped></style>
