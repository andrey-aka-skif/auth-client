import BaseLayout from '@/shared/layouts/BaseLayout.vue'
import Dashboard from '../pages/DashboardPage.vue'

export const routes = [
  {
    path: '/user',
    name: 'user',
    component: BaseLayout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: { requiresAuth: true },
      },
    ],
  },
]
