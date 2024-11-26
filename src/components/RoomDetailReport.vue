<template>
  <main class="report h-100 text-white">
    <v-card color="color5" class="vcard">
      <v-card-title class="font-weight-medium"> {{ formattedRoom?.summary }} </v-card-title>
      <v-card-text>
        <div v-html="summary"></div>
      </v-card-text>
    </v-card>
  </main>
</template>
<script setup lang="ts">
import { useMsgStore } from '@/stores/msg'
import { storeToRefs } from 'pinia'
const msgStore = useMsgStore()
const { room, roomId, summary, roomList } = storeToRefs(msgStore)
const sample = {
  summary:
    '### OOO 여행 일정표\n\n**<여행 정보>**\n- 여행 이름: 역삼 탐험\n- 여행 나라: 대한민국\n- 여행 지역: 서울특별시 강남구 역삼동\n- 여행 날짜: 2024년 11월 26일\n- 참여 인원: 2명\n- 예산: 최소 비용\n\n---\n\n### 일정표\n| 시간           | 장소                     | 활동/세부내용               | 비고          |\n|----------------|--------------------------|----------------------------|---------------|\n| 09:00-10:00    | 역삼역 주변 카페         | 도착 및 간단한 휴식        | 커피빈 추천   |\n| 10:00-12:00    | 삼성 딜라이트 체험관    | 최신 IT 기술 체험          | 무료 입장     |\n| 12:00-14:00    | 조수사                  | 신선한 초밥과 회로 점심     | 예약 권장     |\n| 14:00-16:00    | 역삼문화공원            | 산책 및 사진 촬영          | 날씨 확인 필요 |\n| 16:00-18:00    | 하나둘 갤러리카페       | 무료 전시 관람 및 휴식     | 최신 전시 확인 |\n| 18:00-20:00    | 이필녀국밥             | 뜨끈한 순대국밥으로 저녁    | 김치 맛집     |\n| 20:00 이후     | 역삼역                  | 귀가                      | 교통편 확인   |\n\n---\n\n### 추가 메모\n- 필요한 준비물: 간단한 가방, 물병, 편한 신발\n- 사전 예약 사항: 점심 예약(조수사), 확인 전화\n- 특별히 주의할 점: 날씨 확인, 체험 시간 맞추기\n\n---\n\n### 비용 정리\n| 항목         | 금액      | 비고              |\n|--------------|-----------|-------------------|\n| 교통비        | 최소 비용 |                   |\n| 식사비        | 최소 비용 | 점심/저녁 포함   |\n| 체험/입장료   | 무료      | 모든 체험 무료    |\n| 기타 비용     |           |                   |\n\n---\n\n### 여행 후 기록\n- 가장 좋았던 점:  \n- 아쉬웠던 점:  \n- 다음에 가고 싶은 곳:  \n',
  summaryHTML:
    '<h3>OOO 여행 일정표</h3>\n\n<h4>&lt;여행 정보&gt;</h4>\n<ul>\n<li>여행 이름: 역삼 탐험</li>\n<li>여행 나라: 대한민국</li>\n<li>여행 지역: 서울특별시 강남구 역삼동</li>\n<li>여행 날짜: 2024년 11월 26일</li>\n<li>참여 인원: 2명</li>\n<li>예산: 최소 비용</li>\n</ul>\n\n<hr>\n\n<h4>일정표</h4>\n<table>\n<tr><th>시간</th><th>장소</th><th>활동/세부내용</th><th>비고</th></tr>\n<tr><td>09:00-10:00</td><td>역삼역 주변 카페</td><td>도착 및 간단한 휴식</td><td>커피빈 추천</td></tr>\n<tr><td>10:00-12:00</td><td>삼성 딜라이트 체험관</td><td>최신 IT 기술 체험</td><td>무료 입장</td></tr>\n<tr><td>12:00-14:00</td><td>조수사</td><td>신선한 초밥과 회로 점심</td><td>예약 권장</td></tr>\n<tr><td>14:00-16:00</td><td>역삼문화공원</td><td>산책 및 사진 촬영</td><td>날씨 확인 필요</td></tr>\n<tr><td>16:00-18:00</td><td>하나둘 갤러리카페</td><td>무료 전시 관람 및 휴식</td><td>최신 전시 확인</td></tr>\n<tr><td>18:00-20:00</td><td>이필녀국밥</td><td>뜨끈한 순대국밥으로 저녁</td><td>김치 맛집</td></tr>\n<tr><td>20:00 이후</td><td>역삼역</td><td>귀가</td><td>교통편 확인</td></tr>\n</table>\n\n<hr>\n\n<h4>추가 메모</h4>\n<ul>\n<li>필요한 준비물: 간단한 가방, 물병, 편한 신발</li>\n<li>사전 예약 사항: 점심 예약(조수사), 확인 전화</li>\n<li>특별히 주의할 점: 날씨 확인, 체험 시간 맞추기</li>\n</ul>\n\n<hr>\n\n<h4>비용 정리</h4>\n<table>\n<tr><th>항목</th><th>금액</th><th>비고</th></tr>\n<tr><td>교통비</td><td>최소 비용</td><td></td></tr>\n<tr><td>식사비</td><td>최소 비용</td><td>점심/저녁 포함</td></tr>\n<tr><td>체험/입장료</td><td>무료</td><td>모든 체험 무료</td></tr>\n<tr><td>기타 비용</td><td></td><td></td></tr>\n</table>\n\n<hr>\n\n<h4>여행 후 기록</h4>\n<ul>\n<li>가장 좋았던 점:</li>\n<li>아쉬웠던 점:</li>\n<li>다음에 가고 싶은 곳:</li>\n</ul>',
  locations: [
    {
      locationTitle: '역삼역 주변 카페',
      locationSub: '도착 및 간단한 휴식',
      lat: 37.500769,
      lng: 127.036536,
    },
    {
      locationTitle: '삼성 딜라이트 체험관',
      locationSub: '최신 IT 기술 체험',
      lat: 37.508857,
      lng: 127.063814,
    },
    {
      locationTitle: '조수사',
      locationSub: '신선한 초밥과 회',
      lat: 37.498095,
      lng: 127.028094,
    },
    {
      locationTitle: '역삼문화공원',
      locationSub: '산책 및 사진 촬영',
      lat: 37.500949,
      lng: 127.037216,
    },
    {
      locationTitle: '하나둘 갤러리카페',
      locationSub: '무료 전시 관람 및 휴식',
      lat: 37.501566,
      lng: 127.040263,
    },
    {
      locationTitle: '이필녀국밥',
      locationSub: '뜨끈한 순대국밥',
      lat: 37.495632,
      lng: 127.029523,
    },
    {
      locationTitle: '역삼역',
      locationSub: '귀가',
      lat: 37.500621,
      lng: 127.036431,
    },
  ],
}
import { useRoute } from 'vue-router'
import { getSummary } from '@/api/room.js'
import { ref, onMounted, computed, onBeforeUnmount, watch } from 'vue'

const { setSummary } = msgStore
const reSummary = ref('')

const formattedRoom = computed(() => {
  return roomList.value.filter((item) => item.roomId == roomId.value)[0]
})
onMounted(() => {
  getSummary(
    roomId.value,
    ({ data }) => {
      console.log('뭐하냐고지금', data)
      setSummary(data)
    },
    (error) => {
      console.log(error)
    },
  )
})
</script>

<style>
.history {
}

.list {
}

.vcard {
  border: 0px solid white;
}

.report {
  margin: 1rem;
  border: 10px solid white;

  li {
    margin: 0.5rem 1.25rem;
  }

  h3 {
    margin: 0.25rem;
  }

  h4 {
    text-align: center;
    padding: 0.25rem;
    color: rgb(var(--v-theme-color3));
  }

  table {
    width: 100%;
    text-align: center;
  }

  th {
    color: rgb(var(--v-theme-color2));
    padding: 0.25rem;
  }

  td {
    padding: 0 0.125rem;
  }

  hr {
    margin: 0.25rem;
  }

  p {
    margin: 0.25rem;
  }
}
</style>
