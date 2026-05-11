import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  const initialized = ref(false)

  const isAuthenticated = computed(() => !!user.value)

  function setUser(value) {
    user.value = value
  }

  function clear() {
    user.value = null
  }

  function setInitialized(value) {
    initialized.value = value
  }

  return {
    user,
    initialized,
    isAuthenticated,

    setUser,
    clear,
    setInitialized,
  }
})
