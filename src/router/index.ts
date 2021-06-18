import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'top',
    component: () => import('../views/Top/index.vue'),
  },
  {
    path: '/files',
    name: 'files',
    component: () => import('../views/Files/index.vue'),
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../views/Files/index.vue'),
  },
]

// const routerHistory = createWebHistory(process.env.BASE_PATH)
const routerHistory = createWebHistory('/')
const router = createRouter({
  routes,
  history: routerHistory,
})

export default router
