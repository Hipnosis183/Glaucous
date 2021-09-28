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
import viUI from '@/plugins/ViridianUI'
import viIcon from '@/plugins/ViridianIcon'

const app = createApp(App).use(store).use(router).use(viUI).use(viIcon)
app.config.globalProperties.emitter = emitter
app.mount('#app')