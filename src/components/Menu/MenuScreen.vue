<script setup lang="ts">
  import ChatOutlineIcon from 'vue-material-design-icons/ChatOutline.vue';
  import MapMarkerOutlineIcon from 'vue-material-design-icons/MapMarkerOutline.vue';
  import HeartOutlineIcon from 'vue-material-design-icons/HeartOutline.vue';
  import HelpIcon from 'vue-material-design-icons/Help.vue';
  import CreditCardOutlineIcon from 'vue-material-design-icons/CreditCardOutline.vue';
  import CogOutlineIcon from 'vue-material-design-icons/CogOutline.vue';
  import ExitToAppIcon from 'vue-material-design-icons/ExitToApp.vue';
  import BellOutlineIcon from 'vue-material-design-icons/BellOutline.vue';
  import TextBoxOutlineIcon from 'vue-material-design-icons/TextBoxOutline.vue';
  import ListItem from '@/components/ListItem.vue';
  import { computed, markRaw, ref } from 'vue';
  import { version } from '../../../package.json';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import AddressSelection from '@/components/Address/ListAddressScreen.vue';
  import { useRouter } from 'vue-router';
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import ScreenFooter from '@/components/Screen/ScreenFooter.vue';
  import BackButton from '@/components/BackButton.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';
  import NotificationScreen from '@/components/Notification/NotificationScreen.vue';
  import { useDrawerNavigation } from '@/composables/useDrawerNavigation';
  import { useAuthStore } from '@/stores/auth';
  import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
  import SecondaryButton from '@/components/Buttons/SecondaryButton.vue';

  const authStore = useAuthStore();
  const drawersControlStore = useDrawersControlStore();
  const drawerNavigation = useDrawerNavigation();
  const router = useRouter();

  const navigateToAddressScreen = () => {
    const drawer = drawersControlStore.add(markRaw(AddressSelection), {});
    drawerNavigation.openDrawer(drawer.id);
  };

  const navigateToNotificationScreen = () => {
    const drawer = drawersControlStore.add(markRaw(NotificationScreen), {});
    drawerNavigation.openDrawer(drawer.id);
  };

  const navigateToOrderScreen = async () => {
    await router.push({ name: `orders`, replace: true });
  };

  const navigateToLogoutScreen = async () => {
    await router.push({ name: `logout`, replace: true });
  };

  const navigateToPaymentScreen = async () => {
    await router.push({ name: `payments`, replace: true });
  };

  const appVersion = ref(version);

  const title = computed(() => {
    if (authStore.isLogged) {
      return authStore.account.name;
    }

    return 'Menu';
  });
</script>

<template>
  <ScreenRoot>
    <ScreenHeader>
      {{ title }}
      <template #left>
        <BackButton />
      </template>
    </ScreenHeader>
    <ScreenMain :with-padding="false">
      <ScreenContent class="!col-span-full">
        <div class="p-5">
          <div
            class="p-4 border rounded-lg flex items-center gap-4 justify-between"
          >
            <div>
              <div class="p-3 bg-primary-100 text-primary-600 rounded-2xl">
                <BellOutlineIcon />
              </div>
            </div>
            <div>
              <p class="font-bold">Ative as notificações</p>
              <p class="text-xs text-gray-600">
                Acompanhe de perto o andamento dos seus pedidos, promoções e
                novidades.
              </p>
            </div>
            <SecondaryButton small>Ativar</SecondaryButton>
          </div>
        </div>
        <ListItem
          v-if="authStore.isLogged"
          @click="navigateToNotificationScreen"
          :disabled="!authStore.isLogged"
        >
          <template #icon>
            <BellOutlineIcon />
          </template>
          <template #default>Notificações</template>
        </ListItem>
        <ListItem @click="navigateToAddressScreen">
          <template #icon>
            <MapMarkerOutlineIcon></MapMarkerOutlineIcon>
          </template>
          <template #default>Endereços</template>
        </ListItem>
        <ListItem
          v-if="authStore.isLogged"
          @click="navigateToOrderScreen"
          :disabled="!authStore.isLogged"
        >
          <template #icon>
            <TextBoxOutlineIcon></TextBoxOutlineIcon>
          </template>
          <template #default>Pedidos</template>
        </ListItem>
        <ListItem
          v-if="authStore.isLogged"
          @click="navigateToPaymentScreen"
          :disabled="!authStore.isLogged"
        >
          <template #icon>
            <CreditCardOutlineIcon></CreditCardOutlineIcon>
          </template>
          <template #default>Pagamento</template>
        </ListItem>
        <ListItem v-if="authStore.isLogged" :disabled="true">
          <template #icon>
            <ChatOutlineIcon></ChatOutlineIcon>
          </template>
          <template #default>Chats</template>
          <template #subtitle>Suas conversas com os estabelecimentos</template>
        </ListItem>
        <ListItem v-if="authStore.isLogged" :disabled="true">
          <template #icon>
            <HeartOutlineIcon></HeartOutlineIcon>
          </template>
          <template #default>Favoritos</template>
        </ListItem>
        <ListItem :disabled="true">
          <template #icon>
            <HelpIcon></HelpIcon>
          </template>
          <template #default>Ajuda</template>
        </ListItem>
        <ListItem v-if="authStore.isLogged" :disabled="true">
          <template #icon>
            <CogOutlineIcon></CogOutlineIcon>
          </template>
          <template #default>Meus dados</template>
        </ListItem>
        <ListItem
          v-if="authStore.isLogged"
          @click="navigateToLogoutScreen"
          :disabled="!authStore.isLogged"
        >
          <template #icon>
            <ExitToAppIcon></ExitToAppIcon>
          </template>
          <template #default>Sair</template>
        </ListItem>
        <div class="p-5">
          <div class="bg-gray-100 p-4 rounded-lg flex items-center gap-4">
            <div>
              <p class="font-bold mb-1">
                Adicione o EntregaClub à tela inicial
              </p>
              <p class="text-xs text-gray-600">
                Aproveite a versão mais leve do iFood, adicionando-a à sua tela
                inicial
              </p>
            </div>
            <PrimaryButton small>Adicionar</PrimaryButton>
          </div>
        </div>
      </ScreenContent>
    </ScreenMain>
    <ScreenFooter>
      <div class="text-gray-500 text-center">
        Versão do app: {{ appVersion }}
      </div>
    </ScreenFooter>
  </ScreenRoot>
</template>

<style></style>
