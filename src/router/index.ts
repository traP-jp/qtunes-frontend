import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'top',
    component: () => import('../views/Top.vue'),
  },
]

// const routerHistory = createWebHistory(process.env.BASE_PATH)
const routerHistory = createWebHistory('/')
const router = createRouter({
  routes,
  history: routerHistory,
})

export default router
