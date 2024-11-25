<template>
  <footer>
    <div class="d-flex justify-space-around pt-4" style="height: 5rem">
      <router-link :to="{ name: 'room-list' }">
        <v-icon color="color4" icon="mdi-history" size="large"></v-icon>
      </router-link>

      <router-link :to="{ name: 'recorder' }">
        <v-icon color="color4" size="x-large">mdi-chat-outline</v-icon>
      </router-link>

      <router-link :to="{ name: 'my-page' }">
        <v-icon color="color4" size="x-large">mdi-account</v-icon>
      </router-link>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped></style>
