import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import { provideAudios, provideDatas } from './store'
const myApp = {
  ...App,
  setup() {
    provideAudios(), provideDatas()
  },
}
createApp(myApp).use(ElementPlus).use(router).mount('#app')
