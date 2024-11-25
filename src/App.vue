<template>
  <v-app>
    <!-- 레이아웃을 동적으로 선택 -->
    <component :is="layout">
      <router-view />
    </component>
  </v-app>
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import DefaultLayout from '@/layout/DefaultLayout.vue' // 기본 레이아웃
// 현재 라우트 가져오기
const route = useRoute()

// meta에서 레이아웃 가져오기
const layout = computed(() => route.meta.layout || DefaultLayout)
</script>

<style scoped></style>
