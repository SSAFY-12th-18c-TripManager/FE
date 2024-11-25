<template>
  <v-layout>
    <div class="overflow-hidden w-screen h-screen d-flex flex-column">
      <v-main class="d-flex flex-1-0 h-full w-100 d-flex flex-column justify-center">
        <slot />
      </v-main>
    </div>
  </v-layout>
</template>
<script setup></script>
