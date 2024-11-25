<template>
  <div class="w-100 h-100 overflow-auto history">
    <h3 class="text-color2 mt-5 ml-5">
      과거 대화 내역
    </h3>
    <div style="height:85vh">
      <router-view />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';


</script>


<style scoped>
.history {
  /* background-color: #255a62; */

}
</style>
