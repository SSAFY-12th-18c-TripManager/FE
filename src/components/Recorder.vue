<template>
  <div class="item justify-center items-center text-white">
    <v-dialog v-model="modalFlag" max-width="500">
      <template v-slot:default="{ isActive }">
        <v-card title="요약 완료">
          <v-card-text>트매가 여행 계획을 요약해 작성했어요.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="확인" @click="modalFlag = false">확인</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

    <div class="pa-3 flex-row d-flex">
      <div @click="summary">
        <v-icon color="color5" class="mr-4" icon="mdi-chart-box-plus-outline" size="large"></v-icon>
      </div>
      <div @click="renew">
        <v-icon color="color5" icon="mdi-autorenew" size="large"></v-icon>
      </div>
    </div>
    <div class="d-flex flex-grow flex-column w-100 h-100">
      <div
        ref="ml"
        v-show="formattedMsgList"
        class="msgBox overflow-scroll position-absolute"
        :class="{ gra: msgList.length > 1 }"
      >
        <div v-for="msg in formattedMsgList">
          <div class="d-flex" :class="{ send: msg.isSender }">
            <div class="msg text-color2 font-weight-medium">{{ msg.content }}</div>
            <h5 class="text-color5 d-flex pt-2 align-end justify-end">
              <div class="mb-6">
                {{ msg.formattedTimestamp }}
              </div>
            </h5>
          </div>
        </div>
        <div v-show="!isPlaying && msgList.length > 1">
          <div class="d-flex" :class="{ send: isRecording }">
            <div class="msg text-color2 font-weight-medium">
              {{ recognizedText ? recognizedText : '... ' }}
            </div>
            <h5 class="text-color5 d-flex pt-2 align-end justify-end">
              <div class="mb-6"></div>
            </h5>
          </div>
        </div>
      </div>
      <div
        style="margin-top: auto"
        class="mb-10 pb-3 position-relative justify-center d-flex align-center flex-row items-center text-color3"
      >
        <div>
          <div class="position-relative micBox">
            <div id="container" v-if="isRecording && !isPlaying">
              <div id="gradient1"></div>
              <div id="gradient2"></div>
            </div>
            <button
              @click="toggleRecording"
              class="position-absolute d-flex items-center justify-center recordIcon"
              style="top: 0rem; left: 0rem; z-index: 11"
              :class="isRecording ? 'isRecording' : 'isNotRecording'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style="width: 50px; height: 50px"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  class="s0"
                  d="m12 14q0.6 0 1.1-0.2 0.6-0.3 1-0.7 0.4-0.4 0.7-1 0.2-0.5 0.2-1.1v-5c0-0.8-0.3-1.6-0.9-2.1-0.5-0.6-1.3-0.9-2.1-0.9-0.8 0-1.6 0.3-2.1 0.9-0.6 0.5-0.9 1.3-0.9 2.1v5q0 0.6 0.2 1.1 0.3 0.6 0.7 1 0.4 0.4 1 0.7 0.5 0.2 1.1 0.2z"
                />
                <path
                  class="s0"
                  d="m19 11c0 0-0.1-0.5-0.3-0.7q-0.3-0.3-0.7-0.3-0.4 0-0.7 0.3-0.3 0.3-0.3 0.7c0 1.3-0.5 2.6-1.5 3.5-0.9 1-2.2 1.5-3.5 1.5-1.3 0-2.6-0.5-3.5-1.5-1-0.9-1.5-2.2-1.5-3.5q0-0.4-0.3-0.7-0.3-0.3-0.7-0.3-0.4 0-0.7 0.3-0.3 0.3-0.3 0.7c0.1 1.6 0.7 3.1 1.8 4.3 1.1 1.2 2.5 2 4.1 2.2 1.6 0.3 3.2 0 4.6-0.8 1.4-0.8 2.5-2.1 3-3.6 0.1 0 0.5-2.1 0.5-2.1zm-7 7q-0.2 0-0.4 0.1-0.2 0.1-0.3 0.2-0.1 0.1-0.2 0.3-0.1 0.2-0.1 0.4v2q0 0.4 0.3 0.7 0.3 0.3 0.7 0.3 0.4 0 0.7-0.3 0.3-0.3 0.3-0.7v-2q0-0.2-0.1-0.4-0.1-0.2-0.2-0.3-0.1-0.1-0.3-0.2-0.2-0.1-0.4-0.1zm7-7zm-1 4"
                />
              </svg>
            </button>
          </div>
          <p v-show="!permissionGranted" class="mt-4" style="color: white">
            마이크 권한이 필요합니다.
          </p>
        </div>
        <div
          v-show="!isRecording"
          class="d-flex justify-center"
          @click="stopAudio"
          style="z-index: 30"
        >
          <h2 v-if="!isRecording && audioURL" class="position-absolute mt-8">■</h2>
          <av-circle
            class="position-absolute"
            :outline-width="0"
            :progress-width="2"
            outline-color="skyblue"
            bar-color="skyblue"
            progress-color="skyblue"
            :outline-meter-space="5"
            :playtime="false"
            playtime-color="transparent"
            :src="audioURL"
            :audio-controls="false"
            :muted="true"
          >
            브라우저가 오디오를 지원하지 않습니다.
          </av-circle>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import { useMsgStore } from '@/stores/msg'
