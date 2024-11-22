<template>
  <div class="item justify-center items-center text-white">
    <div class="d-flex flex-grow flex-column w-100 h-100">
      <div ref="ml" v-show="msgList" class="msgBox overflow-scroll position-absolute"> {{ answer }}
        <div v-for="msg in msgList">
          <div class="msg" :class="{ 'send': msg.isSender }"> {{ msg.content }}
          </div>
        </div>
      </div>
      <div style="margin-top:25rem;"
        class="position-relative justify-center d-flex align-center flex-column items-center flex-grow-1">
        <div class="position-relative micBox">
          <div id="container" v-if="isRecording && !isPlaying">
            <div id="gradient1"> </div>
            <div id="gradient2"> </div>
          </div>
          <button @click="toggleRecording"
            class="position-absolute  d-flex items-center justify-center recordIcon  text-white"
            style="top:0rem; ; left:0rem; z-index:11" :class="isRecording ? 'isRecording' : 'isNotRecording'">
            <svg xmlns="http://www.w3.org/2000/svg" style="width:50px;height:50px" viewBox="0 0 24 24"
              fill="currentColor">
              <path class="s0"
                d="m12 14q0.6 0 1.1-0.2 0.6-0.3 1-0.7 0.4-0.4 0.7-1 0.2-0.5 0.2-1.1v-5c0-0.8-0.3-1.6-0.9-2.1-0.5-0.6-1.3-0.9-2.1-0.9-0.8 0-1.6 0.3-2.1 0.9-0.6 0.5-0.9 1.3-0.9 2.1v5q0 0.6 0.2 1.1 0.3 0.6 0.7 1 0.4 0.4 1 0.7 0.5 0.2 1.1 0.2z" />
              <path class="s0"
                d="m19 11c0 0-0.1-0.5-0.3-0.7q-0.3-0.3-0.7-0.3-0.4 0-0.7 0.3-0.3 0.3-0.3 0.7c0 1.3-0.5 2.6-1.5 3.5-0.9 1-2.2 1.5-3.5 1.5-1.3 0-2.6-0.5-3.5-1.5-1-0.9-1.5-2.2-1.5-3.5q0-0.4-0.3-0.7-0.3-0.3-0.7-0.3-0.4 0-0.7 0.3-0.3 0.3-0.3 0.7c0.1 1.6 0.7 3.1 1.8 4.3 1.1 1.2 2.5 2 4.1 2.2 1.6 0.3 3.2 0 4.6-0.8 1.4-0.8 2.5-2.1 3-3.6 0.1 0 0.5-2.1 0.5-2.1zm-7 7q-0.2 0-0.4 0.1-0.2 0.1-0.3 0.2-0.1 0.1-0.2 0.3-0.1 0.2-0.1 0.4v2q0 0.4 0.3 0.7 0.3 0.3 0.7 0.3 0.4 0 0.7-0.3 0.3-0.3 0.3-0.7v-2q0-0.2-0.1-0.4-0.1-0.2-0.2-0.3-0.1-0.1-0.3-0.2-0.2-0.1-0.4-0.1zm7-7zm-1 4" />
            </svg>
          </button>
        </div>
        <p v-show="!permissionGranted" class="mt-4" style="color:white">마이크 권한이 필요합니다.</p>
        {{ isRecording }}
        <div v-show="!isRecording" class="d-flex justify-center" @click="stopAudio" style="z-index:30">
          <h2 v-if="!isRecording" class="position-absolute mt-8">■</h2>
          <av-circle class="position-absolute" :outline-width="0" :progress-width="2" outline-color="hotpink"
            bar-color="hotpink" progress-color="hotpink" :outline-meter-space="5" :playtime="false"
            playtime-color="transparent" :src="audioURL" :audio-controls="true">
            브라우저가 오디오를 지원하지 않습니다.
          </av-circle>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch, nextTick, computed } from 'vue';
