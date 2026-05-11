import axios from 'axios'
import { tokenStorage } from '@/shared/lib/auth/tokenStorage'
import { handleUnauthorized } from '@/shared/lib/auth/authInjector'

const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_URL })
const axiosRefreshInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

const refreshUri = import.meta.env.VITE_REFRESH_URI || '/auth/refresh'

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom =>
    error ? prom.reject(error) : prom.resolve(token)
  )
  failedQueue = []
}

axiosInstance.interceptors.request.use(config => {
  const token = tokenStorage.getAccessToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

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
        const refreshToken = tokenStorage.getRefreshToken()
        const { data } = await axiosRefreshInstance.post(refreshUri, {
          refreshToken,
        })
        tokenStorage.setTokens(data)
        processQueue(null, data.accessToken)
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        tokenStorage.clear()
        handleUnauthorized()
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
