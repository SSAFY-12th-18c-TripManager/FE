import { localAxios } from '@/util/http-commons'
const local = localAxios()

function sendTalk(data, success, fail) {
  local.post(`/api/talk`, data).then(success).catch(fail)
}

export { sendTalk }
