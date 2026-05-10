import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_URL })

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom =>
    error ? prom.reject(error) : prom.resolve(token)
  )
  failedQueue = []
}

axiosInstance.interceptors.request.use(config => {
  // const token = sessionManager.getAccessToken()

  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`
  // }

  const { accessToken } = useAuthStore()
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`

  return config
})

axiosInstance.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return axiosInstance(originalRequest)
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const store = useAuthStore()
        const { data } = await axios.post('/auth/refresh', {
          refreshToken: store.refreshToken,
        })
        store.setTokens(data.accessToken, data.refreshToken)
        processQueue(null, data.accessToken)
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        // store.clear()
        window.location.href = '/login' // или router.push
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
