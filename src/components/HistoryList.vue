<template>
  <main class="history h-100 text-white pa-3">
    <div class="d-flex flex-column opacity-70 ml-5 mr-5 list text-color1 flex-1-0">
      <div class="border pa-4">
        <router-link :to="{ name: 'history-detail' }">
          <h4 class="pb-1 text-color2">
            역삼역 여행
          </h4>
          <h5 class="text-color1">방금 전</h5>
        </router-link>
      </div>
      <div class="border pa-4">
        <router-link :to="{ name: 'history-detail' }">
          <h4 class="pb-1 text-color2">
            역삼역 힐링 여행
          </h4>
          <h5 class="text-color1">1일 전</h5>
        </router-link>
      </div>


      <div class="border pa-4">
        <h4 class="pb-1 text-color2">
          롯데월드의 효율적인 동선
        </h4>
        <h5 class="text-color1">3일 전</h5>
      </div>

      <div class="border pa-4">
        <h4 class="pb-1 text-color2">
          영종도 가는 법
        </h4>
        <h5 class="text-color1">3일 전</h5>
      </div>
      <div class="border pa-4">
        <h4 class="pb-1 text-color2">
          역삼역 초밥집 중 연어초밥 가격이 제일 싼 곳
        </h4>
        <h5 class="text-color1">3일 전</h5>
      </div>
      <div class="border pa-4">
        <h4 class="pb-1 text-color2">
          강남 모임하기 좋은 곳
        </h4>
        <h5 class="text-color1">3일 전</h5>
      </div>
      <div class="border pa-4">
        <h4 class="pb-1 text-color2">
          방화역 가는 길
        </h4>
        <h5 class="text-color1">3일 전</h5>
      </div>
    </div>

  </main>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const msgList = ref(null);


</script>


<style scoped>
.history {
  /*
  border: 1px solid #ddd; */
  /* background: rgb(var(--v-theme-color2)); */
  /* background: linear-gradient(rgb(var(--v-theme-color2))0%, rgb(var(--v-theme-color2)) 2%, rgb(var(--v-theme-color3)) 15%, rgb(var(--v-theme-color4))60%, rgb(var(--v-theme-color5))); */
}

/* colors: { */

/* color1: '#15222a', */
/* color2: '#255a62', */
/* color3: '#0390e8', */
/* color4: '#48b4a5', */
/* color5: '#f4f1ea', */
.list {
  /* width: 50%; */
  margin: 20px;
  border: 15px solid;
  border-image: linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%);
  /* border-image-slice: 1; */
  /* border-image: linear-gradient(black, pink); */
  border-image: linear-gradient(180deg, #255a62 2%, #0390e8 5%, #48b4a5 60%, #f4f1ea 100%);
  border-image-slice: 1;
  /* border: 20px solid; */

}
</style>
