<template>
  <!-- View minimal UI display settings. -->
  <vi-dialog
    v-show="minimalUiDisplayDialog"
    @close="minimalUiDisplayShow()"
    class="pos-initial z-10"
  >
    <!-- Padding. -->
    <div class="w-80" />
    <!-- Header. -->
    <div class="flex justify-between mb-6 mx-2">
      <!-- Title. -->
      <p class="mr-10 pt-1 text-2xl">Hide Elements</p>
      <!-- Buttons. -->
      <vi-button
        button-icon="icon-close"
        @click="minimalUiDisplayShow()"
      />
    </div>
    <!-- Toggle playlists display. -->
    <div class="flex h-10 items-center px-2">
      <p class="mr-auto">Playlists</p>
      <vi-switch v-model="minimalUiDisplayPlaylists" />
    </div>
    <!-- Toggle favorites display. -->
    <div class="flex h-10 items-center px-2">
      <p class="mr-auto">Favorites</p>
      <vi-switch v-model="minimalUiDisplayFavorites" />
    </div>
    <!-- Toggle game launch display. -->
    <div class="flex h-10 items-center px-2">
      <p class="mr-auto">Game Launch</p>
      <vi-switch v-model="minimalUiDisplayGameLaunch" />
    </div>
    <!-- Toggle version select display. -->
    <div class="flex h-10 items-center px-2">
      <p class="mr-auto">Version Select</p>
      <vi-switch v-model="minimalUiDisplayVersionSelect" />
    </div>
    <!-- Toggle game settings display. -->
    <div class="flex h-10 items-center px-2">
      <p class="mr-auto">Game Settings</p>
      <vi-switch v-model="minimalUiDisplayGameSettings" />
    </div>
    <!-- Toggle details display. -->
    <div class="flex h-10 items-center px-2">
      <p class="mr-auto">Details</p>
      <vi-switch v-model="minimalUiDisplayDetails" />
    </div>
    <!-- Toggle game linking display. -->
    <div class="flex h-10 items-center px-2">
      <p class="mr-auto">Game Linking</p>
      <vi-switch v-model="minimalUiDisplayGameLinking" />
    </div>
    <!-- Toggle links display. -->
    <div class="flex h-10 items-center px-2">
      <p class="mr-auto">Links</p>
      <vi-switch v-model="minimalUiDisplayLinks" />
    </div>
    <!-- Toggle gallery display. -->
    <div class="flex h-10 items-center px-2">
      <p class="mr-auto">Gallery</p>
      <vi-switch v-model="minimalUiDisplayGallery" />
    </div>
    <!-- Toggle tags display. -->
    <div class="flex h-10 items-center px-2">
      <p class="mr-auto">Game Tags</p>
      <vi-switch v-model="minimalUiDisplayGameTags" />
    </div>
    <!-- Toggle region flags display. -->
    <div class="flex h-10 items-center px-2">
      <p class="mr-auto">Region Flags</p>
      <vi-switch v-model="minimalUiDisplayRegionFlags" />
    </div>
    <!-- Settings behavior aclaration. -->
    <p class="bg-theme-100 dark:bg-theme-800 mt-4 py-2 rounded-lg shadow-color text-center">
      These settings are global
    </p>
  </vi-dialog>
  <!-- Open list settings dialog. -->
  <div class="flex-shrink-0 ml-2 my-auto">
    <vi-menu-button
      icon="icon-grid"
      :offset="[0, 10]"
      placement="bottom-start"
    >
      <!-- List settings. -->
      <div class="text-center w-96">
        <h1 class="font-medium mb-5 -mt-1 text-lg">Game Settings</h1>
        <div class="space-y-2">
          <!-- Toggle global settings overwrite. -->
          <div class="flex h-10 items-center pl-4 pr-5">
            <p class="mr-auto">Global Settings Overwrite</p>
            <vi-switch v-model="settingsOver" />
          </div>
          <!-- Toggle cover image display. -->
          <div class="flex h-10 items-center pl-4 pr-5">
            <p class="mr-auto">Display Cover Image</p>
            <vi-switch v-model="displayCoverImage" />
          </div>
          <!-- Toggle minimal UI display. -->
          <div class="flex h-10 items-center pl-4 pr-5">
            <p class="mr-auto">Minimal UI Display</p>
            <vi-icon
              icon-manual
              @click="minimalUiDisplayShow()"
              class="cursor-pointer mr-2 text-theme-300 vi-menu-close w-6"
            >
              <icon-setting-f class="vi-menu-close" />
            </vi-icon>
            <vi-switch v-model="minimalUiDisplay" />
          </div>
          <!-- Select background image display mode. -->
          <div class="flex items-center px-4">
            <p class="mr-auto">Background Image</p>
            <div class="ml-auto w-34">
              <vi-select
                v-model="backgroundImage"
                class="w-auto"
              >
                <vi-option
                  v-for="item in backgroundImageOptions"
                  :key="item.i"
                  :label="item.name"
                  :value="item.i"
                >
                </vi-option>
              </vi-select>
            </div>
          </div>
          <!-- Select background image placement. -->
          <div class="flex items-center px-4">
            <p class="mr-auto">Background Placement</p>
            <div class="ml-auto w-34">
              <vi-select
                v-model="backgroundPlacement"
                class="w-auto"
              >
                <vi-option
                  v-for="item in backgroundPlacementOptions"
                  :key="item.i"
                  :label="item.name"
                  :value="item.i"
                >
                </vi-option>
              </vi-select>
            </div>
          </div>
          <!-- Color theme overwrite select. -->
          <div class="flex items-center px-4">
            <p class="mr-auto">Color Theme Overwrite</p>
            <div class="ml-auto w-34">
              <vi-select
                v-model="colorThemeOver"
                class="w-auto"
              >
                <vi-option
                  label="Default"
                  value="default"
                />
                <vi-option
                  v-for="color in colors"
                  :key="color.i"
                  :label="color.name"
                  :value="color.i"
                  class="text-left"
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
            </div>
          </div>
        </div>
      </div>
    </vi-menu-button>
  </div>
