import { audioAxios } from '@/util/http-commons'
const audio = audioAxios()

function sendTalk(data, success, fail) {
  audio.post(`/api/talk`, data).then(success).catch(fail)
}

export { sendTalk }
