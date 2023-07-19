<script setup lang="ts">
  import { markRaw, onMounted, ref } from 'vue';
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import PencilOutlineIcon from 'vue-material-design-icons/PencilOutline.vue';
  import CheckIcon from 'vue-material-design-icons/Check.vue';
  import PlusIcon from 'vue-material-design-icons/Plus.vue';
  import DeleteOutlineIcon from 'vue-material-design-icons/DeleteOutline.vue';
  import { useCustomerAddressStore } from '@/stores/address';
  import type { Address } from '@/stores/address';
  import { useRouter } from 'vue-router';
  import BackButton from '@/components/BackButton.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import ScreenFooter from '@/components/Screen/ScreenFooter.vue';
  import PrimaryButton from '@/components/PrimaryButton.vue';
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

  const deleteAddress = (address: Address) => {
    const drawer = drawersControlStore.add(markRaw(DeleteAddressScreen), {
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
              class="p-4 rounded-lg border flex items-center gap-4"
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
              <div class="inline-flex gap-2">
                <IconButton
                  class="text-red-600"
                  @click="() => deleteAddress(address)"
                >
                  <DeleteOutlineIcon :size="16" />
                </IconButton>
                <IconButton @click="() => editAddress(address)">
                  <PencilOutlineIcon :size="16" />
                </IconButton>
              </div>
            </div>
            <SecondaryButton @click="addAddress">
              <template #left>
                <PlusIcon />
              </template>
              Adicionar endereço
            </SecondaryButton>
          </div>
        </ScreenContent>
      </ScreenMain>
      <ScreenFooter>
        <PrimaryButton @click="saveAndClose">
          Salvar
          <template #right>
            <CheckIcon />
          </template>
        </PrimaryButton>
      </ScreenFooter>
    </template>
  </ScreenRoot>
</template>

<style scoped></style>
