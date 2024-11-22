<script setup>
import { RouterView } from "vue-router";
import DefaultLayout from "@/layout/DefaultLayout.vue";
</script>

<template>
  <v-app>
    <DefaultLayout style="overflow:hidden !important">
      <router-view></router-view>
    </DefaultLayout>
  </v-app>
</template>

<style scoped></style>
