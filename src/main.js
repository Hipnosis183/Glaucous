import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./main.css"

// Initialize database.
import './database/datastore'
// Import emitter.
import mitt from 'mitt'
const emitter = mitt()
// Import UI and icon components.
import hipnoUI from '@/plugins/HipnosisUI'
import hipnoIcon from '@/plugins/HipnosisIcon'
// Import Element Plus.
import element from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App).use(store).use(router).use(hipnoUI).use(hipnoIcon).use(element)
app.config.globalProperties.emitter = emitter
app.mount('#app')