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
}
type PayloadType = Pick<StateType, 'id' | 'title' | 'composer'>
const key: InjectionKey<Store<StateType>> = Symbol()
const store = createStore<StateType>({
  state(): StateType {
    return {
      id: '',
      title: '',
      composer: '',
    }
  },
  mutations: {
    chgAudio(state: StateType, payload: PayloadType) {
      state.id = payload.id
      state.title = payload.title
      state.composer = payload.composer
    }
  },
  actions: {
    chgAudio(context, payload: PayloadType) {
      context.commit('chgAudio', payload)
    },
  },
})
export const useStore = () => baseUseStore(key)

createApp(App).use(ElementPlus).use(store, key).use(router).mount('#app')
