<template>
  <div class="space-y-6">
    <vi-section-header section-label="Page Settings">
      <!-- Select background image display mode. -->
      <vi-section-content>
        <p>Background image</p>
        <vi-select
          v-model="backgroundImage"
          class="w-max"
        >
          <vi-option
            v-for="item in backgroundImageOptions"
            :key="item.i"
            :option-label="item.name"
            :option-value="item.i"
          />
        </vi-select>
      </vi-section-content>
      <!-- Select background image placement. -->
      <vi-section-content>
        <p>Background Placement</p>
        <vi-select
          v-model="backgroundPlacement"
          class="w-max"
        >
          <vi-option
            v-for="item in backgroundPlacementOptions"
            :key="item.i"
            :option-label="item.name"
            :option-value="item.i"
          />
        </vi-select>
      </vi-section-content>
    </vi-section-header>
    <vi-section-header
      section-label="Hide Elements"
      section-small
    >
      <!-- Toggle details display. -->
      <vi-section-content>
        <p>Details</p>
        <vi-switch v-model="hideElementsDetails" />
      </vi-section-content>
      <!-- Toggle favorites display. -->
      <vi-section-content>
        <p>Favorites</p>
        <vi-switch v-model="hideElementsFavorite" />
      </vi-section-content>
      <!-- Toggle files display. -->
      <vi-section-content>
        <p>Files</p>
        <vi-switch v-model="hideElementsFiles" />
      </vi-section-content>
      <!-- Toggle gallery display. -->
      <vi-section-content>
        <p>Gallery</p>
        <vi-switch v-model="hideElementsGallery" />
      </vi-section-content>
      <!-- Toggle links display. -->
      <vi-section-content>
        <p>Links</p>
        <vi-switch v-model="hideElementsLinks" />
      </vi-section-content>
      <!-- Toggle notes display. -->
      <vi-section-content>
        <p>Notes</p>
        <vi-switch v-model="hideElementsNotes" />
      </vi-section-content>
      <!-- Toggle playlists display. -->
      <vi-section-content>
        <p>Playlists</p>
        <vi-switch v-model="hideElementsPlaylists" />
      </vi-section-content>
      <!-- Toggle page settings display. -->
      <vi-section-content>
        <p>Cover</p>
        <vi-switch v-model="hideElementsCover" />
      </vi-section-content>
      <!-- Toggle launch display. -->
      <vi-section-content>
        <p>Launch</p>
        <vi-switch v-model="hideElementsLaunch" />
      </vi-section-content>
      <!-- Toggle versions display. -->
      <vi-section-content>
        <p>Versions</p>
        <vi-switch v-model="hideElementsVersions" />
      </vi-section-content>
      <!-- Toggle linking display. -->
      <vi-section-content>
        <p>Linking</p>
        <vi-switch v-model="hideElementsLinking" />
      </vi-section-content>
      <!-- Toggle game settings display. -->
      <vi-section-content>
        <p>Game Settings</p>
        <vi-switch v-model="hideElementsSettingsGame" />
      </vi-section-content>
      <!-- Toggle region flags display. -->
      <vi-section-content>
        <p>Region Flags</p>
        <vi-switch v-model="hideElementsRegionFlags" />
      </vi-section-content>
      <!-- Toggle tags display. -->
      <vi-section-content>
        <p>Tags</p>
        <vi-switch v-model="hideElementsTags" />
      </vi-section-content>
    </vi-section-header>
  </div>
</template>

<script>
// Import Vue functions.
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
// Import settings objects and functions.
import { backgroundImageOptions, backgroundPlacementOptions } from '@/settings'

export default {
  name: 'SettingsGames',
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage background image and placement.
    const backgroundImage = computed({
      get() { return store.getters.getSettingsGameBackgroundImage },
      set(value) { store.commit('setSettingsGameBackgroundImage', value) }
    })
    const backgroundPlacement = computed({
      get() { return store.getters.getSettingsGameBackgroundPlacement },
      set(value) { store.commit('setSettingsGameBackgroundPlacement', value) }
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
      backgroundPlacement,
      backgroundPlacementOptions,
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

<style lang="postcss" scoped>
/* Styling. */
p {
  @apply text-lg;
}
</style>