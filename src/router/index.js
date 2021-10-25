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
    name: 'Games',
    component: () => import('../components/List/ListGames.vue')
  },
  {
    path: '/games/:id',
    name: 'Game',
    component: () => import('../components/View/ViewGame.vue')
  },
  // Platforms
  {
    path: '/platforms',
    name: 'Platforms',
    component: () => import('../components/List/ListPlatforms.vue')
  },
  {
    path: '/platforms/group/:id',
    name: 'PlatformsGroup',
    component: () => import('../components/List/ListPlatformsGroup.vue')
  },
  {
    path: '/platforms/:id',
    name: 'Platform',
    component: () => import('../components/View/ViewPlatform.vue')
  },
  // Developers
  {
    path: '/developers',
    name: 'Developers',
    component: () => import('../components/List/ListDevelopers.vue')
  },
  {
    path: '/developers/:id',
    name: 'Developer',
    component: () => import('../components/View/ViewDeveloper.vue')
  },
  // User Lists
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('../components/Favorites.vue')
  },
  {
    path: '/recent',
    name: 'Recent',
    component: () => import('../components/Recent.vue')
  },
  {
    path: '/playlists',
    name: 'Playlists',
    component: () => import('../components/List/ListPlaylists.vue')
  },
  {
    path: '/playlists/:id',
    name: 'Playlist',
    component: () => import('../components/View/ViewPlaylist.vue')
  },
  // Others
  {
    path: '/players/:id',
    name: 'Players',
    component: () => import('../components/View/ViewPlayers.vue')
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
