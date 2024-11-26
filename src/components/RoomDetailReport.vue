<template>
  <main class="report h-100 text-white">
    <v-card color="color5" class="vcard">
      <v-card-title class="font-weight-medium"> {{ formattedRoom?.summary }} </v-card-title>
      <v-card-text>
        <div v-html="summary">
        </div>
        <div class="result" v-if="formattedRoom?.result">
          <div v-html="formattedRoom.result"></div>
        </div>
      </v-card-text>
    </v-card>
  </main>
</template>
<script setup lang="ts">
import { useMsgStore } from '@/stores/msg'
import { storeToRefs } from 'pinia'
const msgStore = useMsgStore();
const { room, roomId, summary, roomList } = storeToRefs(msgStore)
const sample = {
  "summary": "### OOO 여행 일정표\n\n**<여행 정보>**\n- 여행 이름: 역삼 탐험\n- 여행 나라: 대한민국\n- 여행 지역: 서울특별시 강남구 역삼동\n- 여행 날짜: 2024년 11월 26일\n- 참여 인원: 2명\n- 예산: 최소 비용\n\n---\n\n### 일정표\n| 시간           | 장소                     | 활동/세부내용               | 비고          |\n|----------------|--------------------------|----------------------------|---------------|\n| 09:00-10:00    | 역삼역 주변 카페         | 도착 및 간단한 휴식        | 커피빈 추천   |\n| 10:00-12:00    | 삼성 딜라이트 체험관    | 최신 IT 기술 체험          | 무료 입장     |\n| 12:00-14:00    | 조수사                  | 신선한 초밥과 회로 점심     | 예약 권장     |\n| 14:00-16:00    | 역삼문화공원            | 산책 및 사진 촬영          | 날씨 확인 필요 |\n| 16:00-18:00    | 하나둘 갤러리카페       | 무료 전시 관람 및 휴식     | 최신 전시 확인 |\n| 18:00-20:00    | 이필녀국밥             | 뜨끈한 순대국밥으로 저녁    | 김치 맛집     |\n| 20:00 이후     | 역삼역                  | 귀가                      | 교통편 확인   |\n\n---\n\n### 추가 메모\n- 필요한 준비물: 간단한 가방, 물병, 편한 신발\n- 사전 예약 사항: 점심 예약(조수사), 확인 전화\n- 특별히 주의할 점: 날씨 확인, 체험 시간 맞추기\n\n---\n\n### 비용 정리\n| 항목         | 금액      | 비고              |\n|--------------|-----------|-------------------|\n| 교통비        | 최소 비용 |                   |\n| 식사비        | 최소 비용 | 점심/저녁 포함   |\n| 체험/입장료   | 무료      | 모든 체험 무료    |\n| 기타 비용     |           |                   |\n\n---\n\n### 여행 후 기록\n- 가장 좋았던 점:  \n- 아쉬웠던 점:  \n- 다음에 가고 싶은 곳:  \n",
  "summaryHTML": "<h3>OOO 여행 일정표</h3>\n\n<h4>&lt;여행 정보&gt;</h4>\n<ul>\n<li>여행 이름: 역삼 탐험</li>\n<li>여행 나라: 대한민국</li>\n<li>여행 지역: 서울특별시 강남구 역삼동</li>\n<li>여행 날짜: 2024년 11월 26일</li>\n<li>참여 인원: 2명</li>\n<li>예산: 최소 비용</li>\n</ul>\n\n<hr>\n\n<h4>일정표</h4>\n<table>\n<tr><th>시간</th><th>장소</th><th>활동/세부내용</th><th>비고</th></tr>\n<tr><td>09:00-10:00</td><td>역삼역 주변 카페</td><td>도착 및 간단한 휴식</td><td>커피빈 추천</td></tr>\n<tr><td>10:00-12:00</td><td>삼성 딜라이트 체험관</td><td>최신 IT 기술 체험</td><td>무료 입장</td></tr>\n<tr><td>12:00-14:00</td><td>조수사</td><td>신선한 초밥과 회로 점심</td><td>예약 권장</td></tr>\n<tr><td>14:00-16:00</td><td>역삼문화공원</td><td>산책 및 사진 촬영</td><td>날씨 확인 필요</td></tr>\n<tr><td>16:00-18:00</td><td>하나둘 갤러리카페</td><td>무료 전시 관람 및 휴식</td><td>최신 전시 확인</td></tr>\n<tr><td>18:00-20:00</td><td>이필녀국밥</td><td>뜨끈한 순대국밥으로 저녁</td><td>김치 맛집</td></tr>\n<tr><td>20:00 이후</td><td>역삼역</td><td>귀가</td><td>교통편 확인</td></tr>\n</table>\n\n<hr>\n\n<h4>추가 메모</h4>\n<ul>\n<li>필요한 준비물: 간단한 가방, 물병, 편한 신발</li>\n<li>사전 예약 사항: 점심 예약(조수사), 확인 전화</li>\n<li>특별히 주의할 점: 날씨 확인, 체험 시간 맞추기</li>\n</ul>\n\n<hr>\n\n<h4>비용 정리</h4>\n<table>\n<tr><th>항목</th><th>금액</th><th>비고</th></tr>\n<tr><td>교통비</td><td>최소 비용</td><td></td></tr>\n<tr><td>식사비</td><td>최소 비용</td><td>점심/저녁 포함</td></tr>\n<tr><td>체험/입장료</td><td>무료</td><td>모든 체험 무료</td></tr>\n<tr><td>기타 비용</td><td></td><td></td></tr>\n</table>\n\n<hr>\n\n<h4>여행 후 기록</h4>\n<ul>\n<li>가장 좋았던 점:</li>\n<li>아쉬웠던 점:</li>\n<li>다음에 가고 싶은 곳:</li>\n</ul>",
  "locations": [
    {
      "locationTitle": "역삼역 주변 카페",
      "locationSub": "도착 및 간단한 휴식",
      "lat": 37.500769,
      "lng": 127.036536
    },
    {
      "locationTitle": "삼성 딜라이트 체험관",
      "locationSub": "최신 IT 기술 체험",
      "lat": 37.508857,
      "lng": 127.063814
    },
    {
      "locationTitle": "조수사",
      "locationSub": "신선한 초밥과 회",
      "lat": 37.498095,
      "lng": 127.028094
    },
    {
      "locationTitle": "역삼문화공원",
      "locationSub": "산책 및 사진 촬영",
      "lat": 37.500949,
      "lng": 127.037216
    },
    {
      "locationTitle": "하나둘 갤러리카페",
      "locationSub": "무료 전시 관람 및 휴식",
      "lat": 37.501566,
      "lng": 127.040263
    },
    {
      "locationTitle": "이필녀국밥",
      "locationSub": "뜨끈한 순대국밥",
      "lat": 37.495632,
      "lng": 127.029523
    },
    {
      "locationTitle": "역삼역",
      "locationSub": "귀가",
      "lat": 37.500621,
      "lng": 127.036431
    }
  ]
}
import { useRoute } from 'vue-router'
import { getSummary } from '@/api/room.js'
import { ref, onMounted, computed, onBeforeUnmount, watch } from 'vue'

