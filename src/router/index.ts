import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { ROUTE_NAMES } from '@/constants'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        redirect: { name: ROUTE_NAMES.PRODUCT.STOCK },
      },
      {
        path: 'products/stock',
        name: ROUTE_NAMES.PRODUCT.STOCK,
        component: () => import('@/pages/ProductStockPage.vue'),
        meta: { title: 'Product Stock' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.afterEach((to) => {
  const title = to.meta.title as string | undefined
  document.title = title ? `${title} · Forsid PSM` : 'Forsid PSM'
})

export default router
