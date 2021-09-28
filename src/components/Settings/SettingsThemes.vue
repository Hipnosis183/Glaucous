<template>
  <!-- Header. -->
  <vi-section-header label="Theme Options">
    <!-- Dark mode. -->
    <vi-section-content>
      <p class="text-xl">Dark mode</p>
      <vi-switch v-model="darkMode" />
    </vi-section-content>
    <!-- Theme select. -->
    <vi-section-content>
      <p class="text-xl">Theme</p>
      <vi-select
        v-model="selectedTheme"
        class="w-max"
      >
        <vi-option
          v-for="theme in themes"
          :key="theme.i"
          :label="theme.name"
          :value="theme.i"
        >
          <div class="align-middle inline-flex items-center space-x-4">
            <div class="inline-flex space-x-2">
              <div
                :style="{ backgroundColor: 'rgb(' + theme.codes[2] + ')' }"
                class="h-6 rounded-full w-6"
              />
              <div
                :style="{ backgroundColor: 'rgb(' + theme.codes[8] + ')' }"
                class="h-6 rounded-full w-6"
              />
            </div>
            <p>{{ theme.name }}</p>
          </div>
        </vi-option>
      </vi-select>
    </vi-section-content>
    <!-- Color theme select. -->
    <vi-section-content>
      <p class="text-xl">Color theme</p>
      <vi-select
        v-model="selectedColor"
        class="w-max"
      >
        <vi-option
          v-for="color in colors"
          :key="color.i"
          :label="color.name"
          :value="color.i"
        >
          <div class="align-middle inline-flex items-center space-x-4">
            <div
              :style="{ backgroundColor: 'rgb(' + color.codes[4] + ')' }"
              class="h-6 rounded-full w-6"
            />
            <p>{{ color.name }}</p>
          </div>
        </vi-option>
      </vi-select>
    </vi-section-content>
  </vi-section-header>
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'
// Import theme objects and functions.
import { colors, selectColor, selectTheme, themes } from '@/theme'

export default {
  name: 'SettingsThemes',
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage settings in the store.
    const darkMode = computed({
      get() { return store.getters.getSettingsThemesDarkMode },
      set() { store.commit('setSettingsThemesDarkMode') }
    })
    const selectedColor = computed({
      get() { return store.getters.getSettingsThemesSelectedColor },
      set(value) {
        // Set color theme in the configuration file.
        store.commit('setSettingsThemesSelectedColor', value)
        // Set color theme in the running application.
        selectColor(selectedColor.value)
      }
    })
    const selectedTheme = computed({
      get() { return store.getters.getSettingsThemesSelectedTheme },
      set(value) {
        // Set theme in the configuration file.
        store.commit('setSettingsThemesSelectedTheme', value)
        // Set theme in the running application.
        selectTheme(selectedTheme.value)
      }
    })

    return {
      colors,
      darkMode,
      selectedColor,
      selectedTheme,
      themes
    }
  }
}
</script>

<style>
</style>