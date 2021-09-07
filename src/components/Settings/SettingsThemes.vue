<template>
  <!-- Header. -->
  <hip-section-header label="Theme Options">
    <!-- Dark mode. -->
    <hip-section-content>
      <p class="text-xl">Dark mode</p>
      <hip-switch v-model="darkMode" />
    </hip-section-content>
    <!-- Theme select. -->
    <hip-section-content>
      <p class="text-xl">Theme</p>
      <hip-select
        v-model="selectedTheme"
        class="w-max"
      >
        <hip-option
          v-for="theme in themes"
          :key="theme.i"
          :label="theme.name"
          :value="theme.i"
        >
          <div class="align-middle inline-flex items-center space-x-4">
            <div class="inline-flex space-x-2">
              <div
                :style="{ backgroundColor: theme.codes[2] }"
                class="h-6 rounded-full w-6"
              />
              <div
                :style="{ backgroundColor: theme.codes[8] }"
                class="h-6 rounded-full w-6"
              />
            </div>
            <p>{{ theme.name }}</p>
          </div>
        </hip-option>
      </hip-select>
    </hip-section-content>
    <!-- Color theme select. -->
    <hip-section-content>
      <p class="text-xl">Color theme</p>
      <hip-select
        v-model="selectedColor"
        class="w-max"
      >
        <hip-option
          v-for="color in colors"
          :key="color.i"
          :label="color.name"
          :value="color.i"
        >
          <div class="align-middle inline-flex items-center space-x-4">
            <div
              :style="{ backgroundColor: color.codes[4] }"
              class="h-6 rounded-full w-6"
            />
            <p>{{ color.name }}</p>
          </div>
        </hip-option>
      </hip-select>
    </hip-section-content>
  </hip-section-header>
</template>

<script>
// Import UI components.
import {
  HipOption,
  HipSectionContent,
  HipSectionHeader,
  HipSelect,
  HipSwitch
} from '../Component'
// Import theme objects and functions.
import {
  colors,
  selectColor,
  selectTheme,
  themes
} from '../../theme'

export default {
  name: 'SettingsThemes',
  components: {
    // UI components.
    HipOption,
    HipSectionContent,
    HipSectionHeader,
    HipSelect,
    HipSwitch
  },
  data() {
    return {
      colors: colors,
      themes: themes
    }
  },
  computed: {
    darkMode: {
      get() { return this.$store.getters.getSettingsThemesDarkMode },
      set() { this.$store.commit('setSettingsThemesDarkMode') }
    },
    selectedTheme: {
      get() { return this.$store.getters.getSettingsThemesSelectedTheme },
      set(value) {
        // Set theme in the configuration file.
        this.$store.commit('setSettingsThemesSelectedTheme', value)
        // Set theme in the running application.
        selectTheme(this.themes[this.selectedTheme].codes)
      }
    },
    selectedColor: {
      get() { return this.$store.getters.getSettingsThemesSelectedColor },
      set(value) {
        // Set color theme in the configuration file.
        this.$store.commit('setSettingsThemesSelectedColor', value)
        // Set color theme in the running application.
        selectColor(this.colors[this.selectedColor].codes)
      }
    }
  }
}
</script>

<style>
</style>