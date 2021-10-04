import {
  createRouter,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'

const routes = [
  // Index
  {
    path: '/',
    name: 'Index',
    component: () => import('../components/Index.vue')
  },
  // Settings
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../components/Settings.vue')
  },
  // Games
  {
    path: '/games',
    name: 'ListGames',
    component: () => import('../components/List/ListGames.vue')
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
    path: '/platforms/group/:id',
    name: 'ListPlatformsGroup',
    component: () => import('../components/List/ListPlatformsGroup.vue')
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
    path: '/developers/:id',
    name: 'ViewDeveloper',
    component: () => import('../components/View/ViewDeveloper.vue')
  },
  // User Lists
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('../components/Favorites.vue')
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
