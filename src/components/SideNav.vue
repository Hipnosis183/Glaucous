<template>
  <!-- Open search dialog. -->
  <transition>
    <search
      v-show="searchDialog"
      @close="searchShow()"
      :key="searchDialog"
      class="pos-initial z-30"
    />
  </transition>
  <!-- Expanded sidenav. -->
  <div>
    <!-- Sidenav overlay. -->
    <transition v-show="expand">
      <div
        @click="sidenavToggle()"
        class="absolute bg-black bg-opacity-50 h-screen w-full z-40"
      >
      </div>
    </transition>
    <!-- Sidenav contents. -->
    <transition name="slide-nav">
      <div
        v-show="expand"
        class="absolute bg-color-700 dark:bg-color-800 flex flex-col inset-y-0 w-80 z-50"
      >
        <!-- Logo bar. -->
        <div class="bg-color-800 dark:bg-color-900 hover:bg-color-600 dark:hover:bg-color-700 top-shadow">
          <h6
            @click="$router.push({ name: 'Index' })"
            class="cursor-pointer pl-6 pr-8 py-7"
          >
            <viridian-logo class="viridian-shadow" />
          </h6>
        </div>
        <!-- Buttons. -->
        <div class="flex flex-col mb-auto">
          <vi-button-sb
            @click="selectList()"
            class="flex h-16 pl-4 z-50"
          >
            <vi-icon
              manual
              class="w-8"
            >
              <icon-games />
            </vi-icon>
            <h6>Games</h6>
          </vi-button-sb>
          <vi-button-sb
            @click="$router.push({ name: 'Favorites' })"
            class="flex h-16 pl-4"
          >
            <vi-icon
              manual
              class="w-8"
            >
              <icon-star-s />
            </vi-icon>
            <h6>Favorites</h6>
          </vi-button-sb>
          <vi-button-sb
            @click="$router.push({ name: 'Playlists' })"
            class="flex h-16 pl-4"
          >
            <vi-icon
              manual
              class="w-8"
            >
              <icon-playlist />
            </vi-icon>
            <h6>Playlists</h6>
          </vi-button-sb>
          <vi-button-sb
            @click="$router.push({ name: 'Recent' })"
            class="flex h-16 pl-4"
          >
            <vi-icon
              manual
              class="w-8"
            >
              <icon-recent />
            </vi-icon>
            <h6>Recently Played</h6>
          </vi-button-sb>
        </div>
        <div class="flex flex-col mt-auto z-50">
          <vi-button-sb
            v-show="history > 0"
            @click="$router.back()"
            class="flex h-16 pl-4"
          >
            <vi-icon
              manual
              class="w-6"
            >
              <icon-back />
            </vi-icon>
            <h6>Go Back</h6>
          </vi-button-sb>
          <vi-button-sb
            @click="searchShow()"
            class="flex h-16 pl-4"
          >
            <vi-icon
              manual
              class="w-6"
            >
              <icon-search />
            </vi-icon>
            <h6>Search</h6>
          </vi-button-sb>
          <vi-button-sb
            @click="$router.push({ name: 'Settings' })"
            class="flex h-16 pl-4"
          >
            <vi-icon
              manual
              class="w-6"
            >
              <icon-setting-f />
            </vi-icon>
            <h6>Settings</h6>
          </vi-button-sb>
        </div>
        <!-- Bottom bar. -->
        <div class="bottom-shadow flex justify-between">
          <vi-button-sb-small
            @click="exitApp()"
            class="py-3.5"
          >
            <vi-icon class="w-6">
              <icon-exit />
            </vi-icon>
          </vi-button-sb-small>
          <vi-button-sb-small @click="sidenavToggle()">
            <vi-icon class="w-6">
              <icon-menu />
            </vi-icon>
          </vi-button-sb-small>
        </div>
      </div>
    </transition>
  </div>
  <!-- Small sidenav. -->
  <div>
    <transition
      name="color"
      mode="out-in"
    >
      <div
        :key="$store.getters.getSettingsThemesSelectedTheme"
        class="bg-color-700 dark:bg-color-800 flex flex-col h-screen justify-between relative w-14"
      >
        <!-- Logo bar. -->
        <div class="bg-color-800 dark:bg-color-900 hover:bg-color-600 dark:hover:bg-color-700 h-14 top-shadow">
          <h6
            @click="$router.push({ name: 'Index' })"
            class="cursor-pointer p-4"
          >
            <viridian-icon class="viridian-shadow" />
          </h6>
        </div>
        <!-- Buttons. -->
        <div class="flex flex-col mb-auto z-40">
          <vi-button-sb @click="selectList()">
            <vi-icon class="text-color-200 w-8">
              <icon-games />
            </vi-icon>
          </vi-button-sb>
          <vi-button-sb @click="$router.push({ name: 'Favorites' })">
            <vi-icon class="text-color-200 w-8">
              <icon-star-s />
            </vi-icon>
          </vi-button-sb>
          <vi-button-sb @click="$router.push({ name: 'Playlists' })">
            <vi-icon class="text-color-200 w-8">
              <icon-playlist />
            </vi-icon>
          </vi-button-sb>
          <vi-button-sb @click="$router.push({ name: 'Recent' })">
            <vi-icon class="text-color-200 w-8">
              <icon-recent />
            </vi-icon>
          </vi-button-sb>
        </div>
        <div class="flex flex-col mt-auto z-40">
          <vi-button-sb
            v-show="history > 0"
            @click="$router.back()"
          >
            <vi-icon class="text-color-200 w-6">
              <icon-back />
            </vi-icon>
          </vi-button-sb>
          <vi-button-sb @click="searchShow()">
            <vi-icon class="text-color-200 w-6">
              <icon-search />
            </vi-icon>
          </vi-button-sb>
          <vi-button-sb @click="$router.push({ name: 'Settings' })">
            <vi-icon class="text-color-200 w-6">
              <icon-setting-f />
            </vi-icon>
          </vi-button-sb>
        </div>
        <!-- Bottom bar. -->
        <div class="bottom-shadow flex justify-between">
          <vi-button-sb-small @click="sidenavToggle()">
            <vi-icon class="w-6">
              <icon-menu />
            </vi-icon>
          </vi-button-sb-small>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// Import Vue functions.
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
// Import functions from modules.
import { app } from '@electron/remote'
// Import utility functions.
import { throttle } from '@/utils/throttle'
// Import search component.
import Search from './Search.vue'
// Import assets.
import ViridianIcon from '@/components/Assets/ViridianIcon.vue'
import ViridianLogo from '@/components/Assets/ViridianLogoThin.vue'

