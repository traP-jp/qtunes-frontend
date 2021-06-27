import { createApp, onMounted } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import { provideAudios, provideDatas, useDatas } from './store'
const myApp = {
  ...App,
  setup() {
    provideAudios(), provideDatas()
    onMounted(() => {
      const datas = useDatas()
      datas.setMe(localStorage.getItem('me')!)
    })
  },
}
createApp(myApp).use(ElementPlus).use(router).mount('#app')
