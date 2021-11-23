<template>
  <div :class="$store.getters.getSettingsThemesDarkMode ? 'dark' : ''">
    <div class="bg-theme-100 dark:bg-theme-800 bg-transition flex max-h-screen min-h-screen relative">
      <intro @finish="introFinish = true" />
      <div v-show="introFinish">
        <side-nav />
      </div>
      <div
        v-show="introFinish"
        class="flex flex-1 overflow-hidden"
      >
        <div class="flex-1 no-scrollbar overflow-y-scroll">
          <router-view v-slot="{ Component }">
            <div class="relative">
              <transition
                :name="$store.state.slideBack ? 'slide-b' : 'slide-f'"
                class="absolute bottom-0 left-0 right-0 top-0"
              >
                <component
                  :is="Component"
                  :key="$route.fullPath"
                />
              </transition>
            </div>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import Vue functions.
import { ref } from 'vue'
import { useStore } from 'vuex'
// Import functions from modules.
import { getCurrentWindow } from '@electron/remote'
// Import settings objects and functions.
import { selectImageGridColumns, selectImageCornersRounding, selectListCornersRounding } from '@/settings'
// Import theme objects and functions.
import { selectColor, selectFont, selectTheme } from '@/theme'
// Import intro and sidenav components.
import Intro from '@/components/Intro.vue'
import SideNav from '@/components/SideNav.vue'

export default {
  components: {
    Intro,
    SideNav
  },
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage fullscreen settings change on the fly.
    getCurrentWindow().on('enter-full-screen', () => { manageFullScreen() })
    getCurrentWindow().on('leave-full-screen', () => { manageFullScreen() })
    const manageFullScreen = () => {
      // Check if the fullscreen event came from a hotkey press instead of a settings change.
      if (store.getters.getSettingsGeneralFullscreenMode != getCurrentWindow().isFullScreen()) {
        store.commit('setSettingsGeneralFullscreenMode')
      }
    }

    // Set fullscreen mode if enable in the store.
    getCurrentWindow().setFullScreen(store.getters.getSettingsGeneralFullscreenMode)
    // Set theme stored in the configuration.
    selectTheme(store.getters.getSettingsThemesSelectedTheme)
    // Set color theme stored in the configuration.
    selectColor(store.getters.getSettingsThemesSelectedColor)
    // Set number of columns of lists in the configuration.
    selectFont(store.getters.getSettingsThemesSelectedFont)
    // Set number of columns of images in the configuration.
    selectImageGridColumns(store.getters.getSettingsImagesGridColumns)
    // Set border radius of images in the configuration.
    selectImageCornersRounding(store.getters.getSettingsImagesCornersRounding)
    // Set border radius of cards in the configuration.
    selectListCornersRounding(store.getters.getSettingsListsCornersRounding)

    // Manage intro state.
    let introFinish = ref(false)

    return {
      introFinish
    }
  }
}
</script>

<style scoped>
/* Transitions. */
.bg-transition {
  transition: background-color 0.5s;
}
</style>