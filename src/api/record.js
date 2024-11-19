import { audioAxios } from '@/util/http-commons'
const local = audioAxios()

function sendTalk(data, success, fail) {
  local.post(`/api/talk`, data).then(success).catch(fail)
}

export { sendTalk }
