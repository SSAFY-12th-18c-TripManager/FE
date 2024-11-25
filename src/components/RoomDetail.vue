<template>
  <main class="detailMain h-100 text-white">
    <v-card color="color5" class="vcard">
      <v-card-title> {{ formattedRoom?.summary }} </v-card-title>

      <v-card-text>
        <div v-if="formattedRoom?.result">
          <div v-html="formattedRoom.result"></div>
        </div>
        {{ coordinate }}
        <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true">
          <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
        </KakaoMap>
      </v-card-text>
    </v-card>

    <router-link :to="{ name: 'room-list' }">
      <h4 class="pt-1 text-color2">페이지 리스트로 이동</h4>
    </router-link>
  </main>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { getRoom } from '@/api/room.js'
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'

import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps'
const coordinate = {
  lat: 33.450701,
  lng: 126.570667,
}

const route = useRoute()
const roomId = ref<string>('')
const room = ref<Room>()
if (typeof route?.params?.roomId === 'string') {
  roomId.value = route.params.roomId
  getRoom(
    roomId.value,
    ({ data }) => {
      room.value = data
      console.log(data)
    },
    (error) => {
      console.log(error)
    },
  )
} else {
  roomId.value = '' // fallback 값 설정
}

interface Room {
  roomId: number
  summary: string
  memberId: number
  timestamp: Date
  report: string
}

let intervalId = 0
const updateTick = ref(0)
const formattedRoom = computed(() => {
  // updateTick을 추가하여 1분마다 자동으로 다시 계산되도록 함
  updateTick.value

  return room.value != null
    ? room.value.map((item) => ({
        ...item,
        formattedTimestamp: formatTimestamp(item.timestamp),
      }))
    : room.value
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
  if (minutesAgo === 0) {
    return '방금 전'
  } else if (minutesAgo < 60) {
    return `${minutesAgo}분 전`
  } else {
    const hoursAgo = Math.floor(minutesAgo / 60)
    return `${hoursAgo}시간 전`
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

.vcard {
  border: 0px solid white;
}

.detailMain {
  margin: 1rem;
  border: 10px solid white;
}

li {
  margin: 0.25rem 1rem;
}

h3 {
  margin: 0.25rem;
}
</style>
