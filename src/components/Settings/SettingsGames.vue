<template>
  <!-- Open list settings dialog. -->
  <vi-dialog
    @close="$emit('close')"
    class="pos-initial z-10"
  >
    <!-- View hide elements options. -->
    <vi-dialog
      v-show="hideElementsDialog"
      @close="hideElementsShow()"
      class="pos-initial z-20"
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
          @click="hideElementsShow()"
        />
      </div>
      <!-- Separator. -->
      <div class="bg-theme-200 dark:bg-theme-600 h-0.5 my-5 w-full" />
      <!-- Toggle details display. -->
      <div class="flex h-10 items-center px-2">
        <p class="mr-auto">Details</p>
        <vi-switch v-model="hideElementsDetails" />
      </div>
      <!-- Toggle favorites display. -->
      <div class="flex h-10 items-center px-2">
        <p class="mr-auto">Favorites</p>
        <vi-switch v-model="hideElementsFavorite" />
      </div>
      <!-- Toggle files display. -->
      <div class="flex h-10 items-center px-2">
        <p class="mr-auto">Files</p>
        <vi-switch v-model="hideElementsFiles" />
      </div>
      <!-- Toggle gallery display. -->
      <div class="flex h-10 items-center px-2">
        <p class="mr-auto">Gallery</p>
        <vi-switch v-model="hideElementsGallery" />
      </div>
      <!-- Toggle links display. -->
      <div class="flex h-10 items-center px-2">
        <p class="mr-auto">Links</p>
        <vi-switch v-model="hideElementsLinks" />
      </div>
      <!-- Toggle notes display. -->
      <div class="flex h-10 items-center px-2">
        <p class="mr-auto">Notes</p>
        <vi-switch v-model="hideElementsNotes" />
      </div>
      <!-- Toggle playlists display. -->
      <div class="flex h-10 items-center px-2">
        <p class="mr-auto">Playlists</p>
        <vi-switch v-model="hideElementsPlaylists" />
      </div>
      <!-- Toggle page settings display. -->
      <div class="flex h-10 items-center px-2">
        <p class="mr-auto">Page Settings</p>
        <vi-switch v-model="hideElementsSettingsPage" />
      </div>
      <!-- Toggle cover display. -->
      <div class="flex h-10 items-center px-2">
        <p class="mr-auto">Cover</p>
        <vi-switch v-model="hideElementsCover" />
      </div>
      <!-- Toggle launch display. -->
      <div class="flex h-10 items-center px-2">
        <p class="mr-auto">Launch</p>
        <vi-switch v-model="hideElementsLaunch" />
      </div>
      <!-- Toggle versions display. -->
      <div class="flex h-10 items-center px-2">
        <p class="mr-auto">Versions</p>
        <vi-switch v-model="hideElementsVersions" />
      </div>
      <!-- Toggle linking display. -->
      <div class="flex h-10 items-center px-2">
        <p class="mr-auto">Linking</p>
        <vi-switch v-model="hideElementsLinking" />
      </div>
      <!-- Toggle game settings display. -->
      <div class="flex h-10 items-center px-2">
        <p class="mr-auto">Game Settings</p>
        <vi-switch v-model="hideElementsSettingsGame" />
      </div>
      <!-- Toggle region flags display. -->
      <div class="flex h-10 items-center px-2">
        <p class="mr-auto">Region Flags</p>
        <vi-switch v-model="hideElementsRegionFlags" />
      </div>
      <!-- Toggle tags display. -->
      <div class="flex h-10 items-center px-2">
        <p class="mr-auto">Tags</p>
        <vi-switch v-model="hideElementsTags" />
      </div>
    </vi-dialog>
    <!-- Header. -->
    <div class="flex justify-between mb-6 mx-2">
      <!-- Title. -->
      <p class="mr-10 pt-1 text-2xl">Page Settings</p>
      <!-- Buttons. -->
      <vi-button
        button-icon="icon-close"
        @click="$emit('close')"
      />
    </div>
    <!-- Separator. -->
    <div class="bg-theme-200 dark:bg-theme-600 h-0.5 my-5 w-full" />
    <!-- List settings. -->
    <div class="flex">
      <!-- Settings text. -->
      <div class="mr-6 space-y-2">
        <div class="flex invisible mb-3">
          <p>Placeholder</p>
        </div>
        <div class="flex h-10 items-center">
          <p>Background Image</p>
        </div>
        <div class="flex h-10 items-center">
          <p>Background Placement</p>
        </div>
        <div class="flex h-10 items-center">
          <p>Color Theme</p>
        </div>
        <div class="flex h-10 items-center">
          <p>Hide Elements</p>
        </div>
      </div>
      <!-- Settings global controllers. -->
      <div class="space-y-2 w-80">
        <!-- Header. -->
        <div class="flex mb-4 -mt-1 text-theme-700 dark:text-theme-200 w-full">
          <div class="flex justify-center w-1/2">Global</div>
          <div class="flex justify-center w-1/2">Overwrite</div>
        </div>
        <!-- Select background image display mode. -->
        <div class="flex space-x-2">
          <vi-select
            v-model="backgroundImage"
            class="w-auto"
          >
            <vi-option
              v-for="item in backgroundImageOptions"
              :key="item.i"
              :option-label="item.name"
              :option-value="item.i"
            />
          </vi-select>
          <vi-select
            v-model="backgroundImageOver"
            class="w-auto"
          >
            <vi-option
              option-label="- Global -"
              :option-value="0"
              class="text-center"
            />
            <vi-option
              v-for="item in backgroundImageOptions"
              :key="item.i"
              :option-label="item.name"
              :option-value="item.i"
            />
          </vi-select>
        </div>
        <!-- Select background image placement. -->
        <div class="flex space-x-2">
          <vi-select
            v-model="backgroundPlacement"
            class="w-auto"
          >
            <vi-option
              v-for="item in backgroundPlacementOptions"
              :key="item.i"
              :option-label="item.name"
              :option-value="item.i"
            />
          </vi-select>
          <vi-select
            v-model="backgroundPlacementOver"
            class="w-auto"
          >
            <vi-option
              option-label="- Global -"
              :option-value="0"
              class="text-center"
            />
            <vi-option
              v-for="item in backgroundPlacementOptions"
              :key="item.i"
              :option-label="item.name"
              :option-value="item.i"
            />
          </vi-select>
        </div>
        <!-- Color theme overwrite select. -->
        <vi-select
          v-model="colorTheme"
          class="w-auto"
        >
          <vi-option
            option-label="Default"
            option-value="default"
          />
          <vi-option
            v-for="color in colors"
            :key="color.i"
            :option-label="color.name"
            :option-value="color.i"
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
        <!-- Open hide elements dialog. -->
        <vi-button
          button-large
          @click="hideElementsShow()"
        >Configure</vi-button>
      </div>
    </div>
  </vi-dialog>