import { sendQuestionVoice, sendQuestionText } from '@/api/record.js'
import { Client } from '@stomp/stompjs';
interface Msg {
  content: String,
  senderId: Number,
  isSender: Boolean,
  timestamp: Date,
  voice: Blob
}

const firstStart = ref(false);
const isPlaying = ref(false);
const audioRef = ref<HTMLAudioElement | null>(null);
const audioContext = ref<AudioContext | null>(null);
const analyser = ref<AnalyserNode | null>(null);
const dataArray = ref<Uint8Array | null>(null);
const volume = ref(0);

// 상태 관리
const isRecording = ref(false);
const audioURL = ref<string>("");
const permissionGranted = ref(false);
const stream = ref<MediaStream | null>(null);
const mediaRecorderRef = ref<MediaRecorder | null>(null);
const audioChunks = ref<Blob[]>([]);
const msgList = ref<Msg[]>([]);
const socket = ref<WebSocket | null>(null);
const ml = ref<HTMLElement[]>([]); // ref 배열 선언

const client = ref<Client | null>(null);
const pps = () => {
  msgList.value.push({ isSender: true, content: "음, 오늘 날씨도 좋아서 혼자 여행하고 싶은데 어딜 가는게 좋을까? " + Math.random(), index: 0 });
}


const scrollToBottom = () => {
  if (ml.value) {
    ml.value.scrollTo({
      top: ml.value.scrollHeight,
      behavior: "smooth",
    });
  }
};

const listlength = computed(() => {
  return msgList.value.length
})
watch(
  listlength,
  async () => {
    scrollToBottom();
    await nextTick();
  }
)

const stopAudio = () => {
  audioRef.value?.pause();
}
onUnmounted(() => {
  if (audioRef.value) {
    // 이벤트 리스너 제거
    audioRef.value.removeEventListener("play", () => {
      isPlaying.value = true;
    });

    audioRef.value.removeEventListener("pause", () => {
      isPlaying.value = false;
    });
  }
  cancelAnimationFrame(animationFrameId);
  audioContext.value?.close();
});

import SockJS from 'sockjs-client';
const answer = ref(null);
onMounted(() => {
  client.value = new Client({
    webSocketFactory: () => new SockJS('https://localhost:80/tm/ws'), // SockJS 설정
    debug: function (str) {
      console.log(str);
    },
    onConnect: () => {
      console.log('STOMP 연결 성공');
      client.value.subscribe('/topic/3', function (receive) {
        console.log('/topic/3', receive);
        msgList.value.push({ senderId: receive.senderId, isSender: receive.isSender, content: receive?.content, timestamp: receive.timestamp });
        if (!receive.isSender) {
          console.log("보이스 추가")
          try {
            const audioBlob: Blob = base64ToBlob(receive?.voice, "audio/mpeg");
            audioURL.value = URL.createObjectURL(audioBlob);
          } catch (error) {
            console.error("Base64 to Blob 변환 중 오류 발생:", error);
          }
        }

        answer.value = receive.body;  // 서버에서 받은 메시지 처리
      });
    },
    onStompError: (frame) => {
      console.error('STOMP 오류:', frame.headers['message']);
    },
  });
  client.value.activate();

  scrollToBottom();
  audioRef.value = document.querySelector('audio')
  if (audioRef.value) {
    audioRef.value.addEventListener("play", () => {
      isPlaying.value = true;
    });

    audioRef.value.addEventListener("pause", () => {
      isPlaying.value = false;
    });

    isPlaying.value = !audioRef.value.paused;
  }

  //socket.value = new WebSocket('wss://localhost:80/ws');
  //socket.value.onopen = () => console.log('WebSocket 연결됨');
  // socket.value.onmessage = (event) => {
  //   console.log('서버에서 처리된 데이터 수신:', event.data);
  // };
  // socket.value.onclose = () => console.log('WebSocket 연결 종료');
  requestPermission();

  // return () => {
  //   socket.value?.close();
  // };

});

