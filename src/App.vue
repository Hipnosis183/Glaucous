<template>
  <div :class="$store.getters.getSettingsThemesDarkMode ? 'dark' : ''">
    <div class="bg-theme-100 dark:bg-theme-800 bg-transition flex max-h-screen min-h-screen relative">
      <side-nav />
      <div class="flex flex-1 overflow-hidden">
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
// Import sidenav component.
import SideNav from '@/components/SideNav.vue'
// Import settings objects and functions.
import { selectCardColumns } from '@/settings'
// Import theme objects and functions.
import {
  selectColor,
  selectTheme
} from '@/theme'

// Import Vue functions.
import { useStore } from 'vuex'

export default {
  components: {
    SideNav
  },
  setup() {
    // Instantiate Vuex store.
    const store = useStore()

    // Set theme stored in the configuration.
    selectTheme(store.getters.getSettingsThemesSelectedTheme)
    // Set color theme stored in the configuration.
    selectColor(store.getters.getSettingsThemesSelectedColor)
    // Set number of columns of lists in the configuration.
    selectCardColumns(store.getters.getSettingsCardsCardColumns)
  }
}
</script>

<style scoped>
/* Transitions. */
.bg-transition {
  transition: background-color 1s;
}
</style>