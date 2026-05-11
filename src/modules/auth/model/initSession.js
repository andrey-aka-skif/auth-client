import { useAuthStore } from './authStore'

import { tokenStorage } from '@/shared/lib/auth/tokenStorage'

import { authApi } from '../api/authApi'

export async function initSession() {
  const store = useAuthStore()

  try {
    const refreshToken = tokenStorage.getRefreshToken()

    if (!refreshToken) {
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
