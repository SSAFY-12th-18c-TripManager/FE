import axios from 'axios'
const { VITE_VUE_API_URL } = import.meta.env

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
    baseURL: VITE_VUE_API_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
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

export { localAxios, exAxios, audioAxios }
