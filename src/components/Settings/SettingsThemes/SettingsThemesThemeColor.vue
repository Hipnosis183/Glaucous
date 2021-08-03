<template>
  <p class="text-xl">Color theme</p>
  <el-select v-model="selectedColor">
    <el-option
      v-for="color in colors"
      :key="color.i"
      :label="color.name"
      :value="color.i"
    >
      <div class="inline-flex items-center space-x-4">
        <div
          :style="{ backgroundColor: color.codes[4] }"
          class="h-6 rounded-full w-6"
        />
        <p>{{ color.name }}</p>
      </div>
    </el-option>
  </el-select>
</template>

<script>
// Import theme objects and functions.
import {
  selectColor,
  colors
} from '../../../theme'

export default {
  name: 'SettingsThemesThemeColor',
  data() {
    return {
      colors: colors
    }
  },
  computed: {
    selectedColor: {
      get() { return this.$store.state.selectedColor },
      set(value) {
        // Set color theme in the configuration file.
        this.$store.commit('selectColor', value)
        // Set color theme in the running application.
        selectColor(this.colors[this.selectedColor].codes)
      }
    }
  }
}
</script>

<style>
</style>