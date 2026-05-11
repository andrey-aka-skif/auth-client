import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './app/router'
import './shared/api/transport/setup'

import './assets/main.css'

import { initializeAuth } from './modules/auth/model/authService'
import { injectUnauthorizedHandler } from './shared/lib/auth/authInjector'
import { useAuthStore } from './modules/auth/model/authStore'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

injectUnauthorizedHandler(() => {
  const authStore = useAuthStore()

  authStore.clear()

  router.push({ name: 'login' })
})

await initializeAuth()

app.use(router)
app.mount('#app')
