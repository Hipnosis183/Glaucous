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
        <div class="flex flex-col max-h-80 mb-auto no-scrollbar overflow-scroll">
          <vi-button-sb
            button-icon="icon-games"
            button-large
            @click="selectList()"
          >Games</vi-button-sb>
          <vi-button-sb
            button-icon="icon-star-s"
            button-large
            @click="$router.push({ name: 'Favorites' })"
          >Favorites</vi-button-sb>
          <vi-button-sb
            button-icon="icon-tag"
            button-large
            @click="$router.push({ name: 'Tags' })"
          >Explore Tags</vi-button-sb>
          <vi-button-sb
            button-icon="icon-playlist"
            button-large
            @click="$router.push({ name: 'Playlists' })"
          >Playlists</vi-button-sb>
          <vi-button-sb
            button-icon="icon-recent"
            button-large
            @click="$router.push({ name: 'Recent' })"
          >Recently Played</vi-button-sb>
        </div>
        <div class="flex flex-col max-h-32 mt-auto no-scrollbar overflow-scroll z-50">
          <vi-button-sb
            button-icon="icon-search"
            button-large
            icon-size="w-6"
            @click="searchShow()"
          >Search</vi-button-sb>
          <vi-button-sb
            button-icon="icon-setting-f"
            button-large
            icon-size="w-6"
            @click="$router.push({ name: 'Settings' })"
          >Settings</vi-button-sb>
        </div>
        <!-- Bottom bar. -->
        <div class="bottom-shadow flex justify-between">
          <vi-button-sb
            button-small
            button-icon="icon-exit"
            @click="exitApp()"
          />
          <vi-button-sb
            button-small
            button-icon="icon-menu"
            @click="sidenavToggle()"
          />
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
        <div class="flex flex-col max-h-80 mb-auto no-scrollbar overflow-scroll z-40">
          <vi-button-sb
            button-icon="icon-games"
            @click="selectList()"
          />
          <vi-button-sb
            button-icon="icon-star-s"
            @click="$router.push({ name: 'Favorites' })"
          />
          <vi-button-sb
            button-icon="icon-tag"
            @click="$router.push({ name: 'Tags' })"
          />
          <vi-button-sb
            button-icon="icon-playlist"
            @click="$router.push({ name: 'Playlists' })"
          />
          <vi-button-sb
            button-icon="icon-recent"
            @click="$router.push({ name: 'Recent' })"
          />
        </div>
        <div
          class="flex flex-col mt-auto no-scrollbar overflow-scroll z-40"
          :class="history > 0 ? 'max-h-48' : 'max-h-32'"
        >
          <vi-button-sb
            v-show="history > 0"
            button-icon="icon-back"
            icon-size="w-7"
            @click="$router.back()"
          />
          <vi-button-sb
            button-icon="icon-search"
            icon-size="w-6"
            @click="searchShow()"
          />
          <vi-button-sb
            button-icon="icon-setting-f"
            icon-size="w-6"
            @click="$router.push({ name: 'Settings' })"
          />
        </div>
        <!-- Bottom bar. -->
        <div class="bottom-shadow flex justify-between">
          <vi-button-sb
            button-small
            button-icon="icon-menu"
            @click="sidenavToggle()"
          />
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
import ViridianIcon from './Assets/ViridianIcon.vue'
import ViridianLogo from './Assets/ViridianLogoThin.vue'

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
  filter: drop-shadow(-1px -1px 1px rgba(var(--color-color-800), 0.6));
}
.top-shadow {
  filter: drop-shadow(-1px 1px 1px rgba(0, 0, 0, 0.5));
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