import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import api from '@/shared/api/transport/instance' // твой axios-инстанс

export function useAuth() {
  const store = useAuthStore()
  const router = useRouter()

  async function login(email, password) {
    const { data } = await api.post('/auth/login', { email, password })
    store.setTokens(data.accessToken, data.refreshToken)
    store.setUser(data.user)

    router.push({ name: 'home' })

    return data
  }

  async function logout() {
    try {
      await api.post('/auth/logout', { refreshToken: store.refreshToken })
    } finally {
      store.clear()
      // очистка storage
      router.push({ name: 'login' })
    }
  }

  return { login, logout, store }
}