import { storeToRefs } from 'pinia'
const msgStore = useMsgStore()
const userStore = useUserStore()
const { senderId } = storeToRefs(userStore)
const { setMsgList, pushMsgList } = msgStore
import { ref, onMounted, onUnmounted, watch, nextTick, computed } from 'vue'
import { sendQuestionVoice, sendQuestionText, getAllMessage, closeChat } from '@/api/record.js'
interface Msg {
  content: string
  senderId: number
  isSender: boolean
  timestamp: Date
  voice: Blob
}

const renew = () => {
  disconnectSocket()
  setMsgList([])
  // msgList.value.clean;
}
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

const { msgList } = storeToRefs(msgStore)
const isPlaying = ref(false)
const audioRef = ref<HTMLAudioElement | null>(null)
const audioContext = ref<AudioContext | null>(null)
const analyser = ref<AnalyserNode | null>(null)
const dataArray = ref<Uint8Array | null>(null)
const volume = ref(0)

// 상태 관리
const isRecording = ref(false)
const audioURL = ref<string>('')
const permissionGranted = ref(false)
const stream = ref<MediaStream | null>(null)
const mediaRecorderRef = ref<MediaRecorder | null>(null)
const audioChunks = ref<Blob[]>([])
const socket = ref<WebSocket | null>(null)
const ml = ref<HTMLElement[]>([]) // ref 배열 선언

const pps = () => {
  pushMsgList({
    isSender: true,
    content:
      '음, 오늘 날씨도 좋아서 혼자 여행하고 싶은데 어딜 가는게 좋을까?fdsfjdslkfejwklfndfgvkljsdenrhfgiu2pejwnrfmroieughwekupprghbn4iuejfthvbrgekufgewhrbgiuvkerghbrfuiewsfhqwau8oisefhwsfeo8ufdbw ' +
      Math.random(),
    timestamp: '2024-11-22T15:35:43',
  })
  // msgList.value.push()
}

function getRelativeTime(dateString) {
  const now = new Date()
  const past = new Date(dateString)
  const diff = now - past // 차이를 밀리초로 계산
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    return `${days}일 전`
  } else if (hours > 0) {
    return `${hours}시간 전`
  } else if (minutes > 0) {
    return `${minutes}분 전`
  } else {
    return `방금 전`
  }
}

const scrollToBottom = () => {
  if (ml.value) {
    ml.value.scrollTo({
      top: ml.value.scrollHeight,
      behavior: 'smooth',
    })
  }
}

const listlength = computed(() => {
  return msgList.value.length
})

watch(audioURL, (newValue) => {
  if (newValue && audioRef.value) {
    audioRef.value.pause()
    audioRef.value.oncanplay = () => {
      audioPlay()
    }
  }
})

watch(listlength, async () => {
  scrollToBottom()
  await nextTick()
})
const roomId = ref(0)

