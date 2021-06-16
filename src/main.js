import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import db from './datastore'

const app = createApp(App).use(store).use(router)
app.config.globalProperties.$db = db
app.mount('#app')