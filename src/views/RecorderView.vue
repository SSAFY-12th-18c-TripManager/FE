<template>
  <div class="about">
    <h1>recorder view</h1>
    <Recorder />
  </div>
</template>

<script setup>
import Recorder from '../components/Recorder.vue'
</script>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
