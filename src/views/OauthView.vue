<template>
  <div>로그인 처리 중...</div>
  <div v-if="userId">{{ userId }} 님 안녕? {{ userEmail }}로 로그인한다?</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { userLogin } from '@/api/user.js'

import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
const userStore = useUserStore()
const { userId, userEmail } = storeToRefs(userStore)
const { setUserId, setUserEmail, setName, setSenderId } = userStore
import { onMounted } from 'vue'
import { getNaverEmail } from '@/api/auth.ts'

const router = useRouter()

const processCallback = () => {
  const hash = window.location.hash // URL의 해시 부분 가져오기
  const params = new URLSearchParams(hash.slice(1)) // '#' 제거 후 파싱
  const accessToken = params.get('access_token')
  console.log('params', params)

  if (!accessToken) {
    console.error('Access Token이 누락되었습니다.')
  } else {
    getNaverEmail(
      accessToken,
      ({ response }) => {
        userLogin(
          {
            naverId: response.id,
            email: response.email,
          },
          ({ data }) => {
            console.log('로그인 성공', data)
            setUserId(data.naverId)
            setUserEmail(data.email)
            setName(data.name)
            setSenderId(data.senderId)

            router.push({ name: 'recorder' })
          },
          (error) => {
            console.log(error)
          },
        )
      },
      (error) => {
        console.error(error)
      },
    )
  }
}

onMounted(() => {
  processCallback()
})
</script>