const stopAudio = () => {
  audioRef.value?.pause()
}
let intervalId
const updateTick = ref(0)
const formattedMsgList = computed(() => {
  return msgList.value.map((msg) => ({
    ...msg,
    formattedTimestamp: formatTimestamp(msg.timestamp),
  }))
})

onUnmounted(() => {
  clearInterval(intervalId)
  if (audioRef.value) {
    // 이벤트 리스너 제거
    audioRef.value.removeEventListener('play', () => {
      isPlaying.value = true
    })

    audioRef.value.removeEventListener('pause', () => {
      isPlaying.value = false
    })
  }
  cancelAnimationFrame(animationFrameId)
  audioContext.value?.close()
  socket.value?.close()
})

const answer = ref(null)
onMounted(() => {
  intervalId = setInterval(() => {
    updateTick.value++ // 이 변수의 변화로 인해 computed 속성이 재계산됨
  }, 60000) // 60,000ms = 1분

  scrollToBottom()
  audioRef.value = document.querySelector('audio')
  audioRef.value.muted = true
  if (audioRef.value) {
    audioRef.value.addEventListener('play', () => {
      isPlaying.value = true
    })

    audioRef.value.addEventListener('pause', () => {
      isPlaying.value = false
    })

    isPlaying.value = !audioRef.value.paused
  }

  requestPermission()

  getAllMessage(
    senderId.value,
    ({ data }) => {
      roomId.value = data

      connectWebSocket()
      // setMsgList(data)
    },
    (error) => {
      console.log(error)
    },
  )
  // return () => {
  //   socket.value?.close();
  // };
})
const speakAnswer = (res: string) => {
  const utterance = new SpeechSynthesisUtterance(res)
  utterance.lang = 'ko-KR' // 한국어 음성 설정
  utterance.pitch = 1 // 음성 톤
  utterance.rate = 1 // 음성 속도
  window.speechSynthesis.speak(utterance) // 음성 합성 시작
}
const recognizedText = ref('')

const startSpeechRecognition = () => {
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
    recognizedText.value = transcript // recognizedText에 텍스트 저장
  }

  recognition.onerror = (event) => {
    console.error('음성 인식 오류:', event.error)
  }

  recognition.onend = () => {
    if (recognizedText.value == '') return
    isRecording.value = false

    pushMsgList({
      isSender: true,
      content: recognizedText.value,
      timestamp: Date.now(),
    })

    sendVoiceWs({
      senderId: senderId.value,
      audio: recognizedText.value,
      history: JSON.stringify(msgList.value),
    })
    console.log('음성 인식이 종료되었습니다.')
    recognizedText.value = ''
  }
  // 음성 인식 시작
  recognition.start()
}

const modalFlag = ref(false)

const disconnectSocket = () => {
  if (socket.value) {
    socket.value.close()
  }
}

const reconnectSocket = () => {
  disconnectSocket() // 기존 소켓 종료
  connectWebSocket() // 새 소켓 연결
}

const connectWebSocket = () => {
  socket.value = new WebSocket(
    `wss://localhost:8080/ws/sender/${senderId.value}/room/${roomId.value}`,
  )
  socket.value.onopen = () => {
    console.log('WebSocket 연결됨')
    // statusMessage.value = 'WebSocket 연결 완료. 녹음 준비됨.';
  }

  socket.value.onmessage = (event) => {
    console.log('이벤트', event)
    if (typeof event.data === 'string') {
      console.log('서버 응답:', event.data)
      if (event.data.indexOf('```') != -1) {
        modalFlag.value = true
        disconnectSocket()
        console.log('요약이 완료되었어요!')
      } else {
        let d = JSON.parse(event.data)

        // speakAnswer(d.content) 이거 주석 풀면 프론트단에서 tts 재생됨
        msgList.value.push({
          isSender: false,
          content: d.content,
          timestamp: d.timestamp,
        })
      }
    } else if (event.data instanceof Blob) {
      console.log('바이너리일 경우! ')
      // const byteArray = new Uint8Array(event.data)
      try {
        //  const audioBlob = new Blob([byteArray], { type: 'audio/mpeg' }) // Blob 생성
        audioURL.value = URL.createObjectURL(event.data)
      } catch (error) {
        console.error('Blob 변환 중 오류 발생:', error)
      }
    }
  }

  socket.value.onclose = () => {
    console.log('WebSocket 연결 종료')
  }

  socket.value.onerror = (error) => {
    console.error('WebSocket 오류 발생:', error)
  }
}
/*
const sendQuestionVoiceVWS = (audioBlob) => {
  if (socket.value && socket.value.readyState === WebSocket.OPEN) {
    const payload = {
      endpoint: '/api/test',
      body: audioBlob,
    };
    socket.value.send(JSON.stringify(payload)); // 서버에 메시지 전송
    console.log('메시지 전송:', payload);
  } else {
    console.error('WebSocket이 연결되어 있지 않습니다.');
  }
};
*/

