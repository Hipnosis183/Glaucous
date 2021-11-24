<template>
  <div>
    <!-- Navigation bar. -->
    <vi-nav-bar
      nav-title="Settings"
      class="bg-transition"
    >
      <div class="flex-shrink-0 ml-2 my-auto">
        <vi-button @click="restoreSettings()">Restore Default</vi-button>
      </div>
    </vi-nav-bar>
    <!-- Settings panel. -->
    <div class="flex m-4">
      <div class="bg-theme-0 dark:bg-theme-900 bg-transition flex-shrink-0 rounded-l-xl shadow-color w-60">
        <h6>Global Settings</h6>
        <vi-button-settings
          button-icon="icon-global"
          button-label="General Options"
          :button-selected="settingIndex == 0"
          @click="settingIndex = 0"
        />
        <vi-button-settings
          button-icon="icon-brush"
          button-label="Theme Options"
          :button-selected="settingIndex == 1"
          @click="settingIndex = 1"
        />
        <h6>Pages Settings</h6>
        <vi-button-settings
          button-icon="icon-games"
          button-label="Games Options"
          :button-selected="settingIndex == 2"
          @click="settingIndex = 2"
        />
        <vi-button-settings
          button-icon="icon-grid"
          button-icon-size="21px"
          button-label="Lists Options"
          :button-selected="settingIndex == 3"
          @click="settingIndex = 3"
        />
      </div>
      <vi-modal
        rounded="rounded-r-xl"
        class="bg-transition h-content pr-2 w-full"
      >
        <div class="flex max-h-content overflow-hidden">
          <div
            class="flex-1 overflow-y-scroll pr-1"
            :class="{ 'darker-scrollbar ' : $store.getters.getSettingsThemesDarkMode }"
          >
            <!-- General options. -->
            <settings-general v-show="settingIndex == 0" />
            <!-- Theme options. -->
            <settings-themes v-show="settingIndex == 1" />
            <!-- Games options. -->
            <settings-games v-show="settingIndex == 2" />
            <!-- Lists options. -->
            <settings-lists v-show="settingIndex == 3" />
          </div>
        </div>
      </vi-modal>
    </div>
  </div>
</template>

<script>
// Import Vue functions.
import { ref } from 'vue'
import { useStore } from 'vuex'
// Import settings and themes functions.
import { selectColor, selectTheme } from '@/theme'
// Import settings components.
import SettingsGames from './Settings/SettingsGames.vue'
import SettingsGeneral from './Settings/SettingsGeneral.vue'
import SettingsLists from './Settings/SettingsLists.vue'
import SettingsThemes from './Settings/SettingsThemes.vue'

export default {
  name: 'Settings',
  components: {
    SettingsGames,
    SettingsGeneral,
    SettingsLists,
    SettingsThemes
  },
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage settings tabs indexing.
    let settingIndex = ref(0)

    // Manage settings restoring.
    const restoreSettings = () => {
      // Reset settings.
      store.commit('resetSettingsApp')
      // Apply non reactive settings.
      selectColor(store.getters.getSettingsThemesSelectedColor)
      selectTheme(store.getters.getSettingsThemesSelectedTheme)
    }

    return {
      restoreSettings,
      settingIndex
    }
  }
}
</script>

<style lang="postcss" scoped>
/* Calculations. */
.h-content {
  height: calc(100vh - 5.5rem);
}
.max-h-content {
  max-height: calc(100vh - 8.5rem);
}
/* Styling. */
h6 {
  @apply border-b-1 border-theme-300 cursor-default m-4 pb-2 text-theme-400 !important;
}
.dark h6 {
  @apply border-theme-400 text-theme-400 !important;
}
::-webkit-scrollbar-track-piece:start {
  margin-top: 30px;
}
/* Transitions. */
.bg-transition {
  transition: background-color 0.5s;
}
</style>