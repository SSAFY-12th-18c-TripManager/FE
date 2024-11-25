import { jsonAxios } from '@/util/http-commons'
const json = jsonAxios()

function getRoomList(senderId, success, fail) {
  json.get(`/chat/rooms/sender/${senderId}`).then(success).catch(fail)
}

function getRoom(roomId, success, fail) {
  json.get(`/room/${roomId}`).then(success).catch(fail)
}
export { getRoomList, getRoom }
