import { createApp, InjectionKey } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import { createStore, Store, useStore as baseUseStore } from 'vuex'

interface StateType {
  id: string
}
const key: InjectionKey<Store<StateType>> = Symbol()
const store = createStore<StateType>({
  state(): StateType {
    return {
      id: '',
    }
  },
  mutations: {
    chgAudio(state: StateType, payload: { id: string }) {
      state.id = payload.id
    }
  },
  actions: {
    chgAudio(context, payload: { id: string }) {
      context.commit('chgAudio', payload)
    },
  },
})
export const useStore = () => baseUseStore(key)

createApp(App).use(ElementPlus).use(store, key).use(router).mount('#app')
