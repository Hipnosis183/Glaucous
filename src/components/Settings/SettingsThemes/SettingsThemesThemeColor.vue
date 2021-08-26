<template>
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
</template>

<script>
// Import UI components.
import {
  HipOption,
  HipSelect
} from '../../Component'
// Import theme objects and functions.
import {
  selectColor,
  colors
} from '../../../theme'

export default {
  name: 'SettingsThemesThemeColor',
  components: {
    // UI components.
    HipOption,
    HipSelect
  },
  data() {
    return {
      colors: colors
    }
  },
  computed: {
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