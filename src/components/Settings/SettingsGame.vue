<template>
  <!-- Open list settings dialog. -->
  <div class="flex-shrink-0 ml-2 my-auto">
    <vi-menu-button
      icon="icon-grid"
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
          <!-- Toggle minimal UI display. -->
          <div class="flex h-10 items-center pl-4 pr-5">
            <p class="mr-auto">Minimal UI Display</p>
            <vi-switch v-model="minimalUiDisplay" />
          </div>
          <!-- Toggle cover image display. -->
          <div class="flex h-10 items-center pl-4 pr-5">
            <p class="mr-auto">Display Cover Image</p>
            <vi-switch v-model="displayCoverImage" />
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
        </div>
      </div>
    </vi-menu-button>
  </div>
</template>

<script>
// Import Vue functions.
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
// Import settings objects and functions.
import { backgroundImageOptions, backgroundPlacementOptions } from '@/settings'

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
      get() {
        return settingsOver.value
          ? store.getters.getSettingsGameOverMinimalUiDisplay
          : store.getters.getSettingsGameMinimalUiDisplay
      },
      set(value) {
        store.commit(settingsOver.value
          ? 'setSettingsGameOverMinimalUiDisplay'
          : 'setSettingsGameMinimalUiDisplay', value)
      }
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

    return {
      backgroundImage,
      backgroundImageOptions,
      backgroundPlacement,
      backgroundPlacementOptions,
      displayCoverImage,
      settingsOver,
      minimalUiDisplay
    }
  }
}
</script>

<style>
</style>