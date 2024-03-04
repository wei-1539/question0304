// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap'
import Loading from 'vue-loading-overlay'

import App from './App.vue'
import router from './router'
import { date } from './methods/filter.js'
const app = createApp(App)

// 將【自訂方法】設定所有頁面都能使用，不用每頁都寫
// app.config.globalProperties.$【自訂義】
// 只需要輸入 $filters.data() 就可以執行發法
app.config.globalProperties.$filters = {
  date
}

app.use(createPinia())
app.use(router)

app.component('VueLoading', Loading)

app.mount('#app')
