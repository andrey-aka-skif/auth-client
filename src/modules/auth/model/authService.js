import router from '@/app/router'
import { authApi } from '../api/authApi'
import { useAuthStore } from './authStore'
import { tokenStorage } from '@/shared/lib/auth/tokenStorage'

export async function login(credentials) {
  const store = useAuthStore()

  const response = await authApi.login({
    body: credentials,
  })

  const session = response.data
  tokenStorage.setTokens(session)

  store.setSession(session)

  router.push({ name: 'dashboard' })

  return response.data
}

export async function logout() {
  const store = useAuthStore()

  try {
    await authApi.logout({
      body: {
        refreshToken: store.refreshToken,
      },
    })
  } finally {
    tokenStorage.clear()
    store.clear()
    router.push({ name: 'login' })
  }
}
