<template>
  <div>
    <!-- Navigation bar. -->
    <hip-nav-bar
      title="Settings"
      class="bg-transition"
    />
    <!-- Settings panel. -->
    <div class="flex m-6 space-x-6">
      <hip-modal class="bg-transition h-content w-full">
        <div class="flex max-h-content overflow-hidden">
          <div class="flex-1 no-scrollbar overflow-y-scroll items-center">
            <!-- Edit mode. -->
            <div class="option-content">
              <p class="text-xl">Enable edit mode</p>
              <el-switch
                v-model="editMode"
                active-color="var(--color-color-500)"
              ></el-switch>
            </div>
            <!-- Dark mode. -->
            <div class="option-content">
              <p class="text-xl">Enable dark mode</p>
              <el-switch
                v-model="darkMode"
                active-color="var(--color-color-500)"
              ></el-switch>
            </div>
            <!-- Theme select. -->
            <div class="option-content">
              <p class="text-xl">Select theme</p>
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
            </div>
            <!-- Color theme select. -->
            <div class="option-content">
              <p class="text-xl">Select color theme</p>
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
            </div>
            <!-- Google search. -->
            <div class="option-content">
              <p class="text-xl">Enable Google search icon</p>
              <el-switch
                v-model="searchGoogle"
                active-color="var(--color-color-500)"
              ></el-switch>
            </div>
            <!-- Google search key. -->
            <div class="option-content">
              <p class="text-xl">Select Google search key</p>
              <el-select v-model="searchGoogleKey">
                <el-option
                  v-for="key in googleKeys"
                  :key="key.i"
                  :label="key.name"
                  :value="key.i"
                >
                  <p>{{ key.name }}</p>
                </el-option>
              </el-select>
            </div>
            <!-- Card view mode. -->
            <div class="option-content">
              <p class="text-xl">Card view mode</p>
              <el-select v-model="cardMode">
                <el-option
                  v-for="val in modesViews"
                  :key="val.i"
                  :label="val.name"
                  :value="val.i"
                >
                  <p>{{ val.name }}</p>
                </el-option>
              </el-select>
            </div>
            <!-- Select number of columns for card views. -->
            <div class="option-content">
              <p class="text-xl">Number of columns</p>
              <el-input-number
                v-model="cardColumns"
                :min="1"
                :max="10"
              ></el-input-number>
            </div>
            <!-- Card image display. -->
            <div class="option-content">
              <p class="text-xl">Display card image</p>
              <el-switch
                v-model="cardImageDisplay"
                active-color="var(--color-color-500)"
              ></el-switch>
            </div>
            <!-- Card image position. -->
            <div class="option-content">
              <p class="text-xl">Card image position</p>
              <el-select v-model="cardImagePosition">
                <el-option
                  v-for="val in imagePositions"
                  :key="val.i"
                  :label="val.name"
                  :value="val.i"
                >
                  <p>{{ val.name }}</p>
                </el-option>
              </el-select>
            </div>
            <!-- Card text display. -->
            <div class="option-content">
              <p class="text-xl">Display card text</p>
              <el-switch
                v-model="cardTextDisplay"
                active-color="var(--color-color-500)"
              ></el-switch>
            </div>
            <!-- Card text position. -->
            <div class="option-content">
              <p class="text-xl">Card text position</p>
              <el-select v-model="cardTextPosition">
                <el-option
                  v-for="val in textPositions"
                  :key="val.i"
                  :label="val.name"
                  :value="val.i"
                >
                  <p>{{ val.name }}</p>
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
  selectTheme,
  selectColor,
  themes
} from '../theme'
// Import settings objects and functions.
import {
  modesViews,
  imagePositions,
  textPositions,
  selectCardColumns
} from '../settings'

export default {
  name: 'Settings',
  components: {
    // UI components.
    HipModal,
    HipNavBar
  },
  data() {
    return {
      colors: colors,
      themes: themes,
      modesViews: modesViews,
      imagePositions: imagePositions,
      textPositions: textPositions,
      googleKeys: [
        { i: 0, name: 'Full Title' },
        { i: 1, name: 'Original Title' },
        { i: 2, name: 'Developer' }
      ]
    }
  },
  computed: {
    editMode: {
      get() { return this.$store.state.editMode },
      set() { this.$store.commit('toggleEditMode') }
    },
    darkMode: {
      get() { return this.$store.state.darkMode },
      set() { this.$store.commit('toggleDarkMode') }
    },
    selectedTheme: {
      get() { return this.$store.state.selectedTheme },
      set(value) {
        // Set theme in the configuration file.
        this.$store.commit('selectTheme', value)
        // Set theme in the running application.
        selectTheme(this.themes[this.selectedTheme].codes)
      }
    },
    selectedColor: {
      get() { return this.$store.state.selectedColor },
      set(value) {
        // Set color theme in the configuration file.
        this.$store.commit('selectColor', value)
        // Set color theme in the running application.
        selectColor(this.colors[this.selectedColor].codes)
      }
    },
    searchGoogle: {
      get() { return this.$store.state.searchGoogle },
      set() { this.$store.commit('toggleSearchGoogle') }
    },
    searchGoogleKey: {
      get() { return this.$store.state.searchGoogleKey },
      set(value) { this.$store.commit('selectSearchGoogleKey', value) }
    },
    cardMode: {
      get() { return this.$store.state.cardMode },
      set(value) { this.$store.commit('selectCardMode', value) }
    },
    cardColumns: {
      get() { return this.$store.state.cardColumns },
      set(value) {
        this.$store.commit('selectCardColumns', value)
        selectCardColumns(this.cardColumns)
      }
    },
    cardImageDisplay: {
      get() { return this.$store.state.cardImageDisplay },
      set() { this.$store.commit('toggleCardImageDisplay') }
    },
    cardImagePosition: {
      get() { return this.$store.state.cardImagePosition },
      set(value) { this.$store.commit('selectCardImagePosition', value) }
    },
    cardTextDisplay: {
      get() { return this.$store.state.cardTextDisplay },
      set() { this.$store.commit('toggleCardTextDisplay') }
    },
    cardTextPosition: {
      get() { return this.$store.state.cardTextPosition },
      set(value) { this.$store.commit('selectCardTextPosition', value) }
    },
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
/* Transitions. */
.bg-transition {
  transition: background-color 1s;
}
</style>