</template>

<script>
// Import Vue functions.
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
// Import theme objects and functions.
import { colors, selectColor } from '@/theme'

export default {
  name: 'SettingsGames',
  emits: [
    'close'
  ],
  setup() {
    // Instantiate Vue elements.
    const route = useRoute()
    const store = useStore()

    // Initialize the current game settings on the store.
    onMounted(() => {
      // Avoid carrying the values of other games previously loaded.
      if (store.state.gameSelected.gamePlatform == route.params.id) {
        store.commit('setGameOverStore')
      }
    })

    // Manage background image.
    const backgroundImage = computed({
      get() { return store.getters.getSettingsGameBackgroundImage },
      set(value) { store.commit('setSettingsGameBackgroundImage', value) }
    })
    const backgroundImageOver = computed({
      get() { return store.getters.getSettingsGameOverBackgroundImage },
      set(value) { store.commit('setSettingsGameOverBackgroundImage', value) }
    })
    const backgroundImageOptions = [
      { i: 1, name: 'Default' },
      { i: 2, name: 'Background' },
      { i: 3, name: 'Cover' },
      { i: 4, name: 'Title' },
      { i: 5, name: 'In-Game' }
    ]

    // Manage background placement.
    const backgroundPlacement = computed({
      get() { return store.getters.getSettingsGameBackgroundPlacement },
      set(value) { store.commit('setSettingsGameBackgroundPlacement', value) }
    })
    const backgroundPlacementOver = computed({
      get() { return store.getters.getSettingsGameOverBackgroundPlacement },
      set(value) { store.commit('setSettingsGameOverBackgroundPlacement', value) }
    })
    const backgroundPlacementOptions = [
      { i: 1, name: 'Default' },
      { i: 2, name: 'Top' },
      { i: 3, name: 'Bottom' },
      { i: 4, name: 'Left' },
      { i: 5, name: 'Right' }
    ]

    // Manage color theme.
    const colorTheme = computed({
      get() { return store.getters.getSettingsGameOverColorTheme },
      set(value) {
        // Set color theme in the configuration file.
        store.commit('setSettingsGameOverColorTheme', value)
        // Set color theme in the running application.
        selectColor(colorTheme.value != 'default' ? colorTheme.value : store.getters.getSettingsThemesSelectedColor)
      }
    })
    const colorSelect = (res) => {
      // Load theme only when the game has loaded as well.
      if (colorTheme.value) {
        selectColor(res
          ? colorTheme.value != 'default'
            ? colorTheme.value
            : store.getters.getSettingsThemesSelectedColor
          : store.getters.getSettingsThemesSelectedColor)
      }
    }
    onMounted(() => { colorSelect(true) })
    onUnmounted(() => {
      colorSelect(false)
      // Unload theme settings overwrite from the store.
      store.state.settingsApp.settingsGame.settingsOver.colorTheme = null
    })

    // Manage hide elements dialog.
    let hideElementsDialog = ref(false)
    const hideElementsShow = () => {
      hideElementsDialog.value = !hideElementsDialog.value
    }
    const hideElementsDetails = computed({
      get() { return store.getters.getSettingsGameHideElementsDetails },
      set(value) { store.commit('setSettingsGameHideElementsDetails', value) }
    })
    const hideElementsFavorite = computed({
      get() { return store.getters.getSettingsGameHideElementsFavorite },
      set(value) { store.commit('setSettingsGameHideElementsFavorite', value) }
    })
    const hideElementsFiles = computed({
      get() { return store.getters.getSettingsGameHideElementsFiles },
      set(value) { store.commit('setSettingsGameHideElementsFiles', value) }
    })
    const hideElementsGallery = computed({
      get() { return store.getters.getSettingsGameHideElementsGallery },
      set(value) { store.commit('setSettingsGameHideElementsGallery', value) }
    })
    const hideElementsLinks = computed({
      get() { return store.getters.getSettingsGameHideElementsLinks },
      set(value) { store.commit('setSettingsGameHideElementsLinks', value) }
    })
    const hideElementsNotes = computed({
      get() { return store.getters.getSettingsGameHideElementsNotes },
      set(value) { store.commit('setSettingsGameHideElementsNotes', value) }
    })
    const hideElementsPlaylists = computed({
      get() { return store.getters.getSettingsGameHideElementsPlaylists },
      set(value) { store.commit('setSettingsGameHideElementsPlaylists', value) }
    })
    const hideElementsSettingsPage = computed({
      get() { return store.getters.getSettingsGameHideElementsSettingsPage },
      set(value) { store.commit('setSettingsGameHideElementsSettingsPage', value) }
    })
    const hideElementsCover = computed({
      get() { return store.getters.getSettingsGameHideElementsCover },
      set(value) { store.commit('setSettingsGameHideElementsCover', value) }
    })
    const hideElementsLaunch = computed({
      get() { return store.getters.getSettingsGameHideElementsLaunch },
      set(value) { store.commit('setSettingsGameHideElementsLaunch', value) }
    })
    const hideElementsVersions = computed({
      get() { return store.getters.getSettingsGameHideElementsVersions },
      set(value) { store.commit('setSettingsGameHideElementsVersions', value) }
    })
    const hideElementsLinking = computed({
      get() { return store.getters.getSettingsGameHideElementsLinking },
      set(value) { store.commit('setSettingsGameHideElementsLinking', value) }
    })
    const hideElementsSettingsGame = computed({
      get() { return store.getters.getSettingsGameHideElementsSettingsGame },
      set(value) { store.commit('setSettingsGameHideElementsSettingsGame', value) }
    })
    const hideElementsRegionFlags = computed({
      get() { return store.getters.getSettingsGameHideElementsRegionFlags },
      set(value) { store.commit('setSettingsGameHideElementsRegionFlags', value) }
    })
    const hideElementsTags = computed({
      get() { return store.getters.getSettingsGameHideElementsTags },
      set(value) { store.commit('setSettingsGameHideElementsTags', value) }
    })

    return {
      backgroundImage,
      backgroundImageOptions,
      backgroundImageOver,
      backgroundPlacement,
      backgroundPlacementOptions,
      backgroundPlacementOver,
      colorTheme,
      colors,
      hideElementsCover,
      hideElementsDetails,
      hideElementsDialog,
      hideElementsFavorite,
      hideElementsFiles,
      hideElementsGallery,
      hideElementsLinks,
      hideElementsNotes,
      hideElementsPlaylists,
      hideElementsSettingsPage,
      hideElementsLaunch,
      hideElementsVersions,
      hideElementsLinking,
      hideElementsSettingsGame,
      hideElementsRegionFlags,
      hideElementsShow,
      hideElementsTags
    }
  }
}
</script>

<style>
</style>