const calculateVolume = () => {
  if (analyser.value && dataArray.value) {
    analyser.value.getByteFrequencyData(dataArray.value)
    const sum = dataArray.value.reduce((a, b) => a + b, 0)
    let vol = sum / dataArray.value.length
    volume.value = vol >= 25 ? vol : 1
    adjustAnimationSpeed()
  }
}

let animationFrameId: number

let lastUpdateTime = 0
const updateInterval = 175
const startVolumeMonitoring = () => {
  console.log('startVolumeMonitoring')
  const update = (currentTime: number) => {
    if (currentTime - lastUpdateTime >= updateInterval) {
      calculateVolume() // 볼륨 계산
      lastUpdateTime = currentTime
    }
    animationFrameId = requestAnimationFrame(update)
  }
  animationFrameId = requestAnimationFrame(update)
}

const requestPermission = async () => {
  try {
    stream.value = await navigator.mediaDevices.getUserMedia({ audio: true })
    stream.value.getTracks().forEach((track) => track.stop())
    permissionGranted.value = true
  } catch (error) {
    console.error('Error accessing microphone:', error)
    permissionGranted.value = false
  }
}
const handleStartRecording = async () => {
  try {
    isRecording.value = true
    stream.value = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorderRef.value = new MediaRecorder(stream.value)
    audioChunks.value = []

    // AudioContext와 AnalyserNode 설정
    audioContext.value = new (window.AudioContext || (window as any).webkitAudioContext)()
    analyser.value = audioContext.value.createAnalyser()
    analyser.value.fftSize = 256

    const bufferLength = analyser.value.frequencyBinCount
    dataArray.value = new Uint8Array(bufferLength)

    const source = audioContext.value.createMediaStreamSource(stream.value)
    source.connect(analyser.value)
    startVolumeMonitoring()

    mediaRecorderRef.value.ondataavailable = (event) => {
      console.log('ondataavailable', event)
      // audioChunks.value.push(event.data)
    }

    mediaRecorderRef.value.onstop = () => {
      isRecording.value = false
    }
    //const audioBlob = new Blob(audioChunks.value, { type: 'audio/wav' })
    //
    //    blobToByteArray(audioBlob).then((byteArray) => {
    //});
    // saveByteArrayAsFile(byteArray, "bin.bin");
    //   const reader = new FileReader()
    //   reader.onloadend = () => {
    //    const base64String = reader.result.split(',')[1] // Base64 문자열 추출
    ////    sendVoiceWs({
    //   senderId: senderId.value,
    //audio: base64String,
    //    })
    //  }
    //  reader.readAsDataURL(audioBlob) // Base64로 변환된 파일 데이터
    // audioURL.value = "/public/audio.mp3";
    // audioRef.value?.play()
    //sendVoice(formData);
    // sendAudioWithJson(audioBlob);
    //  }

    //  mediaRecorderRef.value.start()
  } catch (error) {
    console.error('Error accessing microphone:', error)
  }
}

const blobToByteArray = async (blob) => {
  const arrayBuffer = await blob.arrayBuffer() // ArrayBuffer로 변환
  return new Uint8Array(arrayBuffer)
}

const sendVoiceWs = (formData) => {
  console.log('sendVoiceWs : formData', formData)
  if (!socket.value || socket.value.readyState !== WebSocket.OPEN) {
    console.error('WebSocket이 열려 있지 않습니다.')
    return
  }
  if (socket.value && formData) {
    socket.value.send(JSON.stringify(formData))
  }
}

