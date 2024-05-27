import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import App from './App.vue'
import router from './router'

const api = import.meta.env.VITE_API_URL

const app = createApp(App)

app.use(createPinia())
app.use(router)

axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Accept'] = 'application/json'

axios.interceptors.request.use(
   async (config) => {
      config.url = `${api}${config.url}`
      return await config
   },
   function (error) {
      return Promise.reject(error)
   }
)

app.mount('#app')
