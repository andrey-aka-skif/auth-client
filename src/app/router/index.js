import { createRouter, createWebHistory } from 'vue-router'
import { TEXTS } from '@/shared/config'
import routes from './routes'
import { useAuthStore } from '@/stores/auth'

const pickRoutesFromModules = () => {
  const modulesWithRoutes = import.meta.glob('@/modules/**/index.js', {
    eager: true,
  })

  return Object.values(modulesWithRoutes).flatMap(m => m.routes)
}

const mergeRoutes = (baseRoutes, parentRouteName = null) => {
  const moduleRoutes = pickRoutesFromModules()

  if (!parentRouteName) {
    return [...baseRoutes, ...moduleRoutes]
  }

  const parentRoute = baseRoutes.find(route => route.name === parentRouteName)

  if (parentRoute) {
    if (!parentRoute.children) {
      parentRoute.children = []
    }
    parentRoute.children.push(...moduleRoutes)
    return baseRoutes
  } else {
    console.warn(
      `Маршрут с именем "${parentRouteName}" не найден. Маршруты модулей объединены в плоский массив с базовыми.`
    )
    return [...baseRoutes, ...moduleRoutes]
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: mergeRoutes(routes, 'root'),
})

router.beforeEach(() => {
  document.title = TEXTS.APP_NAME
})

router.beforeEach(async (to, from, next) => {
  const store = useAuthStore()
  const requiresAuth = to.matched.some(r => r.meta.requiresAuth)

  if (requiresAuth && !store.isAuthenticated) {
    next({ name: 'login' })
  } else if (to.name === 'login' && store.isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
