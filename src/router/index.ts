import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import {ROUTE_NAMES} from '@/constants'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ProductStockPage from '@/pages/ProductStockPage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: ROUTE_NAMES.PRODUCT.STOCK,
        component: ProductStockPage,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
