<template>
  <div>
    <!-- Navigation bar. -->
    <vi-nav-bar
      title="Settings"
      class="bg-transition"
    >
      <div class="flex-shrink-0 ml-2 my-auto">
        <vi-button @click="restoreSettings()">
          Restore Default
        </vi-button>
      </div>
    </vi-nav-bar>
    <!-- Settings panel. -->
    <div class="flex m-6 space-x-6">
      <div class="bg-theme-0 dark:bg-theme-900 bg-transition flex-shrink-0 rounded-xl shadow-color w-60">
        <vi-button-settings
          firstElement
          label="General Options"
          :selected="settingIndex == 0"
          @click="settingIndex = 0"
        />
        <vi-button-settings
          label="Games Options"
          :selected="settingIndex == 1"
          @click="settingIndex = 1"
        />
        <vi-button-settings
          label="Theme Options"
          :selected="settingIndex == 2"
          @click="settingIndex = 2"
        />
        <vi-button-settings
          label="Links Options"
          :selected="settingIndex == 3"
          @click="settingIndex = 3"
        />
      </div>
      <vi-modal class="bg-transition h-content w-full">
        <div class="flex max-h-content overflow-hidden">
          <div class="flex-1 no-scrollbar overflow-y-scroll">
            <!-- General options. -->
            <settings-general v-if="settingIndex == 0" />
            <!-- Games options. -->
            <settings-games v-if="settingIndex == 1" />
            <!-- Theme options. -->
            <settings-themes v-if="settingIndex == 2" />
            <!-- Links options. -->
            <settings-links v-if="settingIndex == 3" />
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
import SettingsGeneral from './Settings/SettingsGeneral.vue'
import SettingsGames from './Settings/SettingsGames.vue'
import SettingsLinks from './Settings/SettingsLinks.vue'
import SettingsThemes from './Settings/SettingsThemes.vue'

export default {
  name: 'Settings',
  components: {
    SettingsGeneral,
    SettingsGames,
    SettingsLinks,
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

<style scoped>
/* Calculations. */
.h-content {
  height: calc(100vh - 6.25rem);
}
.max-h-content {
  max-height: calc(100vh - 10rem);
}
/* Transitions. */
.bg-transition {
  transition: background-color 0.5s;
}
</style>