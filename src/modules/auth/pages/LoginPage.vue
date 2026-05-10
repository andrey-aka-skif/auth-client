<script setup>
import { onMounted, ref } from 'vue'
import { useAuth } from '../../../composables/useAuth'
import { getApiContent } from '@/shared/api/generated'

const { login } = useAuth()

const email = ref('admin@test.com')
const password = ref('password123')

const onSubmit = async () => {
  await login(email.value, password.value)
}

onMounted(async () => {
  const { status, data } = await getApiContent()
  // eslint-disable-next-line
  console.log(status, data)
})
</script>

<template>
  {{ email }}:{{ password }}
  <div class="form-wrapper">
    <div class="form">
      <h1>Login</h1>

      <div class="form-line">
        <label for="email">e-mail</label>
        <input type="text" id="email" autocomplete="on" v-model="email" />
      </div>

      <div class="form-line">
        <label for="password">password</label>
        <input type="password" id="password" v-model="password" />
      </div>

      <input type="submit" value="Login" @click="onSubmit" />
    </div>
  </div>
</template>

<style scoped>
.form-wrapper {
  display: flex;
  justify-content: center;
}

.form {
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 1em;
  border: 1px grey solid;
  border-radius: 5px;
  padding: 1em;
}

.form-line input {
  width: 100%;
  box-sizing: border-box;
}
</style>
