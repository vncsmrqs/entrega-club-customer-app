<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import BackButton from '@/components/BackButton.vue';
  import ScreenRoot from '@/components/Screen/ScreenRoot.vue';
  import ScreenHeader from '@/components/Screen/ScreenHeader.vue';
  import ScreenMain from '@/components/Screen/ScreenMain.vue';
  import ScreenContent from '@/components/Screen/ScreenContent.vue';
  import ScreenLoader from '@/components/Screen/ScreenLoader.vue';
  import ScreenError from '@/components/Screen/ScreenError.vue';
  import StarOutlineIcon from 'vue-material-design-icons/StarOutline.vue';
  import { useSearchFilterStore } from '@/stores/search/search-filter';
  import { formatToCurrency } from '../../utils';
  import ScreenFooter from '@/components/Screen/ScreenFooter.vue';
  import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';

  const searchFilterStore = useSearchFilterStore();

  const selectedTab = ref(1);

  onMounted(async () => {
    await searchFilterStore.fetch();
  });
</script>
<template>
  <ScreenRoot>
    <ScreenHeader>
      <template #left>
        <BackButton />
      </template>
      Filtros
    </ScreenHeader>
    <ScreenLoader v-if="searchFilterStore.loading" />
    <ScreenError v-else-if="searchFilterStore.error" />
    <ScreenMain v-else :with-padding="false">
      <ScreenContent class="!col-span-full">
        <div class="grid grid-cols-3 bg-white sticky top-0 z-10">
          <button
            class="p-4 font-medium border-b-2"
            @click="selectedTab = 1"
            :class="{
              'border-primary-600 text-primary-600': selectedTab === 1,
            }"
          >
            Básicos
          </button>
          <button
            class="p-4 font-medium border-b-2 border-gray-200"
            @click="selectedTab = 2"
            :class="{
              'border-primary-600 text-primary-600': selectedTab === 2,
            }"
          >
            Categorias
          </button>
          <button
            class="p-4 font-medium border-b-2 border-gray-200"
            @click="selectedTab = 3"
            :class="{
              'border-primary-600 text-primary-600': selectedTab === 3,
            }"
          >
            Pagamentos
          </button>
        </div>
        <Transition name="fade">
          <div v-show="selectedTab === 1" class="w-full absolute">
            <div class="w-full p-5 flex flex-col gap-2">
              <div class="font-medium text-lg">Modo de entrega</div>
              <div class="flex gap-2">
                <span class="rounded-full px-4 py-2 border">
                  <label>Entrega</label>
                </span>
                <span class="rounded-full px-4 py-2 border">
                  <label>Pra retirar</label>
                </span>
              </div>
            </div>
            <div class="p-5 flex flex-col gap-2">
              <div class="font-medium text-lg">Ordernar por</div>
              <div class="grid grid-cols-3 auto-rows-min grid-flow-row gap-4">
                <div class="flex flex-col items-center">
                  <button
                    class="rounded-full w-20 aspect-square border flex justify-center items-center"
                  >
                    <StarOutlineIcon :size="40" />
                  </button>
                  <label class="text-center">Entrega</label>
                </div>
                <div class="flex flex-col items-center">
                  <button
                    class="rounded-full w-20 aspect-square border flex justify-center items-center"
                  >
                    <StarOutlineIcon :size="40" />
                  </button>
                  <label class="text-center">Preço</label>
                </div>
                <div class="flex flex-col items-center">
                  <button
                    class="rounded-full w-20 aspect-square border flex justify-center items-center"
                  >
                    <StarOutlineIcon :size="40" />
                  </button>
                  <label class="text-center">Avaliação</label>
                </div>
                <div class="flex flex-col items-center">
                  <button
                    class="rounded-full w-20 aspect-square border flex justify-center items-center"
                  >
                    <StarOutlineIcon :size="40" />
                  </button>
                  <label class="text-center">Tempo de entrega</label>
                </div>
                <div class="flex flex-col items-center">
                  <button
                    class="rounded-full w-20 aspect-square border flex justify-center items-center"
                  >
                    <StarOutlineIcon :size="40" />
                  </button>
                  <label class="text-center">Taxa de entrega</label>
                </div>
                <div class="flex flex-col items-center">
                  <button
                    class="rounded-full w-20 aspect-square border flex justify-center items-center"
                  >
                    <StarOutlineIcon :size="40" />
                  </button>
                  <label class="text-center">Distância</label>
                </div>
              </div>
            </div>
            <div class="p-5 flex flex-col gap-2">
              <div>
                <div class="font-medium text-lg">Distância</div>
                <div>100km ou mais</div>
              </div>
              <div>
                <div class="flex justify-between">
                  <span>1km</span>
                  <span>100km</span>
                </div>
                <input class="w-full" type="range" min="0" max="100" />
              </div>
            </div>
            <div class="p-5 flex flex-col gap-2">
              <div class="font-medium text-lg">Taxa de entrega</div>
              <div class="flex gap-2">
                <span class="rounded-full px-4 py-2 border">
                  <label>Grátis</label>
                </span>
                <span class="rounded-full px-4 py-2 border">
                  <label>até {{ formatToCurrency(5) }}</label>
                </span>
                <span class="rounded-full px-4 py-2 border">
                  <label>até {{ formatToCurrency(10) }}</label>
                </span>
              </div>
            </div>
          </div>
        </Transition>
        <Transition name="fade">
          <div v-show="selectedTab === 2" class="w-full absolute">
            Categorias
          </div>
        </Transition>
        <Transition name="fade">
          <div v-show="selectedTab === 3" class="w-full absolute">
            Pagamentos
          </div>
        </Transition>
      </ScreenContent>
    </ScreenMain>
    <ScreenFooter>
      <PrimaryButton full> Ver resultados</PrimaryButton>
    </ScreenFooter>
  </ScreenRoot>
</template>

<style scoped></style>