const { setSummary } = msgStore
const sample2 = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.92364851900282,
          37.556774278906374
        ]
      },
      "properties": {
        "totalDistance": 1057,
        "totalTime": 830,
        "index": 0,
        "pointIndex": 0,
        "name": "",
        "description": "28m 이동",
        "direction": "",
        "nearPoiName": "",
        "nearPoiX": "0.0",
        "nearPoiY": "0.0",
        "intersectionName": "",
        "facilityType": "14",
        "facilityName": "",
        "turnType": 200,
        "pointType": "SP"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            126.92364851900282,
            37.556774278906374
          ],
          [
            126.92370962321058,
            37.556821496731125
          ],
          [
            126.92388182636283,
            37.55694093036831
          ]
        ]
      },
      "properties": {
        "index": 1,
        "lineIndex": 0,
        "name": "",
        "description": ", 28m",
        "distance": 28,
        "time": 27,
        "roadType": 24,
        "categoryRoadType": 0,
        "facilityType": "14",
        "facilityName": ""
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.92388182636283,
          37.55694093036831
        ]
      },
      "properties": {
        "index": 2,
        "pointIndex": 1,
        "name": "NH농협은행 동교동지점",
        "description": "NH농협은행 동교동지점 에서 우회전 후 34m 이동 ",
        "direction": "",
        "nearPoiName": "NH농협은행 동교동지점",
        "nearPoiX": "0.0",
        "nearPoiY": "0.0",
        "intersectionName": "",
        "facilityType": "14",
        "facilityName": "",
        "turnType": 13,
        "pointType": "GP"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            126.92388182636283,
            37.55694093036831
          ],
          [
            126.92402626132656,
            37.556810392577795
          ],
          [
            126.92413180498666,
            37.556890940655215
          ],
          [
            126.9241512475803,
            37.55689371845791
          ]
        ]
      },
      "properties": {
        "index": 3,
        "lineIndex": 1,
        "name": "",
        "description": ", 34m",
        "distance": 34,
        "time": 34,
        "roadType": 24,
        "categoryRoadType": 0,
        "facilityType": "14",
        "facilityName": ""
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.9241512475803,
          37.55689371845791
        ]
      },
      "properties": {
        "index": 4,
        "pointIndex": 2,
        "name": "홍대입구역  8번출구",
        "description": "홍대입구역  8번출구 에서 좌회전 후 양화로 을 따라 2m 이동 ",
        "direction": "",
        "nearPoiName": "홍대입구역  8번출구",
        "nearPoiX": "0.0",
        "nearPoiY": "0.0",
        "intersectionName": "홍대입구역8번출구",
        "facilityType": "11",
        "facilityName": "",
        "turnType": 12,
        "pointType": "GP"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            126.9241512475803,
            37.55689371845791
          ],
          [
            126.92417068993872,
            37.55690482862495
          ]
        ]
      },
      "properties": {
        "index": 5,
        "lineIndex": 2,
        "name": "양화로",
        "description": "양화로, 2m",
        "distance": 2,
        "time": 2,
        "roadType": 24,
        "categoryRoadType": 1,
        "facilityType": "11",
        "facilityName": ""
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.92417068993872,
          37.55690482862495
        ]
      },
      "properties": {
        "index": 6,
        "pointIndex": 3,
        "name": "NH농협은행 동교동지점",
        "description": "NH농협은행 동교동지점 에서 우회전 후 101m 이동 ",
        "direction": "",
        "nearPoiName": "NH농협은행 동교동지점",
        "nearPoiX": "0.0",
        "nearPoiY": "0.0",
        "intersectionName": "",
        "facilityType": "11",
        "facilityName": "",
        "turnType": 13,
        "pointType": "GP"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            126.92417068993872,
            37.55690482862495
          ],
          [
            126.92432900946721,
            37.556882611819624
          ],
          [
            126.92462898949327,
            37.556621536437405
          ],
          [
            126.92498729918248,
            37.55630213554828
          ]
        ]
      },
      "properties": {
        "index": 7,
        "lineIndex": 3,
        "name": "",
        "description": ", 101m",
        "distance": 101,
        "time": 77,
        "roadType": 21,
        "categoryRoadType": 1,
        "facilityType": "11",
        "facilityName": ""
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.92498729918248,
          37.55630213554828
        ]
      },
      "properties": {
        "index": 8,
        "pointIndex": 4,
        "name": "훼미리마트 홍대공원점",
        "description": "훼미리마트 홍대공원점 에서 우회전 후 보행자도로 을 따라 84m 이동 ",
        "direction": "",
        "nearPoiName": "훼미리마트 홍대공원점",
        "nearPoiX": "0.0",
        "nearPoiY": "0.0",
        "intersectionName": "",
        "facilityType": "11",
        "facilityName": "",
        "turnType": 13,
        "pointType": "GP"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            126.92498729918248,
            37.55630213554828
          ],
          [
            126.9248984191015,
            37.55627713686472
          ],
          [
            126.92448457209424,
            37.556129924355425
          ],
          [
            126.92430403566225,
            37.556035487662065
          ],
          [
            126.92433737003469,
            37.555891060609405
          ]
        ]
      },
      "properties": {
        "index": 9,
        "lineIndex": 4,
        "name": "보행자도로",
        "description": "보행자도로, 84m",
        "distance": 84,
        "time": 60,
        "roadType": 22,
        "categoryRoadType": 1,
        "facilityType": "11",
        "facilityName": ""
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.92433737003469,
          37.555891060609405
        ]
      },
      "properties": {
        "index": 10,
        "pointIndex": 5,
        "name": "누나홀닭",
        "description": "누나홀닭 에서 우회전 후 어울마당로 을 따라 9m 이동 ",
        "direction": "",
        "nearPoiName": "누나홀닭",
        "nearPoiX": "0.0",
        "nearPoiY": "0.0",
        "intersectionName": "",
        "facilityType": "11",
        "facilityName": "",
        "turnType": 13,
        "pointType": "GP"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            126.92433737003469,
            37.555891060609405
          ],
          [
            126.92426793388034,
            37.55582162299715
          ]
        ]
      },
      "properties": {
        "index": 11,
        "lineIndex": 5,
        "name": "어울마당로",
        "description": "어울마당로, 9m",
        "distance": 9,
        "time": 8,
        "roadType": 21,
        "categoryRoadType": 0,
        "facilityType": "11",
        "facilityName": ""
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.92426793388034,
          37.55582162299715
        ]
      },
      "properties": {
        "index": 12,
        "pointIndex": 6,
        "name": "세븐일레븐 홍대중앙점",
        "description": "세븐일레븐 홍대중앙점 에서 좌회전 후 371m 이동 ",
        "direction": "",
        "nearPoiName": "세븐일레븐 홍대중앙점",
        "nearPoiX": "0.0",
        "nearPoiY": "0.0",
        "intersectionName": "",
        "facilityType": "11",
        "facilityName": "",
        "turnType": 12,
        "pointType": "GP"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            126.92426793388034,
            37.55582162299715
          ],
          [
            126.92450124963094,
            37.55569108679681
          ],
          [
            126.92476511877935,
            37.555538331504835
          ],
          [
            126.92512064741551,
            37.55534391603109
          ],
          [
            126.92546228819367,
            37.55515783267321
          ],
          [
            126.92598447105019,
            37.55486620926375
          ],
          [
            126.92651498632408,
            37.55458014091298
          ],
          [
            126.92704550152,
            37.55429685001698
          ],
          [
            126.92757046205924,
            37.55399967174757
          ],
          [
            126.9277148956124,
            37.55391912814301
          ]
        ]
      },
      "properties": {
        "index": 13,
        "lineIndex": 6,
        "name": "",
        "description": ", 371m",
        "distance": 371,
        "time": 285,
        "roadType": 0,
        "categoryRoadType": 0,
        "facilityType": "11",
        "facilityName": ""
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.9277148956124,
          37.55391912814301
        ]
      },
      "properties": {
        "index": 14,
        "pointIndex": 7,
        "name": "",
        "description": "경유지 후 46m 이동 ",
        "direction": "",
        "nearPoiName": "",
        "nearPoiX": "0.0",
        "nearPoiY": "0.0",
        "intersectionName": "",
        "facilityType": "11",
        "facilityName": "",
        "turnType": 0,
        "pointType": "PP1"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            126.9277148956124,
            37.55391912814301
          ],
          [
            126.92813986354142,
            37.5536830520898
          ]
        ]
      },
      "properties": {
        "index": 15,
        "lineIndex": 7,
        "name": "",
        "description": ", 46m",
        "distance": 46,
        "time": 35,
        "roadType": 22,
        "categoryRoadType": 1,
        "facilityType": "11",
        "facilityName": ""
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.92813986354142,
          37.5536830520898
        ]
      },
      "properties": {
        "index": 16,
        "pointIndex": 8,
        "name": "디자인창조의아침",
        "description": "디자인창조의아침 에서 4시 방향 우회전 후 215m 이동 ",
        "direction": "",
        "nearPoiName": "디자인창조의아침",
        "nearPoiX": "0.0",
        "nearPoiY": "0.0",
        "intersectionName": "",
        "facilityType": "11",
        "facilityName": "",
        "turnType": 19,
        "pointType": "GP"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            126.92813986354142,
            37.5536830520898
          ],
          [
            126.92703719348953,
            37.55342750651533
          ],
          [
            126.9269094282989,
            37.55339417477136
          ],
          [
            126.92684276817901,
            37.553377508849685
          ],
          [
            126.92664834279007,
            37.55333028863888
          ],
          [
            126.9264955793292,
            37.55331639863127
          ],
          [
            126.92630948518114,
            37.55331639530126
          ],
          [
            126.9260261768881,
            37.55334416477975
          ],
          [
            126.92598173641613,
            37.553346941439344
          ],
          [
            126.92593729578735,
            37.553355273008535
          ],
          [
            126.92589841028618,
            37.55336082722232
          ],
          [
            126.9257734215225,
            37.5533663798954
          ]
        ]
      },
      "properties": {
        "index": 17,
        "lineIndex": 8,
        "name": "",
        "description": ", 215m",
        "distance": 215,
        "time": 153,
        "roadType": 22,
        "categoryRoadType": 1,
        "facilityType": "11",
        "facilityName": ""
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.9257734215225,
          37.5533663798954
        ]
      },
      "properties": {
        "index": 18,
        "pointIndex": 9,
        "name": "",
        "description": "경유지 후 와우산로 을 따라 132m 이동 ",
        "direction": "",
        "nearPoiName": "",
        "nearPoiX": "0.0",
        "nearPoiY": "0.0",
        "intersectionName": "",
        "facilityType": "11",
        "facilityName": "",
        "turnType": 0,
        "pointType": "PP2"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            126.9257734215225,
            37.5533663798954
          ],
          [
            126.92547067094945,
            37.55338026175211
          ],
          [
            126.92525680273162,
            37.55333859610324
          ],
          [
            126.92502904830212,
            37.55324693601951
          ],
          [
            126.92498460814379,
            37.553238602859935
          ],
          [
            126.92493739069609,
            37.55322193728625
          ],
          [
            126.92486239831604,
            37.5531941613964
          ],
          [
            126.92476518589602,
            37.55316083019936
          ],
          [
            126.92472074612971,
            37.55313860976579
          ],
          [
            126.92468463870198,
            37.55312472184571
          ],
          [
            126.92438466941691,
            37.55300528592197
          ]
        ]
      },
      "properties": {
        "index": 19,
        "lineIndex": 9,
        "name": "와우산로",
        "description": "와우산로, 132m",
        "distance": 132,
        "time": 125,
        "roadType": 21,
        "categoryRoadType": 1,
        "facilityType": "11",
        "facilityName": ""
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.92438466941691,
          37.55300528592197
        ]
      },
      "properties": {
        "index": 20,
        "pointIndex": 10,
        "name": "호아빈 홍대점",
        "description": "호아빈 홍대점 에서 좌측 횡단보도 후 보행자도로 을 따라 20m 이동 ",
        "direction": "",
        "nearPoiName": "호아빈 홍대점",
        "nearPoiX": "0.0",
        "nearPoiY": "0.0",
        "intersectionName": "홍익대앞",
        "facilityType": "15",
        "facilityName": "",
        "turnType": 212,
        "pointType": "GP"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            126.92438466941691,
            37.55300528592197
          ],
          [
            126.92448466484962,
            37.5528441953326
          ]
        ]
      },
      "properties": {
        "index": 21,
        "lineIndex": 10,
        "name": "보행자도로",
        "description": "보행자도로, 20m",
        "distance": 20,
        "time": 13,
        "roadType": 21,
        "categoryRoadType": 1,
        "facilityType": "15",
        "facilityName": ""
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.92448466484962,
          37.5528441953326
        ]
      },
      "properties": {
        "index": 22,
        "pointIndex": 11,
        "name": "세븐일레븐 홍대정문점",
        "description": "세븐일레븐 홍대정문점 에서 우회전 후 와우산로 을 따라 15m 이동 ",
        "direction": "",
        "nearPoiName": "세븐일레븐 홍대정문점",
        "nearPoiX": "0.0",
        "nearPoiY": "0.0",
        "intersectionName": "홍익대앞",
        "facilityType": "11",
        "facilityName": "",
        "turnType": 13,
        "pointType": "GP"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            126.92448466484962,
            37.5528441953326
          ],
          [
            126.92437356512016,
            37.552799754067905
          ],
          [
            126.92432912519702,
            37.55278308854395
          ]
        ]
      },
      "properties": {
        "index": 23,
        "lineIndex": 11,
        "name": "와우산로",
        "description": "와우산로, 15m",
        "distance": 15,
        "time": 11,
        "roadType": 21,
        "categoryRoadType": 1,
        "facilityType": "11",
        "facilityName": ""
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.92432912519702,
          37.55278308854395
        ]
      },
      "properties": {
        "index": 24,
        "pointIndex": 12,
        "name": "%EB%8F%84%EC%B0%A9",
        "description": "도착",
        "direction": "",
        "nearPoiName": "%EB%8F%84%EC%B0%A9",
        "nearPoiX": "0.0",
        "nearPoiY": "0.0",
        "intersectionName": "홍익대앞",
        "facilityType": "",
        "facilityName": "",
        "turnType": 201,
        "pointType": "EP"
      }
    }
  ]
}


const route = useRoute()
const markerList = sample.locations.map((item, index) => ({
  ...item, key: index
}))


const formattedRoom = computed(() => {
  return roomList.value.filter(item => item.roomId == roomId.value)[0]
})
onMounted(() => {
  getSummary(
    roomId.value,
    ({ data }) => {
      setSummary(data)
      console.log("뭐하냐고지금", data)
    },
    (error) => {
      console.log(error)
    },
  )

})
</script>

<style>
.history {}

.list {}

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
}
</style>
