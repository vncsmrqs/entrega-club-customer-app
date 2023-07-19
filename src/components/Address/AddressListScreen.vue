<script setup lang="ts">
  import { markRaw, onMounted, ref } from 'vue';
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue';
  import PlusIcon from 'vue-material-design-icons/Plus.vue';
  import { useCustomerAddressStore } from '@/stores/address';
  import type { Address } from '@/stores/address';
  import { useRouter } from 'vue-router';
  import BackButton from '@/components/BackButton.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import ScreenFooter from '@/components/Screen/ScreenFooter.vue';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';
  import ScreenLoader from '@/components/Screen/ScreenLoader.vue';
  import ScreenError from '@/components/Screen/ScreenError.vue';
  import SecondaryButton from '@/components/SecondaryButton.vue';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import AddAddressScreen from '@/components/Address/AddAddressScreen.vue';
  import IconButton from '@/components/IconButton.vue';
  import DeleteAddressScreen from '@/components/Address/DeleteAddressScreen.vue';
  import EditAddressScreen from '@/components/Address/EditAddressScreen.vue';

  const customerAddressStore = useCustomerAddressStore();

  const router = useRouter();

  onMounted(async () => {
    await customerAddressStore.loadCustomerAddresses();
  });

  const drawersControlStore = useDrawersControlStore();

  const addAddress = () => {
    const drawer = drawersControlStore.add(markRaw(AddAddressScreen), {});
    router.push({ hash: `#${drawer.id}` });
  };

  const editAddress = (address: Address) => {
    const drawer = drawersControlStore.add(markRaw(EditAddressScreen), {
      address,
    });
    router.push({ hash: `#${drawer.id}` });
  };

  const hide = () => {
    router.back();
  };

  const selectedAddress = ref(customerAddressStore.selectedAddress);

  const isSelected = (address: Address) => {
    return selectedAddress.value?.id === address.id;
  };

  const selectAddress = (address: Address) => {
    selectedAddress.value = address;
    setTimeout(() => {
      saveAndClose();
    }, 200);
  };

  const saveAndClose = () => {
    if (selectedAddress.value) {
      customerAddressStore.selectAddress(selectedAddress.value);
    }
    hide();
  };
</script>

<template>
  <ScreenRoot>
    <ScreenHeader>
      <template #left>
        <BackButton></BackButton>
      </template>
      Endereço
    </ScreenHeader>
    <ScreenLoader v-if="customerAddressStore.loading" />
    <ScreenError v-else-if="customerAddressStore.error" />
    <template v-else>
      <ScreenMain>
        <ScreenContent>
          <div class="flex flex-col gap-4">
            <div
              v-for="address in customerAddressStore.availableAddressList"
              :key="address.id"
              class="p-4 flex items-center gap-4 border rounded-xl cursor-pointer transition-colors"
              :class="{ 'border-red-600': isSelected(address) }"
              @click="() => selectAddress(address)"
            >
              <input
                class="text-red-600 ring-0"
                v-model="selectedAddress"
                type="radio"
                :value="address"
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
          </div>
        </ScreenContent>
      </ScreenMain>
      <ScreenFooter>
        <SecondaryButton @click="addAddress">
          <template #left>
            <PlusIcon />
          </template>
          Adicionar endereço
        </SecondaryButton>
      </ScreenFooter>
    </template>
  </ScreenRoot>
</template>

<style scoped></style>
