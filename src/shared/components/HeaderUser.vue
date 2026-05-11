<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/modules/auth/model/authStore'
import { logout } from '@/modules/auth/model/authService'

const authStore = useAuthStore()

const isAuthenticated = computed(() => authStore.isAuthenticated)
const email = computed(() => authStore.user?.email)

const onLogout = async () => {
  await logout()
}
</script>

<template>
  <div v-if="isAuthenticated">
    {{ email }}
    <input type="submit" value="Logout" @click="onLogout" />
  </div>

  <div v-else>
    <RouterLink :to="{ name: 'login' }">Login</RouterLink>
  </div>
</template>
