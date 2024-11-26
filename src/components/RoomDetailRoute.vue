<template>
  <main class="detailMain h-100 text-color4">
    <v-card color="color5" class="vcard mb-5">
      <div ref="tmap"></div>
    </v-card>
    <div v-for="f in features?.features" key="f.properties">
      <div v-if="f.properties.pointIndex">
        <h4 class="text-color2 border-radius-4">
          {{
            f.properties.description == '도착'
              ? decodeURIComponent(f.properties.name)
              : f.properties.name
          }}
        </h4>
        <div class="ml-3 mt-1 mb-2 pa-3 naviContent">
          <h4 class="font-weight-light">
            <v-btn v-if="getDescription(f.properties.turnType) != -1" variant="outlined" density>
              {{ getDescription(f.properties.turnType) }}
            </v-btn>
            {{ grammer(f.properties.description) }}
          </h4>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, onBeforeUnmount, watch } from 'vue'
import { getPedestrianRoute } from '@/api/route.js'
const options = ref({
  startX: 126.92365493654832,
  startY: 37.556770374096615,
  angle: 20,
  speed: 4,
  endX: 126.92432158129688,
  endY: 37.55279861528311,
  passList: '126.92774822,37.55395475_126.92577620,37.55337145',
  reqCoordType: 'WGS84GEO',
  startName: '%EC%B6%9C%EB%B0%9C',
  endName: '%EB%8F%84%EC%B0%A9',
  searchOption: '0',
  resCoordType: 'WGS84GEO',
  sort: 'index',
})


const makeRouteOption = () => {
  let markerList = locations.value.map((item, index) => ({
    ...item,
    key: index,
  }))
  console.log('markerList', markerList)

  let first = markerList.shift()
  let last = markerList.pop()

  let passString = ''
  markerList.forEach((item) => {
    passString += item.lng
    passString += ','
    passString += item.lat
    passString += '_'
  })

  options.value.startY = first?.lat
  options.value.startX = first?.lng
  options.value.endY = last?.lat
  options.value.endX = last?.lng
  options.value.passList = passString.slice(0, -1)
  options.value.startName = encodeURI(first.locationTitle)
  options.value.endName = encodeURI(last.locationTitle)
  return JSON.stringify(options.value)
}

const features = ref(null)
const getTmapRoute = () => {
  let body = makeRouteOption()
  console.log('body', body)
  getPedestrianRoute(
    body,
    ({ data }) => {
      console.log('성공', data.features)
      features.value = data
      initTmap()
    },
    (error) => {
      console.error('Headers:', error.config.headers)
      console.error('API Error:', error.response?.data || error.message)
      console.log(error)
    },
  )
}

import { useRoute } from 'vue-router'

