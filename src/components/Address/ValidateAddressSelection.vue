<script setup lang="ts">
  import RightDrawer from '@/components/RightDrawer.vue';
  import { computed, onMounted, ref } from 'vue';
  import ListAddressScreen from '@/components/Address/ListAddressScreen.vue';
  import { useSelectedAddressStore } from '@/stores/selected-address';
  import { useRouter } from 'vue-router';

  const props = defineProps<{ show: boolean }>();
  const emit = defineEmits(['update:show']);

  const showInternal = computed({
    get() {
      return props.show;
    },
    set(value: boolean): void {
      emit('update:show', value);
    },
  });

  const beforeBackdropClose = () => false;

  const hide = () => alert('hide::ValidateAddressSelection');

  const selectedAddressStore = useSelectedAddressStore();

  const router = useRouter();

  onMounted(async () => {
    await selectedAddressStore.loadCurrentAddress();
    if (!selectedAddressStore.selectedAddress) {
      showFixedAddressScreen();
    }
  });

  const showFixedAddressScreen = () => {
    showInternal.value = true;
  };

  const hideFixedAddressScreen = () => {
    showInternal.value = false;
  };

  router.beforeEach(() => {
    if (!selectedAddressStore.selectedAddress) {
      showFixedAddressScreen();
      return;
    }
    hideFixedAddressScreen();
  });
</script>

<template>
  <RightDrawer
    :show="showInternal"
    :before-backdrop-close="beforeBackdropClose"
    @hide="hide"
    :index="0"
  >
    <ListAddressScreen
      v-if="showInternal"
      :show-back-button="false"
      :selected="hideFixedAddressScreen"
    />
  </RightDrawer>
</template>

<style scoped></style>