export default {
  name: 'SideNav',
  components: {
    Search,
    ViridianIcon,
    ViridianLogo
  },
  setup() {
    // Instantiate Vue elements.
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    // Manage route history for the back button.
    let history = ref(window.history.state.position)
    let expand = ref(false)
    watch(() => route.path, () => {
      // Set transition orientation depending on route position.
      store.state.slideBack = window.history.state.position > history.value ? false : true
      // Store current position of route in history.
      history.value = window.history.state.position
      // Ensure the closure of the sidenav.
      expand.value = false
    })

    // Toggle sidenav visibility.
    const sidenavToggle = throttle(() => {
      expand.value = !expand.value
    }, 500)

    // Select list group page to load.
    const selectList = () => {
      switch (store.getters.getSettingsGeneralGameCategory) {
        // Load page with all games listed.
        case 0: router.push({ name: 'Games' })
          break
        // Load page with all platforms listed.
        case 1: router.push({ name: 'Platforms' })
          break
        // Load page with all developers listed.
        case 2: router.push({ name: 'Developers' })
          break
      }
      // Close the sidenav.
      expand.value = false
    }

    // Manage search dialog display.
    let searchDialog = ref(false)
    const searchShow = () => {
      // Toggle search dialog.
      searchDialog.value = !searchDialog.value
      // Close sidenav.
      if (expand.value) {
        sidenavToggle()
      }
    }

    // Exit the application.
    const exitApp = () => {
      app.exit()
    }

    // Return values to use on template.
    return {
      exitApp,
      expand,
      history,
      searchDialog,
      searchShow,
      selectList,
      sidenavToggle
    }
  }
}
</script>

<style scoped>
/* Styling. */
.bottom-shadow {
  filter: drop-shadow(0px -1px 1px rgba(var(--color-color-800), 0.6));
}
.top-shadow {
  filter: drop-shadow(0px 1px 1px rgba(40, 40, 42, 0.6));
}
.viridian-shadow {
  filter: drop-shadow(2px 2px 0px rgba(var(--color-theme-900), 0.6));
}
/* Transitions. */
div {
  transition: background-color 0.5s, opacity 0.5s ease;
}
.slide-nav-leave-active,
.slide-nav-enter-active {
  transition: all 0.5s;
}
.slide-nav-leave-to,
.slide-nav-enter-from {
  transform: translate(-100%, 0);
}
</style>