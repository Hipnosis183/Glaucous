<template>
  <div class="flex w-full">
    <!-- Show game platform files dialog. -->
    <form-game-files-view
      v-show="filesPlatformDisplay"
      game-type="GamePlatform"
      @close="filesPlatformShow()"
    />
    <!-- Show game region files dialog. -->
    <form-game-files-view
      v-show="filesRegionDisplay"
      game-type="GameRegion"
      @close="filesRegionShow()"
    />
    <!-- Show game version files dialog. -->
    <form-game-files-view
      v-show="filesVersionDisplay"
      game-type="GameVersion"
      @close="filesVersionShow()"
    />
    <!-- Files form. -->
    <vi-input-group
      input-label="Files"
      class="w-full"
    >
      <vi-input-button
        v-if="showPlatform"
        input-first
        @click="filesPlatformShow()"
        class="w-1/3"
      >
        Platform
      </vi-input-button>
      <vi-input-button
        v-if="showRegion"
        :input-first="!showPlatform"
        @click="filesRegionShow()"
        :class="!showPlatform ? 'w-1/2' : 'w-1/3'"
      >
        Region
      </vi-input-button>
      <vi-input-button
        v-if="showVersion"
        :input-first="!showPlatform && !showRegion"
        input-last
        @click="filesVersionShow()"
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
import FormGameFilesView from './FormGameFilesView.vue'

export default {
  name: 'FormGameFiles',
  components: {
    FormGameFilesView
  },
  props: {
    showPlatform: { type: Boolean, default: false },
    showRegion: { type: Boolean, default: false },
    showVersion: { type: Boolean, default: false }
  },
  setup() {
    // Manage files form.
    let filesPlatformDisplay = ref(false)
    const filesPlatformShow = () => {
      // Toggle game platform files dialog.
      filesPlatformDisplay.value = !filesPlatformDisplay.value
    }
    let filesRegionDisplay = ref(false)
    const filesRegionShow = () => {
      // Toggle game region files dialog.
      filesRegionDisplay.value = !filesRegionDisplay.value
    }
    let filesVersionDisplay = ref(false)
    const filesVersionShow = () => {
      // Toggle game version files dialog.
      filesVersionDisplay.value = !filesVersionDisplay.value
    }

    return {
      filesPlatformDisplay,
      filesPlatformShow,
      filesRegionDisplay,
      filesRegionShow,
      filesVersionDisplay,
      filesVersionShow
    }
  }
}
</script>

<style>
</style>