import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const accessToken = ref('')
  const userId = ref('')
  const userEmail = ref('')

  function setAccessToken(value) {
    accessToken.value = value
  }

  function setUserId(value) {
    userId.value = value
  }

  function setUserEmail(value) {
    userEmail.value = value
  }

  return { accessToken, userId, userEmail, setAccessToken, setUserId, setUserEmail }
})
