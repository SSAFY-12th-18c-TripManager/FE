<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { storeToRefs } from "pinia";
const userStore = useUserStore();
const { userId, userEmail } = storeToRefs(userStore);
</script>

<template>
  <main class="myPage h-100">
    <h1>Mypage</h1>

    <div>
      이름 : 구정은
    </div>

    <div>
      아이디 : {{ userId }}
    </div>

    <div>
      이메일 : {{ userEmail }}
    </div>

    <div>
      기본 프롬프트 : "친근하고 짧게 이야기해주세요."
    </div>
  </main>
</template>
<style scoped>
.myPage {
  background: linear-gradient('color2', 'color1');
}
</style>
