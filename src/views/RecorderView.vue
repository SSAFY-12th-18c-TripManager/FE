<template>
  <div class="about d-flex justify-center flex-column">
    <div class="lettalk">
      <router-link :to="{ name: 'recorder' }" class="lettalk mx-3 pt-10">당신의 <b>여행 매니저</b>와 대화해보세요.</router-link>
    </div>
    <Recorder />
  </div>
</template>

<script setup>
import Recorder from '../components/Recorder.vue'
</script>

<style scoped>
.about {

  width: 100vw;
  height: 100vh;
  background: linear-gradient(black, pink);
}

.lettalk {

  color: white;
  font-size: 1.375rem;
  font-weight: 200;
}
</style>
