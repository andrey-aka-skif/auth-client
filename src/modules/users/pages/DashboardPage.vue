<script setup>
import { logout } from '@/modules/auth/model/authService'

const onLogout = async () => {
  await logout()
}
</script>

<template>
  <h1>Dashboard</h1>

  <input type="submit" value="Logout" @click="onLogout" />
</template>
