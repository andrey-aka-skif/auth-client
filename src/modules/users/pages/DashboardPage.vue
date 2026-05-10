<script setup>
import { useAuth } from '../../../composables/useAuth'

const { logout } = useAuth()

const onLogout = async () => {
  await logout()
}

// import { AuthApiApi } from '../api-client/api'

// const apiInstance = new AuthApiApi()

// const {status,data} = await apiInstance.apiContentGet()

// console.log(status,data);
</script>

<template>
  <h1>Dashboard</h1>

  <input type="submit" value="Logout" @click="onLogout" />
</template>
