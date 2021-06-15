import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: require('@/components/Index').default
    },
    {
      path: '/createGame',
      name: 'create-game',
      component: require('@/components/CreateGame').default
    },
    {
      path: '/createPlatform',
      name: 'create-platform',
      component: require('@/components/CreatePlatform').default
    },
    {
      path: '/createDeveloper',
      name: 'create-developer',
      component: require('@/components/CreateDeveloper').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
