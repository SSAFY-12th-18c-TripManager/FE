import { jsonAxios } from '@/util/http-commons'
const json = jsonAxios()

function getRoomList(senderId, success, fail) {
  json.get(`/chat/rooms/sender/${senderId}`).then(success).catch(fail)
}

function getRoutes(roomId, success, fail) {
  json.get(`/load/room/${roomId}`).then(success).catch(fail)
}

function getSummary(roomId, success, fail) {
  json.get(`/chat/summary/room/${roomId}`).then(success).catch(fail)
}
export { getRoomList, getSummary, getRoutes }
