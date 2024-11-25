<template>
  <main class="detailMain h-100 text-white ">

    <v-card color="color5" class="vcard">
      <v-card-title>
        트립 매니저
      </v-card-title>
      <v-card-text>
        <div class="markdown prose w-full break-words dark:prose-invert light">
          <p>이제 여행 계획이 완성되었습니다! 전체 일정을 정리해서 공유할게요.</p>
          <hr>
          <p><strong>여행 날짜:</strong> 오늘부터 수요일까지<br><strong>참여 인원:</strong> 2명 (나, 동열)<br><strong>예산:</strong> 3만 원</p>
          <hr>
          <h3><strong>일정표</strong></h3>
          <table>
            <thead>
              <tr>
                <th><strong>시간</strong></th>
                <th><strong>장소</strong></th>
                <th><strong>활동/세부내용</strong></th>
                <th><strong>비고</strong></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>09:00-10:00</strong></td>
                <td>역삼역 주변</td>
                <td>도착 및 간단한 휴식</td>
                <td>지하철 이용</td>
              </tr>
              <tr>
                <td><strong>10:00-12:00</strong></td>
                <td>카페 413프로젝트</td>
                <td>브런치 및 커피타임</td>
                <td>추천 카페</td>
              </tr>
              <tr>
                <td><strong>12:00-14:00</strong></td>
                <td>역삼문화공원</td>
                <td>산책 및 사진 촬영</td>
                <td>날씨 확인 필요</td>
              </tr>
              <tr>
                <td><strong>14:00-16:00</strong></td>
                <td>쏭타이</td>
                <td>점심 식사</td>
                <td>비건 메뉴 선택</td>
              </tr>
              <tr>
                <td><strong>16:00-18:00</strong></td>
                <td>삼성 강남</td>
                <td>전자기기 체험</td>
                <td>무료 입장</td>
              </tr>
              <tr>
                <td><strong>18:00-20:00</strong></td>
                <td>미로정</td>
                <td>저녁 및 마무리</td>
                <td>예약 필요 없음</td>
              </tr>
              <tr>
                <td><strong>20:00 이후</strong></td>
                <td>역삼역</td>
                <td>귀가</td>
                <td>지하철 이용</td>
              </tr>
            </tbody>
          </table>
          <hr>
          <h3><strong>추가 메모</strong></h3>
          <ul>
            <li><strong>필요한 준비물:</strong> 없음</li>
            <li><strong>사전 예약 사항:</strong> 없음</li>
            <li><strong>특별히 주의할 점:</strong> 쌀쌀한 날씨 대비 따뜻한 옷차림</li>
          </ul>
          <hr>
          <h3><strong>비용 정리</strong></h3>
          <table>
            <thead>
              <tr>
                <th><strong>항목</strong></th>
                <th><strong>금액</strong></th>
                <th><strong>비고</strong></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>교통비</td>
                <td>5,000원</td>
                <td>왕복 지하철 이용</td>
              </tr>
              <tr>
                <td>식사비</td>
                <td>65,000원</td>
                <td>브런치, 점심, 저녁</td>
              </tr>
              <tr>
                <td>체험/입장료</td>
                <td>없음</td>
                <td>삼성 강남 무료 체험</td>
              </tr>
              <tr>
                <td>기타 비용</td>
                <td>0원</td>
                <td>없음</td>
              </tr>
            </tbody>
          </table>
          <hr>
          <p>이제 계획에 만족하신다면, 실행만 하면 됩니다! 😊 추가로 궁금한 사항이 있으면 알려주세요!</p>
        </div>
      </v-card-text>
    </v-card>
    <router-link :to="{ name: 'history-list' }">
      <h4 class="pt-1 text-color2">
        페이지 리스트로 이동
      </h4>
    </router-link>
  </main>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const msgList = ref(null);


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
  border-image: linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%);
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
