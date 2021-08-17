<template>
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
</template>

<script>
// Import UI components.
import {
  HipOption,
  HipSelect
} from '../../Component'
// Import theme objects and functions.
import {
  selectTheme,
  themes
} from '../../../theme'

export default {
  name: 'SettingsThemesTheme',
  components: {
    // UI components.
    HipOption,
    HipSelect
  },
  data() {
    return {
      themes: themes
    }
  },
  computed: {
    selectedTheme: {
      get() { return this.$store.state.selectedTheme },
      set(value) {
        // Set theme in the configuration file.
        this.$store.commit('selectTheme', value)
        // Set theme in the running application.
        selectTheme(this.themes[this.selectedTheme].codes)
      }
    }
  }
}
</script>

<style>
</style>