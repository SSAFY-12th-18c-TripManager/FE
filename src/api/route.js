import { tMapAxios } from '@/util/http-commons'
const tMap = tMapAxios()

function getPedestrianRoute(option, success, fail) {
  tMap.post(`/tmap/routes/pedestrian?version=1`, option).then(success).catch(fail)
}

export { getPedestrianRoute }
