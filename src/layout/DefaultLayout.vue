<template>
  <div class="overflow-hidden w-screen h-screen d-flex flex-column">
    <DefaultHeader></DefaultHeader>
    <div class="d-flex flex-1-0 h-full w-100 d-flex flex-column justify-center">
      <slot />
    </div>
    <DefaultNavigatior></DefaultNavigatior>
  </div>
</template>
<script setup>
import DefaultHeader from "@/components/DefaultHeader.vue";
import DefaultNavigatior from "@/components/DefaultNavigatior.vue";
</script>
