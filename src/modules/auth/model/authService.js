import router from '@/app/router'
import { authApi } from '../api/authApi'
import { useAuthStore } from './authStore'
import { tokenStorage } from '@/shared/lib/auth/tokenStorage'

export async function login(credentials) {
  const store = useAuthStore()

  const response = await authApi.login({
    body: credentials,
  })

  tokenStorage.setTokens(response.data)

  const me = await authApi.me()

  store.setUser(me.data)

  return response.data
}

export async function logout() {
  const refreshToken = tokenStorage.getRefreshToken()

  const store = useAuthStore()

  try {
    if (refreshToken) {
      await authApi.logout({
        body: {
          refreshToken,
        },
      })
    }
  } finally {
    tokenStorage.clear()

    store.clear()

    router.push({ name: 'login' })
  }
}

export async function initializeAuth() {
  const store = useAuthStore()

  try {
    const accessToken = tokenStorage.getAccessToken()

    if (!accessToken) {
      return
    }

    const response = await authApi.me()

    store.setUser(response.data)
  } catch {
    tokenStorage.clear()
    store.clear()
  } finally {
    store.setInitialized(true)
  }
}
