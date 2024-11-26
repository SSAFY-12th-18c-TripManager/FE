<template>
  <div>
    <div class="bg-white pl-2 pt-3">
      <router-link :to="{ name: 'room-report', params: { roomId: roomId } }">
        <v-btn :color="isReport ? 'color3' : 'color4'" :variant="isReport ? 'flat' : 'outlined'" class="ml-1">
          <v-icon :color="isReport ? 'color5' : 'color4'" size="x-large">mdi-invoice-text-clock-outline </v-icon>
          일정 보기
        </v-btn>
      </router-link>

      <router-link :to="{ name: 'room-map', params: { roomId: roomId } }">
        <v-btn :color="isMap ? 'color3' : 'color4'" :variant="isMap ? 'flat' : 'outlined'" class="ml-2">
          <v-icon :color="isMap ? 'color5' : 'color4'" size="x-large">mdi-map</v-icon>
          지도 보기 </v-btn>
      </router-link>
      <router-link :to="{ name: 'room-route', params: { roomId: roomId } }">
        <v-btn :color="isRoute ? 'color3' : 'color4'" :variant="isRoute ? 'flat' : 'outlined'" class="ml-2"> <v-icon
            :color="isRoute ? 'color5' : 'color4'" size="x-large">mdi-navigation-variant-outline</v-icon>
          길 안내 </v-btn>
      </router-link>
    </div>
    <router-view />
  </div>
</template>
<script setup lang="ts">
import { useMsgStore } from '@/stores/msg'
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
const msgStore = useMsgStore();
const { setRoomId } = msgStore

const route = useRoute()
if (typeof route?.params?.roomId === 'string') {
  console.log("route.params.roomId", route.params.roomId)
  setRoomId(route.params.roomId);
} else {
  // roomId.value = '' // fallback 값 설정
}

const isReport = computed(() => {
  return route.name == 'room-report'
})
const isMap = computed(() => {
  return route.name == 'room-map'
})
const isRoute = computed(() => {
  return route.name == 'room-route'
})

</script>
