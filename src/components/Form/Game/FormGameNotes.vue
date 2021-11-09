<template>
  <div class="flex w-full">
    <!-- Show game platform notes dialog. -->
    <form-game-notes-view
      v-show="notesPlatformDisplay"
      game-type="GamePlatform"
      @close="notesPlatformShow()"
    />
    <!-- Show game region notes dialog. -->
    <form-game-notes-view
      v-show="notesRegionDisplay"
      game-type="GameRegion"
      @close="notesRegionShow()"
    />
    <!-- Show game version notes dialog. -->
    <form-game-notes-view
      v-show="notesVersionDisplay"
      game-type="GameVersion"
      @close="notesVersionShow()"
    />
    <!-- Notes form. -->
    <vi-input-group
      label="Notes"
      class="w-full"
    >
      <vi-input-button
        first-element
        v-if="showPlatform"
        @click="notesPlatformShow()"
        class="w-1/3"
      >
        Platform
      </vi-input-button>
      <vi-input-button
        v-if="showRegion"
        :first-element="!showPlatform"
        @click="notesRegionShow()"
        :class="!showPlatform ? 'w-1/2' : 'w-1/3'"
      >
        Region
      </vi-input-button>
      <vi-input-button
        v-if="showVersion"
        :first-element="!showPlatform && !showRegion"
        last-element
        @click="notesVersionShow()"
        :class="!showPlatform ? !showRegion ? 'w-full' : 'w-1/2' : 'w-1/3'"
      >
        Version
      </vi-input-button>
    </vi-input-group>
  </div>
</template>

<script>
// Import Vue functions.
import { ref } from 'vue'
// Import form components.
import FormGameNotesView from './FormGameNotesView.vue'

export default {
  name: 'FormGameNotes',
  components: {
    FormGameNotesView
  },
  props: {
    showPlatform: { type: Boolean, default: false },
    showRegion: { type: Boolean, default: false },
    showVersion: { type: Boolean, default: false }
  },
  setup() {
    // Manage notes form.
    let notesPlatformDisplay = ref(false)
    const notesPlatformShow = () => {
      // Toggle game platform notes dialog.
      notesPlatformDisplay.value = !notesPlatformDisplay.value
    }
    let notesRegionDisplay = ref(false)
    const notesRegionShow = () => {
      // Toggle game region notes dialog.
      notesRegionDisplay.value = !notesRegionDisplay.value
    }
    let notesVersionDisplay = ref(false)
    const notesVersionShow = () => {
      // Toggle game version notes dialog.
      notesVersionDisplay.value = !notesVersionDisplay.value
    }

    return {
      notesPlatformDisplay,
      notesPlatformShow,
      notesRegionDisplay,
      notesRegionShow,
      notesVersionDisplay,
      notesVersionShow
    }
  }
}
</script>

<style>
</style>