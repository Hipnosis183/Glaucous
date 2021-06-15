import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import db from './datastore'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.prototype.$vm = Vue
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.$db = db

new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
