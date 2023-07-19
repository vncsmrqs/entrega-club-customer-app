<script setup lang="ts">
  import MainViewLayout from '@/components/MainViewLayout.vue';
  import MobileTopBar from '@/components/Screen/ScreenHeader.vue';
  import ChatOutlineIcon from 'vue-material-design-icons/ChatOutline.vue';
  import MapMarkerOutlineIcon from 'vue-material-design-icons/MapMarkerOutline.vue';
  import HeartOutlineIcon from 'vue-material-design-icons/HeartOutline.vue';
  import HelpIcon from 'vue-material-design-icons/Help.vue';
  import CreditCardOutlineIcon from 'vue-material-design-icons/CreditCardOutline.vue';
  import CogOutlineIcon from 'vue-material-design-icons/CogOutline.vue';
  import ExitToAppIcon from 'vue-material-design-icons/ExitToApp.vue';
  import ListItem from '@/components/Profile/ListItem.vue';

  import { markRaw, ref } from 'vue';
  import { version } from '@/../package.json';
  import { useDrawersControlStore } from '@/stores/drawers-control';
  import AddressSelection from '@/components/Address/AddressListScreen.vue';
  import { useRouter } from 'vue-router';

  const drawersControlStore = useDrawersControlStore();

  const router = useRouter();

  const navigateToAddress = () => {
    const drawer = drawersControlStore.add(markRaw(AddressSelection), {});
    router.push({ hash: `#${drawer.id}` });
  };

  const appVersion = ref(version);
</script>

<template>
  <MainViewLayout class="profile-view">
    <MobileTopBar title="Vinicius Marques" />
    <ListItem>
      <template #icon>
        <ChatOutlineIcon></ChatOutlineIcon>
      </template>
      <template #default>Chats</template>
      <template #subtitle>Suas conversas com os estabelecimentos</template>
    </ListItem>
    <ListItem @click="navigateToAddress">
      <template #icon>
        <MapMarkerOutlineIcon></MapMarkerOutlineIcon>
      </template>
      <template #default>Endereços</template>
    </ListItem>
    <ListItem>
      <template #icon>
        <HeartOutlineIcon></HeartOutlineIcon>
      </template>
      <template #default>Favoritos</template>
    </ListItem>
    <ListItem>
      <template #icon>
        <HelpIcon></HelpIcon>
      </template>
      <template #default>Ajuda</template>
    </ListItem>
    <ListItem>
      <template #icon>
        <CreditCardOutlineIcon></CreditCardOutlineIcon>
      </template>
      <template #default>Pagamento</template>
    </ListItem>
    <ListItem>
      <template #icon>
        <CogOutlineIcon></CogOutlineIcon>
      </template>
      <template #default>Meus dados</template>
    </ListItem>
    <ListItem>
      <template #icon>
        <ExitToAppIcon></ExitToAppIcon>
      </template>
      <template #default>Sair</template>
    </ListItem>

    <div class="py-8 text-gray-500 text-center">
      Versão do app: {{ appVersion }}
    </div>
  </MainViewLayout>
</template>

<style>
  .profile-view {
    @apply flex flex-col;
  }
</style>
