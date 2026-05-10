import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null,
    refreshToken: null,
    user: null,
    initialized: false,
  }),

  getters: {
    isAuthenticated: s => !!s.accessToken,
  },

  actions: {
    setSession(session) {
      this.accessToken = session.accessToken
      this.refreshToken = session.refreshToken
      this.user = session.user
    },

    clear() {
      this.accessToken = null
      this.refreshToken = null
      this.user = null
    },
  },
})
