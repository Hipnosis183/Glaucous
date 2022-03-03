// Import app entry point.
import App from '@/App.vue'
// Import Vue functions.
import { createApp } from 'vue'
import Router from '@/router'
import Store from '@/store'
// Import styling.
import "@/main.css"
// Initialize database.
import '@/database/datastore'
// Initialize settings loading.
import '@/setup'
// Import emitter.
import mitt from 'mitt'
const emitter = mitt()
// Import UI and icon components.
import ViridianUI from '@/plugins/ViridianUI'
import ViridianIcon from '@/plugins/ViridianIcon'

// Setup and initialize the application.
const app = createApp(App).use(Store).use(Router).use(ViridianUI).use(ViridianIcon)
app.config.globalProperties.emitter = emitter
app.mount('#app')