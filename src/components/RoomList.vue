<template>
  <main class="history h-100 text-white pa-3">
    <div class="d-flex flex-column opacity-70 ml-5 mr-5 list text-color1 flex-1-0">
      <div class="border pa-4" v-for="room in formattedRoomList" key="room.roomId">
        <router-link :to="{ name: 'room-detail', params: { roomId: room.roomId } }">
          <h4 class="pb-1 text-color2">{{ room.summary }}</h4>
          <h5 class="text-color1">{{ room.formattedTimestamp }}</h5>
        </router-link>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { useMsgStore } from '@/stores/msg'
import { storeToRefs } from 'pinia'
const msgStore = useMsgStore()
const { roomList } = storeToRefs(msgStore)
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'

interface Room {
  roomId: number
  summary: string
  memberId: number
  timestamp: Date
  report: string
}
let intervalId = 0
const updateTick = ref(0)
const formattedRoomList = computed(() => {
  // updateTick을 추가하여 1분마다 자동으로 다시 계산되도록 함
  updateTick.value

  return roomList.value.map((room: Room) => ({
    ...room,
    formattedTimestamp: formatTimestamp(room.timestamp),
  }))
  .reverse();
})

// 타임스탬프를 형식화하는 함수
const formatTimestamp = (timestamp) => {
  let date

  // timestamp가 배열인 경우 처리 (형식: [year, month, day, hour, minute, second, nanosecond])
  if (Array.isArray(timestamp) && timestamp.length === 7) {
    const [year, month, day, hour, minute, second] = timestamp // 나노초는 무시
    // JS의 Date 객체에서 month는 0부터 시작하므로 -1 해줌
    date = new Date(year, month - 1, day, hour, minute, second)
  } else if (typeof timestamp === 'string' || typeof timestamp === 'number') {
    // timestamp가 문자열 또는 숫자인 경우 Date 객체로 변환
    date = new Date(timestamp)
  } else {
    // 그 외의 경우 처리: 유효하지 않은 timestamp는 현재 시간으로 초기화
    date = new Date()
  }
  const now = new Date()
  const minutesAgo = Math.floor((now - date) / 60000)
  const hoursAgo = Math.floor(minutesAgo / 60)
  const dayAgo = Math.floor(hoursAgo / 24)
  if (minutesAgo === 0) {
    return '방금 전'
  } else if (minutesAgo < 60) {
    return `${minutesAgo}분 전`
  } else if (hoursAgo < 24) {
    return `${hoursAgo}시간 전`
  } else {
    return `${dayAgo}일 전`
  }
}
onMounted(() => {
  intervalId = setInterval(() => {
    updateTick.value++ // 1분마다 변경하여 computed 재계산 유도
  }, 60000)
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})
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
  border-image: linear-gradient(0deg, #ffdee9 0%, #b5fffc 100%);
  /* border-image-slice: 1; */
  /* border-image: linear-gradient(black, pink); */
  border-image: linear-gradient(180deg, #255a62 2%, #0390e8 5%, #48b4a5 60%, #f4f1ea 100%);
  border-image-slice: 1;
  /* border: 20px solid; */
}
</style>