const route = useRoute()
const roomId = ref<string>('')
if (typeof route?.params?.roomId === 'string') {
  roomId.value = route.params.roomId
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

const locations = ref(null)
import { getRoutes } from '@/api/room.js'
const tmap = ref(null)
const map = ref(null)
onMounted(() => {
  getRoutes(
    roomId.value,
    ({ data }) => {
      locations.value = data
      getTmapRoute()
    },
    (error) => {
      console.log(error)
    },
  )
})

const initTmap = () => {
  console.log('initTmap')
  map.value = new Tmapv3.Map(tmap.value, {
    center: new Tmapv3.LatLng(locations.value[0].lat, locations.value[0].lng),
    width: '100%', // 지도의 넓이
    height: '400px', // 지도의 높이
    zoom: 15, // 지도 줌레벨
  })

  map.value.on('ConfigLoad', function () {
    addPolyline()
  })
}

const addPolyline = () => {
  try {
    features.value.features.forEach((feature, index) => {
      const { geometry } = feature

      if (geometry.type === 'Point') {
        // Point 타입 처리
      } else if (geometry.type === 'LineString' && Array.isArray(geometry.coordinates)) {
        // LineString 타입 처리
        const lineData = geometry.coordinates.map(([lng, lat]) => new Tmapv3.LatLng(lat, lng))
        new Tmapv3.Polyline({
          path: lineData,
          strokeColor: '#0390e8',
          strokeWeight: 3,
          map: map.value,
        })
      } else {
        console.error('Unsupported geometry type:', geometry.type)
      }
    })

    console.log('Features successfully drawn on the map!')
  } catch (e) {
    console.error('Error drawing features:', e)
  }

  var polyline = new Tmapv3.Polyline({
    path: features.value.map((item) => {
      return new Tmapv3.LatLng(item.geometry.coordinates[0], item.geometry.coordinates[1])
    }),
    strokeColor: '#dd00dd',
    strokeWeight: 6,
    direction: true,
    map: map.value, // 지도 객체
  })
}

const descriptions = {
  0: '휴게소',
  1: '도곽에 의한 점',
  2: '타일에 의한 점',
  3: '고속도로에 의한 안내없음',
  4: '일반도로에 의한 안내없음',
  5: '특수한 경우 안내없음',
  6: 'Y자 오른쪽 안내없음',
  7: 'Y자 왼쪽 안내없음',
  11: '직진',
  12: '좌회전',
  13: '우회전',
  14: 'U턴',
  15: 'P턴',
  16: '8시 방향 좌회전',
  17: '10시 방향 좌회전',
  18: '2시 방향 우회전',
  19: '4시 방향 우회전',
  43: '오른쪽',
  44: '왼쪽',
  51: '직진 방향',
  52: '왼쪽 차선',
  53: '오른쪽 차선',
  54: '1차선',
  55: '2차선',
  56: '3차선',
  57: '4차선',
  58: '5차선',
  59: '6차선',
  60: '7차선',
  61: '8차선',
  62: '9차선',
  63: '10차선',
  71: '첫번째 출구',
  72: '두번째 출구',
  73: '첫번째 오른쪽 길',
  74: '두번째 오른쪽 길',
  75: '첫번째 왼쪽 길',
  76: '두번째 왼쪽 길',
  101: '오른쪽 고속도로 입구',
  102: '왼쪽 고속도로 입구',
  103: '전방 고속도로 입구',
  104: '오른쪽 고속도로 출구',
  105: '왼쪽 고속도로 출구',
  106: '전방 고속도로 출구',
  111: '오른쪽 도시고속도로 입구',
  112: '왼쪽 도시고속도로 입구',
  113: '전방 도시고속도로 입구',
  114: '오른쪽 도시고속도로 출구',
  115: '왼쪽 도시고속도로 출구',
  116: '전방 도시고속도로 출구',
  117: '오른쪽 방향',
  118: '왼쪽 방향',
  119: '지하차도',
  120: '고가도로',
  121: '터널',
  122: '교량',
  123: '지하차도옆',
  124: '고가도로옆',
  130: '토끼굴 진입',
  131: '1시 방향',
  132: '2시 방향',
  133: '3시 방향',
  134: '4시 방향',
  135: '5시 방향',
  136: '6시 방향',
  137: '7시 방향',
  138: '8시 방향',
  139: '9시 방향',
  140: '10시 방향',
  141: '11시 방향',
  142: '12시 방향',
  150: '졸음쉼터',
  151: '휴게소',
  182: '왼쪽방향 도착안내',
  183: '오른쪽방향 도착안내',
  184: '경유지',
  185: '첫번째경유지',
  186: '두번째경유지',
  187: '세번째경유지',
  188: '네번째경유지',
  189: '다섯번째경유지',
  191: '제한속도',
  192: '사고다발',
  193: '급커브',
  194: '낙석주의',
  200: '출발지',
  201: '도착지',
  203: '목적지건너편',
  233: '직진 임시',
}
const getDescription = (number) => descriptions[number] || -1

const grammer = (string) => string.replace('로 을', '로를')

onBeforeUnmount(() => {
  clearInterval(intervalId)
})
</script>

<style>
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
  /*
  margin: 20px;
  border: 15px solid;
  border-image: linear-gradient(0deg, #ffdee9 0%, #b5fffc 100%); */
  /* border-image-slice: 1; */
  /* border-image: linear-gradient(black, pink); */
  /*
  border-image: linear-gradient(180deg, #255a62 2%, #0390e8 5%, #48b4a5 60%, #f4f1ea 100%);
  border-image-slice: 1; */
  /* border: 20px solid; */
}

.vcard {
  border: 0px solid white;
}

.detailMain {
  margin: 1rem;
  border: 10px solid white;
}

.naviContent {
  border-left: 4px dotted rgb(var(--v-theme-color3));
}
</style>
