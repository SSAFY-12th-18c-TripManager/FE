<template>
  <div>
    <v-btn @click="startSpeechRecognition">음성 인식 시작</v-btn>
    <p>음성 인식 텍스트: {{ recognizedText }}</p>
    <p>서버 응답: {{ serverResponse }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      recognizedText: '', // 변환된 텍스트
      serverResponse: '', // 서버로부터 받은 응답
    }
  },
  methods: {
    // 음성 인식을 시작하는 메소드
    startSpeechRecognition() {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
      recognition.lang = 'ko-KR' // 한국어로 설정
      recognition.interimResults = true // 중간 결과를 받지 않음 (최종 결과만)
      recognition.maxAlternatives = 1 // 최대로 받을 수 있는 인식 대안 수
      recognition.onstart = () => {
        console.log('음성 인식이 시작되었습니다.')
      }
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        console.log('인식된 텍스트:', transcript)
        this.recognizedText = transcript // recognizedText에 텍스트 저장
      }

      recognition.onerror = (event) => {
        console.error('음성 인식 오류:', event.error)
      }

      recognition.onend = () => {
        console.log('음성 인식이 종료되었습니다.')
      }
      // 음성 인식 시작
      recognition.start()
    },

    // 서버로 텍스트를 전송하는 메소드
    async sendTextToServer(text) {
      try {
        // 서버로 텍스트 전송 (POST 요청)
        const response = await axios.post('wss://localhost:8080/ws', {
          sendId: 3,
          answer: text, // 서버로 보낼 텍스트
        })

        this.serverResponse = response.data.answer // 서버 응답 저장
      } catch (error) {
        console.error('서버와 통신 중 오류 발생:', error)
      }
    },
  },
}
</script>
