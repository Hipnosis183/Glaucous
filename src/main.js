import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./main.css"

// Initialize database.
import './database/datastore'
// Import Element Plus.
import element from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

const app = createApp(App).use(store).use(router).use(element)
app.mount('#app')