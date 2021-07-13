import { AxiosError } from 'axios'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { api, redirect2AuthEndpoint } from '../utils/api'

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
    path: '/users/:userId',
    name: 'user',
    component: () => import('../views/User/index.vue'),
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: () => import('../views/Favorite/index.vue'),
  },
  {
    path: '/callback',
    name: 'callback',
    component: () => import('../views/Top/index.vue'),
    beforeEnter: async (to, _, next) => {
      await api.callback(String(to.query.code))
      const destination = sessionStorage.getItem('destination')
      if (destination) {
        next(destination)
      } else {
        next()
      }
    },
  },
]

const routerHistory = createWebHistory('/')
const router = createRouter({
  routes,
  history: routerHistory,
})

router.beforeEach(async (to, _, next) => {
  if (to.name === 'callback') {
    next()
    return
  }
  let me = sessionStorage.getItem('me')
  if (me === null || me === '') {
    try {
      const { data } = await api.getMe()
      me = data.name
      sessionStorage.setItem('me', me)
    } catch (err) {
      const e: AxiosError = err
      console.error(e)
    }
  }
  if (me === null || me === '') {
    sessionStorage.setItem('destination', to.fullPath)
    redirect2AuthEndpoint()
  }

  next()
})

export default router
