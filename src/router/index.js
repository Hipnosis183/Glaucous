import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../components/Index.vue')
  },
  {
    path: '/viewGame/:id',
    name: 'view-game',
    component: () => import('../components/View/ViewGame.vue')
  },
  {
    path: '/createGame',
    name: 'createGame',
    component: () => import('../components/Create/CreateGame.vue')
  },
  {
    path: '/createPlatform',
    name: 'createPlatform',
    component: () => import('../components/Create/CreatePlatform.vue')
  },
  {
    path: '/createDeveloper',
    name: 'createDeveloper',
    component: () => import('../components/Create/CreateDeveloper.vue')
  }
]

const router = createRouter({
  // Use hash mode for Electron.
  history:
    process.env.IS_ELECTRON
    ? createWebHashHistory()
    : createWebHistory(),
  routes
})

export default router
