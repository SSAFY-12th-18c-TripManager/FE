<template>
  <div class="item justify-center items-center">
    <div class="d-flex flex-grow flex-column w-100 h-100">
      <div v-show="!audioURL" class="msgBox" style="position:absolute ">
        <div v-for="msg in msgList">
          <div class="msg" :class="{ 'send': msg.sender }"> {{ msg.text }}
          </div>
        </div>
      </div>
      <div style="position:relative" class="justify-center d-flex align-center flex-column items-center flex-grow-1">

        <button @click="toggleRecording"
          class="d-flex items-center justify-center recordIcon rounded-full bg-red-500 text-white"
          style="border-radius: 30rem;" :class="isRecording ? 'isRecording' : 'isNotRecording'">
          <svg xmlns="http://www.w3.org/2000/svg" class="" style="width:3rem;height:3rem" viewBox="0 0 24 24"
            fill="currentColor">
            <path d="M12 14a3 3 0 003-3V6a3 3 0 10-6 0v5a3 3 0 003 3z" />
            <path
              d="M19 11a1 1 0 00-2 0 5 5 0 01-10 0 1 1 0 00-2 0 7 7 0 0013.54 2.1A1 1 0 0019 13a1 1 0 00-1-2zM12 18a1 1 0 00-1 1v2a1 1 0 002 0v-2a1 1 0 00-1-1z" />
          </svg>
        </button>
        <p v-show="!permissionGranted" class="mt-4" style="color:white">마이크 권한이 필요합니다.</p>
        <audio v-show="audioURL" :src="audioURL" controls class="mt-10">
          브라우저가 오디오를 지원하지 않습니다.
        </audio>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { sendTalk } from '@/api/record.js'

interface Msg {
  sender: boolean;
  text: String;
  index: Number;
}

// 상태 관리
const isRecording = ref(false);
const audioURL = ref<string>("");
const permissionGranted = ref(false);

const mediaRecorderRef = ref<MediaRecorder | null>(null);
const audioChunks = ref<Blob[]>([]);
const msgList = ref<Msg[]>([]);
const socket = ref<WebSocket | null>(null);

// WebSocket 초기화
onMounted(() => {
  msgList.value.push({ sender: true, text: "음, 오늘 날씨도 좋아서 혼자 여행하고 싶은데 어딜 가는게 좋을까?", index: 0 });
  msgList.value.push({ sender: false, text: "잘 안 들려요. 다시 한 번 말씀해주시겠어요?", index: 1 })
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
      console.log("ondataavailable", event)
      audioChunks.value.push(event.data);
    };

    mediaRecorderRef.value.onstop = () => {
      const audioBlob = new Blob(audioChunks.value, { type: 'audio/wav' });
      console.log("!sendTalk!!!")
      sendTalk(audioBlob, (data) => {
        console.log(data)

      }, (error) => { console.log(error) })

      console.log("!!!sendTalk!!---")
      audioURL.value = URL.createObjectURL(audioBlob);
      sendAudioWithJson(audioBlob);
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
</script>

<style scoped>
.msgBox {
  width: 100vw;

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
  background-color: rgb(248, 164, 164);
  transform: scale(1.25);
  transition: transform 0.3s ease-in-out;
  animation: pulse 1s infinite;
}

.isNotRecording {
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

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

.recordIcon {
  height: 3.75rem;
  width: 3.75rem;
  padding: 0.35rem;
}

audio:hover,
audio:focus,
audio:active {
  -webkit-box-shadow: 15px 15px 20px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 15px 15px 20px rgba(0, 0, 0, 0.4);
  box-shadow: 15px 15px 20px rgba(0, 0, 0, 0.4);
  -webkit-transform: scale(1.05);
  -moz-transform: scale(1.05);
  transform: scale(1.05);
}


audio {
  -webkit-transition: all 0.5s linear;
  -moz-transition: all 0.5s linear;
  -o-transition: all 0.5s linear;
  transition: all 0.5s linear;
  -moz-box-shadow: 2px 2px 4px 0px #dd93cd;
  -webkit-box-shadow: 2px 2px 4px 0px #dd93cd;
  -moz-border-radius: 7px 7px 7px 7px;
  -webkit-border-radius: 1.75rem 1.75rem 1.75rem 1.75rem;
  /* border-radius: 7px 7px 7px 7px; */
}
</style>