const calculateVolume = () => {
  if (analyser.value && dataArray.value) {
    analyser.value.getByteFrequencyData(dataArray.value);
    const sum = dataArray.value.reduce((a, b) => a + b, 0);
    let vol = sum / dataArray.value.length;
    volume.value = vol >= 25 ? vol : 1;
    adjustAnimationSpeed();
  }
};

let animationFrameId: number;

let lastUpdateTime = 0;
const updateInterval = 175;
const startVolumeMonitoring = () => {
  console.log("startVolumeMonitoring");
  const update = (currentTime: number) => {
    if (currentTime - lastUpdateTime >= updateInterval) {
      calculateVolume(); // 볼륨 계산
      lastUpdateTime = currentTime;
    }
    animationFrameId = requestAnimationFrame(update);
  };
  animationFrameId = requestAnimationFrame(update);
};

const requestPermission = async () => {
  try {
    stream.value = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.value.getTracks().forEach((track) => track.stop());
    permissionGranted.value = true;
  } catch (error) {
    console.error('Error accessing microphone:', error);
    permissionGranted.value = false;
  }
};

const handleStartRecording = async () => {
  try {
    stream.value = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.value = new MediaRecorder(stream.value);
    audioChunks.value = [];

    // AudioContext와 AnalyserNode 설정
    audioContext.value = new (window.AudioContext || (window as any).webkitAudioContext)();
    analyser.value = audioContext.value.createAnalyser();
    analyser.value.fftSize = 256;

    const bufferLength = analyser.value.frequencyBinCount;
    dataArray.value = new Uint8Array(bufferLength);

    // MediaStreamAudioSourceNode 생성 및 연결
    const source = audioContext.value.createMediaStreamSource(stream.value);
    source.connect(analyser.value);
    startVolumeMonitoring();

    mediaRecorderRef.value.ondataavailable = (event) => {
      console.log("ondataavailable", event)
      audioChunks.value.push(event.data);
    };

    mediaRecorderRef.value.onstop = () => {
      const audioBlob = new Blob(audioChunks.value, { type: 'audio/wav' });
      const formData = new FormData();
      formData.append("file", audioBlob, "audio.wav"); // "audio.wav"는 서버에서 파일명을 필요로 할 경우 사용
      formData.append('senderId', '3');

      // FileReader를 사용하여 Base64로 변환
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1]; // Base64 문자열 추출
        console.log("Base64 Audio String:", base64String);

        // 필요한 작업 예시: 서버 전송
        sendVoiceWs({
          senderId: '3',
          file: base64String, // Base64로 변환된 데이터
        });
      };

      // Blob 데이터를 Base64로 읽기
      reader.readAsDataURL({
        senderId: '3',
        file: base64String, // Base64로 변환된 파일 데이터
      });



      sendVoiceWs(formData);
      // audioURL.value = "/public/audio.mp3";
      // audioRef.value?.play()
      //sendVoice(formData);
      // sendAudioWithJson(audioBlob);
    };

    mediaRecorderRef.value.start();
    isRecording.value = true;
  } catch (error) {
    console.error('Error accessing microphone:', error);
  }
};

const sendVoiceWs = (formData: FormData) => {
  console.log("formData", formData)
  if (!client.value?.connected) {
    console.error('STOMP 연결이 활성화되지 않았습니다.');
    return;
  }
  if (client.value && formData) {
    client.value.publish({
      destination: '/app/query',
      body: formData
    });
  }
};

const sendVoice = (formData: FormData) => {
  sendQuestionVoice(formData, ({ data }) => {
    sendText(data?.response)
  }, (error) => { console.log(error) })
}

const sendText = (response) => {
  msgList.value.push({ sender: true, text: response, index: 2 });
  sendQuestionText(response, ({ data }) => {
    console.log("sendQuestionText 성공", data)
    msgList.value.push({ senderId: data.senderId, isSender: data.isSender, content: data?.content, timestamp: data.timestamp });
    try {
      const audioBlob: Blob = base64ToBlob(data?.answerBlob, "audio/mpeg");
      audioURL.value = URL.createObjectURL(audioBlob);
      // downloadBlob(audioBlob, "audio.mp3");
    } catch (error) {
      console.error("Base64 to Blob 변환 중 오류 발생:", error);
    }
  }, (error) => { console.log(error) });
}
const downloadBlob = (blob: Blob, filename: string) => {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};

