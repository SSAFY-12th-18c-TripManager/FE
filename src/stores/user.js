import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const accessToken = ref('')
  const userId = ref('')
  const userEmail = ref('')
  const name = ref('')
  const senderId = ref(0)

  function setAccessToken(value) {
    accessToken.value = value
  }

  function setUserId(value) {
    userId.value = value
  }

  function setUserEmail(value) {
    userEmail.value = value
  }

  function setSenderId(value) {
    senderId.value = value
  }

  function setName(value) {
    name.value = value
  }

  return {
    accessToken,
    userId,
    userEmail,
    senderId,
    name,
    setAccessToken,
    setUserId,
    setUserEmail,
    setSenderId,
    setName,
  }
})
