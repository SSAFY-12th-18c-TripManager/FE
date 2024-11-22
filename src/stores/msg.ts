import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

/*

내 음성을 보내면, 텍스트를 전달받음
axios sendQuestionVoice -> response
request
{

userid : String
file : voiceFile


}



response
{
text : String
seq : Number
sender : true
date : timestamp
}


내 텍스트를 보내면, 음성 파일을 전달 받음 텍스트도 전달 받음
axios sendQuestionText -> response voice, text

{
text : String
seq : Number
sender : false
date : timestamp
voice : blob
}

텍스트를 전달받으면, 이걸 피니아에 저장을 함
저장을 하면, 이걸 실시간 바인딩으로 불러와 뷰에 뿌림


ai 텍스트를 전달받으면, 이걸 피니아에 저장을 함
저장을 하면, 이걸 실시간으로 바인딩으로 불러와 뷰를 뿌림
음성을 받으면, 다시 재생을 함
재생할 때, 닥치기 버튼만 있고 자동 재생함


*/
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
