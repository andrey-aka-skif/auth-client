import { authApi } from '../api/authApi'
import { useAuthStore } from './authStore'

export async function login(credentials) {
  const store = useAuthStore()

  const response = await authApi.login({
    body: credentials,
  })

  store.setSession(response.data)

  return response.data
}
