import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Initialize database.
import './database/datastore'

const app = createApp(App).use(store).use(router)
app.mount('#app')