const sendVoice = (formData: FormData) => {
  sendQuestionVoice(
    formData,
    ({ data }) => {
      sendText(data?.response)
    },
    (error) => {
      console.log(error)
    },
  )
}

const sendText = (response) => {
  msgList.value.push({ sender: true, text: response, index: 2 })
  sendQuestionText(
    response,
    ({ data }) => {
      console.log('sendQuestionText 성공', data)
      pushMsgList({
        senderId: data.senderId,
        isSender: data.isSender,
        content: data?.content,
        timestamp: data.timestamp,
      })
      try {
        const audioBlob: Blob = base64ToBlob(data?.answerBlob, 'audio/mpeg')
        audioURL.value = URL.createObjectURL(audioBlob)
      } catch (error) {
        console.error('Base64 to Blob 변환 중 오류 발생:', error)
      }
    },
    (error) => {
      console.log(error)
    },
  )
}
const downloadBlob = (blob: Blob, filename: string) => {
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
}

const saveByteArrayAsFile = (byteArray, fileName) => {
  const blob = new Blob([byteArray], { type: 'application/octet-stream' }) // Blob 생성
  const url = URL.createObjectURL(blob) // Blob URL 생성

  const a = document.createElement('a')
  a.href = url
  a.download = fileName // 파일 이름 지정
  document.body.appendChild(a)
  a.click() // 다운로드 트리거
  document.body.removeChild(a)

  URL.revokeObjectURL(url) // Blob URL 해제
}

const base64ToBlob = (base64: string, mimeType: string = 'audio/wav'): Blob => {
  const byteCharacters = atob(base64)
  const byteNumbers = Array.from(byteCharacters, (char) => char.charCodeAt(0))
  const byteArray = new Uint8Array(byteNumbers)
  return new Blob([byteArray], { type: mimeType })
}

const handleStopRecording = () => {
  mediaRecorderRef.value?.stop()
  isRecording.value = false
}
const audioPlay = () => {
  if (audioRef.value) {
    //   audioRef.value.pause()
    audioRef.value.muted = true
    audioRef.value.play().catch((err) => {
      console.error('Audio play failed:', err)
    })
    audioRef.value.muted = false
  }
}

const toggleRecording = () => {
  if (!permissionGranted.value) {
    alert('마이크 권한이 필요합니다.')
    return
  }
  if (isRecording.value) {
    handleStopRecording()
  } else {
    //  firstStart.value = true
    startSpeechRecognition()
    handleStartRecording()
    // isRecording.value = true
  }
}

watch(isPlaying, (val) => {
  console.log('녹음 중인가요?', val)

  if (!val && recognizedText.value == '' && permissionGranted.value && !isRecording.value) {
    console.log('네, 녹음중이에요')
    startSpeechRecognition()
  }
})
const sendAudioWithJson = (audioBlob: Blob) => {
  if (!socket.value || socket.value.readyState !== WebSocket.OPEN) {
    console.error('WebSocket이 열려 있지 않습니다.')
    return
  }

  audioBlob
    .arrayBuffer()
    .then((audioBuffer) => {
      console.log('전송할 음성 데이터 (ArrayBuffer):', audioBuffer)
      if (socket.value?.readyState === WebSocket.OPEN) {
        socket.value.send(audioBuffer)
        console.log('음성 데이터가 전송되었습니다.')
      } else {
        console.error('WebSocket이 연결되지 않았습니다.')
      }
    })
    .catch((error) => {
      console.error('음성 데이터 전송 중 오류 발생:', error)
    })
}
const speed = ref(4)
const animationStartTime = ref(Date.now())
const adjustAnimationSpeed = () => {
  const gradientElement = document.getElementById('gradient1')
  if (gradientElement) {
    const computedStyle = window.getComputedStyle(gradientElement)
    const animationDuration = parseFloat(computedStyle.animationDuration) * 1000 // 기존 속도 (ms 단위)
    const elapsedTime = (Date.now() - animationStartTime.value) % animationDuration // 경과 시간(ms)
    const progress = elapsedTime / animationDuration // 진행 비율 (0 ~ 1)

    // speed.value = volume.value === 1 ? 8 : 0.5;
    speed.value = volume.value === 1 ? 8 : Math.min(10, Math.round(8000 / volume.value) / 10) // 볼륨에 따라 속도 설정
    const newProgress = progress * 100 // 배경 위치를 %로 변환
    gradientElement.style.backgroundPosition = `${newProgress}% 0%`

    gradientElement.style.animationPlayState = 'paused' // 일시 정지
    gradientElement.style.animationDuration = `${speed.value}s` // 새 속도 적용
    gradientElement.style.animationDelay = '0s' // 초기 지연 시간 제거
    gradientElement.style.animationPlayState = 'running' // 다시 실행
    animationStartTime.value = Date.now()
  }
}

