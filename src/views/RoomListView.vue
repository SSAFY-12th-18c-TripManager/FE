<template>
  <div class="w-100 h-100 overflow-auto history">
    <h3 class="bg-color3 pt-5 pl-5 pb-3">과거 대화 내역</h3>
    <div style="height: 85vh">
      <router-view />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useMsgStore } from '@/stores/msg'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { getRoomList } from '@/api/room.js'
const msgStore = useMsgStore()
const userStore = useUserStore()
const { senderId } = storeToRefs(userStore)
const { setRoomList } = msgStore
import { onMounted } from 'vue'
onMounted(() => {
  getRoomList(
    senderId.value,
    ({ data }) => {
      setRoomList(data)
    },
    (error) => {
      console.log(error)
    },
  )
})
</script>

<style scoped>
.history {
  /* background-color: #255a62; */
}
</style>
