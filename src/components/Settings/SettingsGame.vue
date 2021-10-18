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
          <!-- Toggle cover image display. -->
          <div class="flex h-10 items-center pl-4 pr-5">
            <p class="mr-auto">Display Cover Image</p>
            <vi-switch v-model="imageCover" />
          </div>
          <!-- Background image display mode. -->
          <div class="flex items-center px-4">
            <p class="mr-auto">Background Image</p>
            <div class="ml-auto w-34">
              <vi-select
                v-model="imageBackground"
                class="w-auto"
              >
                <vi-option
                  v-for="item in imageBackgroundOptions"
                  :key="item.i"
                  :label="item.name"
                  :value="item.i"
                >
                </vi-option>
              </vi-select>
            </div>
          </div>
          <!-- Background image positioning mode. -->
          <div class="flex items-center px-4">
            <p class="mr-auto">Background Placement</p>
            <div class="ml-auto w-34">
              <vi-select
                v-model="placeBackground"
                class="w-auto"
              >
                <vi-option
                  v-for="item in placeBackgroundOptions"
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
import { imageBackgroundOptions, placeBackgroundOptions } from '@/settings'

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
    const imageCover = computed({
      get() {
        return settingsOver.value
          ? store.getters.getSettingsGameOverImageCover
          : store.getters.getSettingsGameImageCover
      },
      set(value) {
        store.commit(settingsOver.value
          ? 'setSettingsGameOverImageCover'
          : 'setSettingsGameImageCover', value)
      }
    })
    const imageBackground = computed({
      get() {
        return settingsOver.value
          ? store.getters.getSettingsGameOverImageBackground
          : store.getters.getSettingsGameImageBackground
      },
      set(value) {
        store.commit(settingsOver.value
          ? 'setSettingsGameOverImageBackground'
          : 'setSettingsGameImageBackground', value)
      }
    })
    const placeBackground = computed({
      get() {
        return settingsOver.value
          ? store.getters.getSettingsGameOverPlaceBackground
          : store.getters.getSettingsGamePlaceBackground
      },
      set(value) {
        store.commit(settingsOver.value
          ? 'setSettingsGameOverPlaceBackground'
          : 'setSettingsGamePlaceBackground', value)
      }
    })

    return {
      imageBackground,
      imageBackgroundOptions,
      imageCover,
      placeBackground,
      placeBackgroundOptions,
      settingsOver
    }
  }
}
</script>

<style>
</style>