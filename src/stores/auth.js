import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null,
    refreshToken: null,
    user: null,
    isInitialized: false,
  }),

  getters: {
    isAuthenticated: state => !!state.accessToken,
  },

  actions: {
    setTokens(access, refresh) {
      this.accessToken = access
      this.refreshToken = refresh
      // TODO: сохранить в secure storage (cookie/sessionStorage)
    },
    setUser(payload) {
      this.user = payload
    },
    clear() {
      this.accessToken = null
      this.refreshToken = null
      this.user = null
    },
  },
})
