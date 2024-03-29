<template>
  <div class="space-y-6">
    <vi-section-header section-label="Colors Settings">
      <!-- Dark mode. -->
      <vi-section-content>
        <p class="text-lg">Dark mode</p>
        <vi-switch v-model="darkMode" />
      </vi-section-content>
      <!-- Theme select. -->
      <vi-section-content>
        <p class="text-lg">Theme</p>
        <vi-select
          v-model="selectedTheme"
          class="w-max"
        >
          <vi-option-group
            v-for="(group, index) in themes"
            :key="group.name"
            :option-label="group.name"
            :option-last="index == Object.keys(themes).length - 1"
          >
            <vi-option
              v-for="theme in group.values"
              :key="theme.i"
              :option-label="theme.name"
              :option-value="theme.i"
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
          </vi-option-group>
        </vi-select>
      </vi-section-content>
      <!-- Color theme select. -->
      <vi-section-content>
        <p class="text-lg">Color theme</p>
        <vi-select
          v-model="selectedColor"
          class="w-max"
        >
          <vi-option
            v-for="color in colors"
            :key="color.i"
            :option-label="color.name"
            :option-value="color.i"
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
    <vi-section-header section-label="Style Settings">
      <!-- Font select. -->
      <vi-section-content>
        <p class="text-lg">Font family</p>
        <vi-select
          v-if="fontsList"
          v-model="selectedFont"
          class="w-max"
        >
          <vi-option
            v-for="font in fontsList"
            :key="font"
            :option-label="font"
            :option-value="font"
          />
        </vi-select>
      </vi-section-content>
    </vi-section-header>
  </div>
</template>

<script>
// Import Vue functions.
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
// Import functions from modules.
import { readdirSync } from 'fs-extra'
// Import theme objects and functions.
import { colors, selectColor, selectFont, selectTheme, themes } from '@/theme'

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
    const selectedFont = computed({
      get() { return store.getters.getSettingsThemesSelectedFont },
      set(value) {
        // Set theme in the configuration file.
        store.commit('setSettingsThemesSelectedFont', value)
        // Set theme in the running application.
        selectFont(selectedFont.value)
      }
    })

    // Manage fonts list.
    let fontsList = ref(null)
    onMounted(() => {
      // Set the fonts directory path.
      let fontsPath = __static + '/fonts'
      // Get all files under the directory.
      let fontFiles = readdirSync(fontsPath)
      fontFiles.push('System Default.ttf')
      // Remove extension from file names.
      fontsList.value = fontFiles.map((res) => res.slice(0, -4))
    })

    return {
      colors,
      darkMode,
      fontsList,
      selectedColor,
      selectedFont,
      selectedTheme,
      themes
    }
  }
}
</script>

<style>
</style>