import { createApp, InjectionKey } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import { createStore, Store, useStore as baseUseStore } from 'vuex'

interface StateType {
  id: string
  title: string
  composer: string
  isFav: boolean
}
type PayloadType = Pick<StateType, 'id' | 'title' | 'composer' | 'isFav'>
const key: InjectionKey<Store<StateType>> = Symbol()
const store = createStore<StateType>({
  state(): StateType {
    return {
      id: '',
      title: '',
      composer: '',
      isFav: false,
    }
  },
  mutations: {
    chgAudio(state: StateType, payload: PayloadType) {
      state.id = payload.id
      state.title = payload.title
      state.composer = payload.composer
      state.isFav = payload.isFav
    },
  },
  actions: {
    chgAudio(context, payload: PayloadType) {
      context.commit('chgAudio', payload)
    },
  },
})
export const useStore = () => baseUseStore(key)

createApp(App).use(ElementPlus).use(store, key).use(router).mount('#app')
