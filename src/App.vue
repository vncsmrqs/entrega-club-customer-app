<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
// import SampleComponentToTest from './components/SampleComponentToTest.vue';
</script>

<template>
  <header class="">
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <div>
      <!-- <SampleComponentToTest msg="You did it!" /> -->

      <nav>
        <RouterLink :to="{ name: 'home' }">Home</RouterLink>
        <RouterLink :to="{ name: 'about' }">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
