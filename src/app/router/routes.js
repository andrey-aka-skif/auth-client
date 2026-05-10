import HomeLayout from '@/shared/layouts/HomeLayout.vue'
import RootLayout from '@/shared/layouts/RootLayout.vue'

const routes = [
  {
    path: '/',
    name: 'root',
    component: RootLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeLayout,
        meta: { requiresAuth: false },
      },
    ],
  },
]

export default routes