const summary = () => {
  pushMsgList({
    isSender: true,
    content: '지금까지 내용을 요약해줘',
    timestamp: Date.now(),
  })

  sendVoiceWs({
    senderId: senderId.value,
    audio: '지금까지 내용을 요약해줘',
    history: JSON.stringify(msgList.value),
  })
}

const redisEnd = () => {
  closeChat(
    senderId.value,
    (data) => {
      console.log(data)
    },
    (error) => {
      console.log(error)
    },
  )
}
</script>

<style>
.msgBox {
  width: 100vw;
  max-height: 70vh;
  height: 70vh;

  font-size: 0.875rem;
}
.gra {
  mask-image: linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 5%, rgb(73, 148, 144) 12%);
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: cover;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: cover;
}

.msg {
  padding: 1rem;
  width: 50vw;
  margin: 0 1rem 0rem 0;
  margin: 1rem;
  border-radius: 0.75rem;
  line-height: 1.5;
  word-break: break-all;
  /* text-shadow: 1px 1px 2px rgb(var(--v-theme-color2)); */
  background-color: rgb(var(--v-theme-color5));
  /* opacity: 95%; */

  mask-image: linear-gradient(rgb(73, 148, 144) 90%, rgba(0, 0, 0, 0.5) 95%, rgba(0, 0, 0, 0) 100%);
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: cover;
  font-size: 0.875rem;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: cover;
  /* text-shadow: 10px 0px rgb(var(--v-theme-color1)), 0px 1px rgb(var(--v-theme-color1)) 1px 0px rgb(var(--v-theme-color1)), 0px -1px rgb(var(--v-theme-color1)); */
}

.send {
  margin-left: auto;
  text-align: left;
  flex-direction: row-reverse;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.isRecording {
  padding: 3rem;
  transform: scale(1.25);
  transition: transform 0.3s ease-in-out;
  animation: pulse 1s infinite;
}

.isNotRecording {
  padding: 3rem;
  transform: scale(1);
}

.item {
  margin-top: 0rem;
  position: relative;
  /* height: 100vh; */
  height: calc(100vh - 3.5rem);
  width: 100vw;
}

.details {
  flex: 1;
  margin-left: 1rem;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;
  color: var(--color-text);
}

.micBox {
  height: 9rem;
  width: 9rem;
}

#gradient1 {
  background: linear-gradient(
    70deg,
    #15222a 0%,
    rgb(64, 101, 149) 25%,
    #15222a 50%,
    rgb(64, 101, 149) 75%,
    #15222a 100%
  );
  z-index: 0;
  animation: Scroll 4s linear infinite;
  background-size: 300% 200%;
}

@keyframes Scroll {
  0% {
    background-position: 0% 0%;
  }

  100% {
    background-position: 100% 33%;
  }
}

#gradient2 {
  background: radial-gradient(circle, #15222a 0%, rgb(207, 204, 205) 55%, rgb(0, 65, 139) 100%);
  mix-blend-mode: color-dodge;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  width: 100%;
  height: 100vh;
}

div {
  grid-column: 1;
  grid-row: 1;
}

#container {
  height: 9rem;
  width: 9rem;
  display: grid;
  mask-image: radial-gradient(
    circle,
    rgb(73, 148, 144) 50%,
    rgba(0, 0, 0, 0.5) 55%,
    rgba(0, 0, 0, 0) 70%
  );
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: cover;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: cover;
}
</style>
