<template>
  <p class="text-xl">Theme</p>
  <el-select v-model="selectedTheme">
    <el-option
      v-for="theme in themes"
      :key="theme.i"
      :label="theme.name"
      :value="theme.i"
    >
      <div class="inline-flex items-center space-x-4">
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
    </el-option>
  </el-select>
</template>

<script>
// Import theme objects and functions.
import {
  selectTheme,
  themes
} from '../../../theme'

export default {
  name: 'SettingsThemesTheme',
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