import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(null)
  const refreshToken = ref(null)

  const user = ref(null)

  const initialized = ref(false)

  const isAuthenticated = computed(() => !!accessToken.value)

  function setSession(session) {
    accessToken.value = session.accessToken
    refreshToken.value = session.refreshToken
    user.value = session.user
  }

  function clear() {
    setSession({
      accessToken: null,
      refreshToken: null,
      user: null,
    })
  }

  function setInitialized(value) {
    initialized.value = value
  }

  function setUser(value) {
    user.value = value
  }

  return {
    accessToken,
    refreshToken,

    user,

    initialized,

    isAuthenticated,

    setSession,
    clear,
    setInitialized,
    setUser,
  }
})
