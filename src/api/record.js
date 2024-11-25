import { audioAxios, jsonAxios } from '@/util/http-commons'
const audio = audioAxios()
const json = jsonAxios()

function sendQuestionVoice(voice, success, fail) {
  audio.post(`/api/question`, voice).then(success).catch(fail)
}

function sendQuestionText(text, success, fail) {
  json.post(`/api/answer`, text).then(success).catch(fail)
}

function getAllMessage(senderId, success, fail) {
  json.get(`/chat/start/sender/${senderId}`).then(success).catch(fail)
}

function closeChat(senderId, success, fail) {
  json.get(`/chat/end/${senderId}`).then(success).catch(fail)
}
export { sendQuestionVoice, sendQuestionText, getAllMessage, closeChat }
