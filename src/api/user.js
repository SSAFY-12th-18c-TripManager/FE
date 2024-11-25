import { jsonAxios } from '@/util/http-commons'
const json = jsonAxios()

function userLogin(user, success, fail) {
  json.post(`/user/login`, user).then(success).catch(fail)
}

export { userLogin }
