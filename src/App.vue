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
// Import settings objects and functions.
import { selectListColumns, selectImageColumns, selectCardCorners, selectImageCorners } from '@/settings'
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

    // Set theme stored in the configuration.
    selectTheme(store.getters.getSettingsThemesSelectedTheme)
    // Set color theme stored in the configuration.
    selectColor(store.getters.getSettingsThemesSelectedColor)
    // Set number of columns of lists in the configuration.
    selectFont(store.getters.getSettingsThemesSelectedFont)
    // Set number of columns of lists in the configuration.
    selectListColumns(store.getters.getSettingsListsListColumns)
    // Set number of columns of images in the configuration.
    selectImageColumns(store.getters.getSettingsImagesImageColumns)
    // Set border radius of cards in the configuration.
    selectCardCorners(store.getters.getSettingsCardsCardCorners)
    // Set border radius of images in the configuration.
    selectImageCorners(store.getters.getSettingsImagesImageCorners)

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