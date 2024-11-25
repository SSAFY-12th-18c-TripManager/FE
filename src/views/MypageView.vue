<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useField, useForm } from 'vee-validate'
const userStore = useUserStore()
const { userId, userEmail } = storeToRefs(userStore)

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name(value) {
      if (value?.length >= 2) return true

      return 'Name needs to be at least 2 characters.'
    },
    phone(value) {
      if (/^[0-9-]{7,}$/.test(value)) return true

      return 'Phone number needs to be at least 7 digits.'
    },
    email(value) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

      return 'Must be a valid e-mail.'
    },
    select(value) {
      if (value) return true

      return 'Select an item.'
    },
    checkbox(value) {
      if (value === '1') return true

      return 'Must be checked.'
    },
  },
})
const name = useField('name', '구정은')
const email = useField('email', '4050mirage@gmail.com')
const select = useField('프롬프트 스타일', '친근하고 간단하게')
const checkbox = useField('checkbox')

const items = ref(['친근하고 간단하게', '자세하게', '표를 사용', '국내 여행 위주'])

const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2))
})
</script>

<template>
  <main class="myPage h-100 w-100">
    <v-card color="color5" class="h-100 pa-5">
      <v-card-title> MyPage </v-card-title>

      <v-card-text>
        <form @submit.prevent="submit">
          <v-text-field
            v-model="name.value.value"
            :counter="10"
            :error-messages="name.errorMessage.value"
            label="이름"
          ></v-text-field>

          <v-text-field
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
            label="이메일"
          ></v-text-field>

          <v-select
            v-model="select.value.value"
            :error-messages="select.errorMessage.value"
            :items="items"
            label="프롬프트 스타일"
          ></v-select>

          <v-btn class="me-4" type="submit"> 수정 </v-btn>

          <v-btn @click="handleReset"> 확인 </v-btn>
        </form>
      </v-card-text>
    </v-card>
  </main>
</template>
<style scoped>
.myPage {
  background: linear-gradient('color2', 'color1');
}
</style>