</template>

<script>
// Import Vue functions.
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useStore } from 'vuex'
// Import settings objects and functions.
import { backgroundImageOptions, backgroundPlacementOptions } from '@/settings'
// Import theme objects and functions.
import { colors, selectColor } from '@/theme'
// Import utility functions.
import { debounce } from '@/utils/debounce'

export default {
  name: 'SettingsGame',
  props: {
  },
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Initialize the current game settings on the store.
    onMounted(() => { store.commit('setGameOverStore') })

    // Manage settings in the store.
    const settingsOver = computed({
      get() { return store.getters.getSettingsGameOverSettingsOver },
      set(value) { store.commit('setSettingsGameOverSettingsOver', value) }
    })
    const minimalUiDisplay = computed({
      get() { return store.getters.getSettingsGameMinimalUiDisplay },
      set(value) { store.commit('setSettingsGameMinimalUiDisplay', value) }
    })
    const displayCoverImage = computed({
      get() {
        return settingsOver.value
          ? store.getters.getSettingsGameOverDisplayCoverImage
          : store.getters.getSettingsGameDisplayCoverImage
      },
      set(value) {
        store.commit(settingsOver.value
          ? 'setSettingsGameOverDisplayCoverImage'
          : 'setSettingsGameDisplayCoverImage', value)
      }
    })
    const backgroundImage = computed({
      get() {
        return settingsOver.value
          ? store.getters.getSettingsGameOverBackgroundImage
          : store.getters.getSettingsGameBackgroundImage
      },
      set(value) {
        store.commit(settingsOver.value
          ? 'setSettingsGameOverBackgroundImage'
          : 'setSettingsGameBackgroundImage', value)
      }
    })
    const backgroundPlacement = computed({
      get() {
        return settingsOver.value
          ? store.getters.getSettingsGameOverBackgroundPlacement
          : store.getters.getSettingsGameBackgroundPlacement
      },
      set(value) {
        store.commit(settingsOver.value
          ? 'setSettingsGameOverBackgroundPlacement'
          : 'setSettingsGameBackgroundPlacement', value)
      }
    })
    const colorThemeOver = computed({
      get() { return store.getters.getSettingsGameOverColorThemeOver },
      set(value) {
        // Set color theme in the configuration file.
        store.commit('setSettingsGameOverColorThemeOver', value)
        // Set color theme in the running application.
        selectColor(colorThemeOver.value != 'default' ? colorThemeOver.value : store.getters.getSettingsThemesSelectedColor)
      }
    })

    // Manage color theme load/unload.
    const colorSelect = (res) => {
      selectColor(res
        ? colorThemeOver.value != 'default'
          ? colorThemeOver.value
          : store.getters.getSettingsThemesSelectedColor
        : store.getters.getSettingsThemesSelectedColor)
    }
    const colorSelectDebounced = debounce((res) => colorSelect(res), 100)
    onMounted(() => { colorSelectDebounced(true) })
    onUnmounted(() => { colorSelectDebounced(false) })

    // Manage details display.
    let minimalUiDisplayDialog = ref(false)
    const minimalUiDisplayShow = () => {
      // Toggle details dialog.
      minimalUiDisplayDialog.value = !minimalUiDisplayDialog.value
    }
    const minimalUiDisplayPlaylists = computed({
      get() { return store.getters.getSettingsGameMinimalUiDisplayPlaylists },
      set(value) { store.commit('setSettingsGameMinimalUiDisplayPlaylists', value) }
    })
    const minimalUiDisplayFavorites = computed({
      get() { return store.getters.getSettingsGameMinimalUiDisplayFavorites },
      set(value) { store.commit('setSettingsGameMinimalUiDisplayFavorites', value) }
    })
    const minimalUiDisplayGameLaunch = computed({
      get() { return store.getters.getSettingsGameMinimalUiDisplayGameLaunch },
      set(value) { store.commit('setSettingsGameMinimalUiDisplayGameLaunch', value) }
    })
    const minimalUiDisplayVersionSelect = computed({
      get() { return store.getters.getSettingsGameMinimalUiDisplayVersionSelect },
      set(value) { store.commit('setSettingsGameMinimalUiDisplayVersionSelect', value) }
    })
    const minimalUiDisplayGameSettings = computed({
      get() { return store.getters.getSettingsGameMinimalUiDisplayGameSettings },
      set(value) { store.commit('setSettingsGameMinimalUiDisplayGameSettings', value) }
    })
    const minimalUiDisplayDetails = computed({
      get() { return store.getters.getSettingsGameMinimalUiDisplayDetails },
      set(value) { store.commit('setSettingsGameMinimalUiDisplayDetails', value) }
    })
    const minimalUiDisplayGameLinking = computed({
      get() { return store.getters.getSettingsGameMinimalUiDisplayGameLinking },
      set(value) { store.commit('setSettingsGameMinimalUiDisplayGameLinking', value) }
    })
    const minimalUiDisplayLinks = computed({
      get() { return store.getters.getSettingsGameMinimalUiDisplayLinks },
      set(value) { store.commit('setSettingsGameMinimalUiDisplayLinks', value) }
    })
    const minimalUiDisplayGallery = computed({
      get() { return store.getters.getSettingsGameMinimalUiDisplayGallery },
      set(value) { store.commit('setSettingsGameMinimalUiDisplayGallery', value) }
    })
    const minimalUiDisplayGameTags = computed({
      get() { return store.getters.getSettingsGameMinimalUiDisplayGameTags },
      set(value) { store.commit('setSettingsGameMinimalUiDisplayGameTags', value) }
    })
    const minimalUiDisplayRegionFlags = computed({
      get() { return store.getters.getSettingsGameMinimalUiDisplayRegionFlags },
      set(value) { store.commit('setSettingsGameMinimalUiDisplayRegionFlags', value) }
    })

    return {
      backgroundImage,
      backgroundImageOptions,
      backgroundPlacement,
      backgroundPlacementOptions,
      colorThemeOver,
      colors,
      displayCoverImage,
      minimalUiDisplay,
      minimalUiDisplayDetails,
      minimalUiDisplayDialog,
      minimalUiDisplayFavorites,
      minimalUiDisplayGallery,
      minimalUiDisplayGameLaunch,
      minimalUiDisplayGameLinking,
      minimalUiDisplayGameSettings,
      minimalUiDisplayGameTags,
      minimalUiDisplayLinks,
      minimalUiDisplayPlaylists,
      minimalUiDisplayRegionFlags,
      minimalUiDisplayShow,
      minimalUiDisplayVersionSelect,
      settingsOver
    }
  }
}
</script>

<style>
</style>