import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
//

/*

내 음성을 보내면, 텍스트를 전달받음

텍스트를 전달받으면, 이걸 피니아에 저장을 함
저장을 하면, 이걸 실시간 바인딩으로 불러옴


내 텍스틀 받으면,


*/
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
