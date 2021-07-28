<template>
  <div>
    <!-- Navigation bar. -->
    <hip-nav-bar>
      <!-- Padding. -->
      <div class="w-full"></div>
      <!-- Page title. -->
      <p class="m-auto mr-6 text-xl whitespace-nowrap">Settings</p>
    </hip-nav-bar>
    <!-- Settings panel. -->
    <div class="flex m-6 space-x-6">
      <hip-modal class="h-content w-full">
        <div class="flex max-h-content overflow-hidden">
          <div class="flex-1 no-scrollbar overflow-y-scroll items-center">
            <!-- Edit mode. -->
            <div class="option-content">
              <p class="text-xl">Enable edit mode</p>
              <el-switch
                v-model="editMode"
                active-color="var(--color-theme-400)"
              ></el-switch>
            </div>
            <!-- Theme select. -->
            <div class="option-content">
              <p class="text-xl">Select color theme</p>
              <el-select v-model="selectedTheme">
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
            </div>
          </div>
        </div>
      </hip-modal>
    </div>
  </div>
</template>

<script>
// Import UI components.
import {
  HipModal,
  HipNavBar
} from './Component'
// Import theme objects and functions.
import {
  colors,
  selectTheme
} from '../theme'

export default {
  name: 'Settings',
  components: {
    // UI components.
    HipModal,
    HipNavBar
  },
  data() {
    return {
      colors: colors
    }
  },
  computed: {
    editMode: {
      get() { return this.$store.state.editMode },
      set() { this.$store.commit('toggleEditMode') }
    },
    selectedTheme: {
      get() { return this.$store.state.selectedTheme },
      set(value) {
        // Set theme in the configuration file.
        this.$store.commit('selectTheme', value)
        // Set theme in the running application.
        selectTheme(this.colors[this.selectedTheme].codes)
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
/* Calculations. */
.h-content {
  height: calc(100vh - 6.25rem);
}
.max-h-content {
  max-height: calc(100vh - 9.25rem);
}
/* Styling. */
.option-content {
  @apply flex items-center justify-between mx-8 my-6;
}
</style>