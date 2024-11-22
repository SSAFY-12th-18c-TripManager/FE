<template>
  <div class="record-view d-flex justify-center flex-column h-100 w-100">
    <Recorder />
  </div>
</template>

<script setup>
import Recorder from '../components/Recorder.vue'
</script>
<style scoped>
.record-view {
  background: linear-gradient(180deg, #255a62 0%, #0390e8 5%, #48b4a5 60%, #f4f1ea 100%);
}

.lettalk {
  color: white;
  font-size: 1.375rem;
  font-weight: 200;
}
</style>
