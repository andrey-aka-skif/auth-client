import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './app/router'
import './shared/api/transport/setup'
import { initSession } from './modules/auth/model/initSession'

import './assets/main.css'

const pinia = createPinia()
const app = createApp(App)

app.use(router).use(pinia).mount('#app')

initSession()
