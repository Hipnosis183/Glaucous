import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const routes = [
  // Index
  {
    path: '/',
    name: 'Index',
    component: () => import('../components/Index.vue')
  },
  // Games
  {
    path: '/games',
    name: 'ListGames',
    component: () => import('../components/List/ListGames.vue')
  },
  {
    path: '/games/create-game-platform',
    name: 'CreateGamePlatform',
    component: () => import('../components/Create/CreateGamePlatform.vue')
  },
  {
    path: '/games/create-game-region',
    name: 'CreateGameRegion',
    component: () => import('../components/Create/CreateGameRegion.vue')
  },
  {
    path: '/games/create-game-version',
    name: 'CreateGameVersion',
    component: () => import('../components/Create/CreateGameVersion.vue')
  },
  {
    path: '/games/:id',
    name: 'ViewGame',
    component: () => import('../components/View/ViewGame.vue')
  },
  // Platforms
  {
    path: '/platforms',
    name: 'ListPlatforms',
    component: () => import('../components/List/ListPlatforms.vue')
  },
  {
    path: '/platforms/create-platform',
    name: 'CreatePlatform',
    component: () => import('../components/Create/CreatePlatform.vue')
  },
  {
    path: '/platforms/:id',
    name: 'ViewPlatform',
    component: () => import('../components/View/ViewPlatform.vue')
  },
  // Developers
  {
    path: '/developers',
    name: 'ListDevelopers',
    component: () => import('../components/List/ListDevelopers.vue')
  },
  {
    path: '/developers/create-developer',
    name: 'CreateDeveloper',
    component: () => import('../components/Create/CreateDeveloper.vue')
  },
  {
    path: '/developers/:id',
    name: 'ViewDeveloper',
    component: () => import('../components/View/ViewDeveloper.vue')
  },
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
