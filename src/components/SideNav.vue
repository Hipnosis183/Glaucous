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
        class="absolute bg-black bg-opacity-50 h-full w-full z-40"
      >
      </div>
    </transition>
    <!-- Sidenav contents. -->
    <transition name="slide-nav">
      <div
        v-show="expand"
        class="absolute bg-color-700 dark:bg-color-800 flex flex-col inset-y-0 w-60 z-40"
      >
        <!-- Logo bar. -->
        <div class="bg-color-800 dark:bg-color-900 hover:bg-color-600 dark:hover:bg-color-700">
          <h6
            @click="$router.push({ name: 'Index' })"
            class="cursor-pointer p-6"
          >
            <viridian-logo />
          </h6>
        </div>
        <!-- Buttons. -->
        <div class="flex flex-col mb-auto">
          <hip-button-sb
            @click="selectList()"
            class="flex pl-4"
          >
            <hip-icon
              manual
              class="w-8"
            >
              <icon-games />
            </hip-icon>
            <h6>Games</h6>
          </hip-button-sb>
        </div>
        <div class="flex flex-col mt-auto">
          <hip-button-sb
            @click="searchShow()"
            class="flex pl-4"
          >
            <hip-icon
              manual
              class="w-6"
            >
              <icon-search />
            </hip-icon>
            <h6>Search</h6>
          </hip-button-sb>
          <hip-button-sb
            v-show="history > 0"
            @click="$router.back()"
            class="flex pl-4"
          >
            <hip-icon
              manual
              class="w-6"
            >
              <icon-back />
            </hip-icon>
            <h6>Go Back</h6>
          </hip-button-sb>
        </div>
        <!-- Bottom bar. -->
        <div class="flex justify-between">
          <hip-button-sb-small
            @click="exitApp()"
            class="py-3.5"
          >
            <hip-icon class="w-5">
              <icon-exit />
            </hip-icon>
          </hip-button-sb-small>
          <hip-button-sb-small @click="$router.push({ name: 'Settings' })">
            <hip-icon class="w-6">
              <icon-setting />
            </hip-icon>
          </hip-button-sb-small>
          <hip-button-sb-small @click="sidenavToggle()">
            <hip-icon class="w-6">
              <icon-fold />
            </hip-icon>
          </hip-button-sb-small>
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
        class="bg-color-700 dark:bg-color-800 flex flex-col h-full justify-between relative w-14"
      >
        <!-- Logo bar. -->
        <div class="bg-color-800 dark:bg-color-900 hover:bg-color-600 dark:hover:bg-color-700">
          <h6
            @click="$router.push({ name: 'Index' })"
            class="cursor-pointer p-4"
          >
            <viridian-icon />
          </h6>
        </div>
        <!-- Buttons. -->
        <div class="flex flex-col mb-auto">
          <hip-button-sb @click="selectList()">
            <hip-icon class="text-color-200 w-8">
              <icon-games />
            </hip-icon>
          </hip-button-sb>
        </div>
        <div class="flex flex-col mt-auto">
          <hip-button-sb @click="searchShow()">
            <hip-icon class="text-color-200 w-6">
              <icon-search />
            </hip-icon>
          </hip-button-sb>
          <hip-button-sb
            v-show="history > 0"
            @click="$router.back()"
          >
            <hip-icon class="text-color-200 w-6">
              <icon-back />
            </hip-icon>
          </hip-button-sb>
        </div>
        <!-- Bottom bar. -->
        <div class="flex justify-between">
          <hip-button-sb-small @click="sidenavToggle()">
            <hip-icon class="w-6">
              <icon-expand />
            </hip-icon>
          </hip-button-sb-small>
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
import ViridianLogo from '@/components/Assets/ViridianLogo.vue'

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
      switch (store.getters.getSettingsListsListGroup) {
        // Load page with all games listed.
        case 0: router.push({ name: 'ListGames' })
          break
        // Load page with all platforms listed.
        case 1: router.push({ name: 'ListPlatforms' })
          break
        // Load page with all developers listed.
        case 2: router.push({ name: 'ListDevelopers' })
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