const base64ToBlob = (base64: string, mimeType: string = "audio/wav"): Blob => {
  const byteCharacters = atob(base64);
  const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}

const handleStopRecording = () => {
  mediaRecorderRef.value?.stop();
  isRecording.value = false;
};

const toggleRecording = () => {
  if (!permissionGranted.value) {
    alert('마이크 권한이 필요합니다.');
    return;
  }
  if (isRecording.value) {
    handleStopRecording();
  } else {
    firstStart.value = true;
    handleStartRecording();
  }
};

const sendAudioWithJson = (audioBlob: Blob) => {
  if (!socket.value || socket.value.readyState !== WebSocket.OPEN) {
    console.error('WebSocket이 열려 있지 않습니다.');
    return;
  }

  audioBlob.arrayBuffer().then((audioBuffer) => {
    console.log('전송할 음성 데이터 (ArrayBuffer):', audioBuffer);
    if (socket.value?.readyState === WebSocket.OPEN) {
      socket.value.send(audioBuffer);
      console.log('음성 데이터가 전송되었습니다.');
    } else {
      console.error('WebSocket이 연결되지 않았습니다.');
    }
  }).catch((error) => {
    console.error('음성 데이터 전송 중 오류 발생:', error);
  });
};
const speed = ref(4);
const animationStartTime = ref(Date.now());
const adjustAnimationSpeed = () => {
  const gradientElement = document.getElementById("gradient1");
  if (gradientElement) {
    const computedStyle = window.getComputedStyle(gradientElement);
    const animationDuration = parseFloat(computedStyle.animationDuration) * 1000; // 기존 속도 (ms 단위)
    const elapsedTime = (Date.now() - animationStartTime.value) % animationDuration; // 경과 시간(ms)
    const progress = elapsedTime / animationDuration; // 진행 비율 (0 ~ 1)

    // speed.value = volume.value === 1 ? 8 : 0.5;
    speed.value = volume.value === 1 ? 8 : Math.min(10, Math.round(8000 / volume.value) / 10); // 볼륨에 따라 속도 설정
    console.log("이거대체몇번실행됨")
    const newProgress = progress * 100; // 배경 위치를 %로 변환
    gradientElement.style.backgroundPosition = `${newProgress}% 0%`;

    gradientElement.style.animationPlayState = "paused"; // 일시 정지
    gradientElement.style.animationDuration = `${speed.value}s`; // 새 속도 적용
    gradientElement.style.animationDelay = "0s"; // 초기 지연 시간 제거
    gradientElement.style.animationPlayState = "running"; // 다시 실행
    animationStartTime.value = Date.now();
  }
}
</script>

<style>
.msgBox {
  width: 100vw;
  max-height: 70vh;
  height: 55vh;
}

.msg {
  padding: 1rem;
  width: 50vw;
  color: white;
  margin: 0 1rem 0rem 0;
  text-shadow: -1px 0px rgb(39, 39, 39), 0px 1px rgb(70, 70, 69), 1px 0px rgb(78, 78, 78), 0px -1px rgb(39, 39, 39);
}

.send {
  margin-left: auto;
  text-align: right;
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
  transform: scale(1.00);
}

.item {
  margin-top: 2rem;
  position: relative;
  height: calc(100vh - 10rem);
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
  background: linear-gradient(70deg, rgb(10, 3, 15) 0%, rgb(64, 69, 149) 25%, rgb(10, 3, 15) 50%, rgb(64, 69, 149) 75%, rgb(10, 3, 15) 100%);
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
  background: radial-gradient(circle, rgb(0, 0, 0) 0%, rgb(207, 204, 205) 55%, rgb(139, 0, 139) 100%);
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
  mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0.5) 55%, rgba(0, 0, 0, 0) 70%);
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: cover;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: cover;
}
</style>
