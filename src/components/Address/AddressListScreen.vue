<script setup lang="ts">
  import { markRaw, onMounted } from 'vue';
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue';
  import CheckIcon from 'vue-material-design-icons/Check.vue';
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
  import EditAddressScreen from '@/components/Address/EditAddressScreen.vue';

  const customerAddressStore = useCustomerAddressStore();

  const router = useRouter();

  onMounted(async () => {
    await customerAddressStore.loadCustomerAddresses();
  });

  const drawersControlStore = useDrawersControlStore();

  const addAddress = () => {
    const drawer = drawersControlStore.add(markRaw(AddAddressScreen), {
      added: async () => back(),
    });
    router.push({ hash: `#${drawer.id}` });
  };

  const editAddress = (address: Address) => {
    const drawer = drawersControlStore.add(markRaw(EditAddressScreen), {
      address,
    });
    router.push({ hash: `#${drawer.id}` });
  };

  const back = () => {
    router.back();
  };

  const isSelected = (address: Address) => {
    return customerAddressStore.selectedAddress?.id === address.id;
  };

  const selectAddress = (address: Address) => {
    customerAddressStore.selectAddress(address);
    setTimeout(() => {
      back();
    }, 500);
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
          <div class="flex flex-col gap-4 relative">
            <TransitionGroup name="list">
              <div
                v-for="address in customerAddressStore.availableAddressList"
                :key="address.id"
                class="p-4 flex items-center gap-4 border rounded-xl cursor-pointer transition-colors"
                :class="{ 'border-purple-600': isSelected(address) }"
                @click="() => selectAddress(address)"
              >
                <CheckIcon
                  class="text-primary-600"
                  v-if="isSelected(address)"
                ></CheckIcon>
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
