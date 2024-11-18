<template>
  <div class="item">
    recorder?

    <div className="flex flex-col items-center">
      <button @click="toggleRecording"
        class="d-flex items-center justify-center w-20 h-20 rounded-full bg-red-500 text-white"
        style="border-radius: 30rem;" :class="isRecording ? 'isRecording' : 'isNotRecording'">
        <svg xmlns="http://www.w3.org/2000/svg" class="" style="width:3rem;height:3rem" viewBox="0 0 24 24"
          fill="currentColor">
          <path d="M12 14a3 3 0 003-3V6a3 3 0 10-6 0v5a3 3 0 003 3z" />
          <path
            d="M19 11a1 1 0 00-2 0 5 5 0 01-10 0 1 1 0 00-2 0 7 7 0 0013.54 2.1A1 1 0 0019 13a1 1 0 00-1-2zM12 18a1 1 0 00-1 1v2a1 1 0 002 0v-2a1 1 0 00-1-1z" />
        </svg>
      </button>
      <p v-show="!permissionGranted" className="text-red-500 mt-4">마이크 권한이 필요합니다.</p>
      <audio v-show="audioURL" controls className="mt-4">
        <source :src="audioURL" type="audio/wav" />
        브라우저가 오디오를 지원하고 있지 않습니다.
      </audio>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 상태 관리
const isRecording = ref(false);
const audioURL = ref<string | null>(null);
const permissionGranted = ref(false);

const mediaRecorderRef = ref<MediaRecorder | null>(null);
const audioChunks = ref<Blob[]>([]);
const socket = ref<WebSocket | null>(null);

// WebSocket 초기화
onMounted(() => {
  socket.value = new WebSocket('wss://localhost:80/audio');

  socket.value.onopen = () => console.log('WebSocket 연결됨');
  socket.value.onmessage = (event) => {
    console.log('서버에서 처리된 데이터 수신:', event.data);
  };
  socket.value.onclose = () => console.log('WebSocket 연결 종료');

  requestPermission();

  return () => {
    socket.value?.close();
  };
});

// 마이크 권한 요청
const requestPermission = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((track) => track.stop());
    permissionGranted.value = true;
  } catch (error) {
    console.error('Error accessing microphone:', error);
    permissionGranted.value = false;
  }
};

// 녹음 시작
const handleStartRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.value = new MediaRecorder(stream);
    audioChunks.value = [];

    mediaRecorderRef.value.ondataavailable = (event) => {
      audioChunks.value.push(event.data);
    };

    mediaRecorderRef.value.onstop = () => {
      const audioBlob = new Blob(audioChunks.value, { type: 'audio/wav' });
      audioURL.value = URL.createObjectURL(audioBlob);

      // JSON 데이터 예제
      const jsonData = {
        userid: 'user123',
        timestamp: new Date().toISOString(),
        sender: 'RecorderComponent',
        textMessage: 'Here is the recorded audio',
      };

      // WebSocket으로 음성 데이터와 JSON 데이터 전송
      sendAudioWithJson(audioBlob, jsonData);
    };

    mediaRecorderRef.value.start();
    isRecording.value = true;
  } catch (error) {
    console.error('Error accessing microphone:', error);
  }
};

// 녹음 종료
const handleStopRecording = () => {
  mediaRecorderRef.value?.stop();
  isRecording.value = false;
};

// 녹음 토글
const toggleRecording = () => {
  if (!permissionGranted.value) {
    alert('마이크 권한이 필요합니다.');
    return;
  }
  if (isRecording.value) {
    handleStopRecording();
  } else {
    handleStartRecording();
  }
};

// 음성 및 JSON 데이터를 WebSocket으로 전송
const sendAudioWithJson = (audioBlob: Blob, jsonData: object) => {
  if (!socket.value || socket.value.readyState !== WebSocket.OPEN) {
    console.error('WebSocket이 열려 있지 않습니다.');
    return;
  }

  const jsonString = JSON.stringify(jsonData);
  const delimiter = '--SPLIT--';

  audioBlob.arrayBuffer().then((audioBuffer) => {
    const jsonBytes = new TextEncoder().encode(jsonString + delimiter);
    const audioBytes = new Uint8Array(audioBuffer);

    const combinedBuffer = new Uint8Array(jsonBytes.byteLength + audioBytes.byteLength);
    combinedBuffer.set(jsonBytes, 0);
    combinedBuffer.set(audioBytes, jsonBytes.byteLength);

    console.log('전송할 데이터 (ArrayBuffer):', combinedBuffer);

    if (socket.value?.readyState === WebSocket.OPEN) {
      socket.value.send(combinedBuffer.buffer);
      console.log('데이터가 전송되었습니다.');
    } else {
      console.error('WebSocket이 연결되지 않았습니다.');
    }
  });
};
</script>

<style scoped>
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
  background-color: red;
  transform: scale(1.25);
  transition: transform 0.3s ease-in-out;
  animation: pulse 1s infinite;
}

.isNotRecording {
  transform: scale(1.00);

}

.item {
  margin-top: 2rem;
  display: flex;
  position: relative;
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

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }

  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  .item:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>
