import axios from 'axios'
const { VITE_VUE_API_URL, VITE_TMAP_SERVICE_KEY } = import.meta.env

function localAxios() {
  const instance = axios.create({
    baseURL: VITE_VUE_API_URL,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  })
  return instance
}

function audioAxios() {
  const instance = axios.create({
    baseURL: '/tmap-api',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return instance
}

function jsonAxios() {
  const instance = axios.create({
    baseURL: VITE_VUE_API_URL,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  })
  return instance
}

function exAxios() {
  const instance = axios.create({
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  })
  return instance
}

function naverAxios(accessToken) {
  return axios.create({
    baseURL: '/naver-api',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
  })
}

function tMapAxios() {
  console.log('VITE_TMAP_SERVICE_KEY, ', VITE_TMAP_SERVICE_KEY)
  return axios.create({
    baseURL: '/tmap-api',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      appKey: VITE_TMAP_SERVICE_KEY,
    },
  })
}
export { localAxios, exAxios, audioAxios, jsonAxios, naverAxios, tMapAxios }
