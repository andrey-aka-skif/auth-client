import { useAuthStore } from './authStore'
import { tokenStorage } from '@/shared/lib/auth/tokenStorage'

export async function initSession() {
  const store = useAuthStore()

  const accessToken = tokenStorage.getAccessToken()
  const refreshToken = tokenStorage.getRefreshToken()

  if (!accessToken || !refreshToken) {
    store.initialized = true
    return
  }

  store.setSession({
    accessToken,
    refreshToken,
    user: null,
  })

  store.initialized = true
}
