<template>
  <div class="about d-flex justify-center flex-column">
    <div class="lettalk">
      <router-link :to="{ name: 'recorder' }" class="lettalk mx-3 pt-10">당신의 <b>트립 매니저</b>와 대화해보세요.</router-link>
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
  /* background: linear-gradient(70deg, rgb(10, 3, 15) 0%, rgb(64, 69, 149) 25%, rgb(10, 3, 15) 50%, rgb(64, 69, 149) 75%, rgb(10, 3, 15) 100%); */

}

.lettalk {

  color: white;
  font-size: 1.375rem;
  font-weight: 200;
}
</style>
