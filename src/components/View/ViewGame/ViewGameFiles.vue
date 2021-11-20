<template>
  <!-- View files dialog. -->
  <vi-dialog
    @close="$emit('close')"
    class="pos-initial z-10"
  >
    <div v-if="gameFiles.length > 0">
      <!-- Padding. -->
      <div class="w-80" />
      <!-- Header. -->
      <div class="flex justify-between mb-6 mx-2">
        <!-- Title. -->
        <p class="mr-10 pt-1 text-2xl">Files</p>
        <!-- Buttons. -->
        <vi-button
          button-icon="icon-close"
          @click="$emit('close')"
        />
      </div>
      <!-- Separator. -->
      <div class="separator" />
      <!-- List game files. -->
      <div class="space-y-2">
        <div
          v-for="file in gameFiles"
          :key="file.id"
          @click="openFile(file)"
          class="file-card"
        >
          <!-- File name. -->
          <p class="file-text">
            {{ file.name }} ({{ file.paths.length }} {{ file.paths.length > 1 ? 'Files' : 'File' }})
          </p>
        </div>
      </div>
    </div>
    <!-- No files dialog. -->
    <vi-dialog-box
      v-else
      :dialog-overlay="false"
      @accept="$emit('close')"
    >
      No files available.
    </vi-dialog-box>
  </vi-dialog>
</template>

<script>
// Import Vue functions.
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
// Import functions from modules.
import { shell } from '@electron/remote'

export default {
  name: 'ViewGameFiles',
  emits: [
    'close'
  ],
  props: {
    gameInfo: { type: Object },
    regionIndex: { type: Number },
    versionIndex: { type: Number }
  },
  setup(props) {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage game files.
    onMounted(() => { getFiles() })
    let gameFiles = ref([])
    const getFiles = async () => {
      // Set the files directory path for all game types.
      let gamePathPlatform = store.getters.getAppPath + '/data/files/' + props.gameInfo.platform._id + '/' + props.gameInfo._id
      let gamePathRegion = gamePathPlatform + '/' + props.gameInfo.gameRegions[props.regionIndex]._id
      let gamePathVersion = gamePathRegion + '/' + props.gameInfo.gameRegions[props.regionIndex].gameVersions[props.versionIndex]._id
      gameFiles.value = []
      // Load game platform files.
      for (let filePlatform of props.gameInfo.files) {
        filePlatform.path = gamePathPlatform
        gameFiles.value.push(filePlatform)
      }
      // Load game region files.
      for (let fileRegion of props.gameInfo.gameRegions[props.regionIndex].files) {
        fileRegion.path = gamePathRegion
        gameFiles.value.push(fileRegion)
      }
      // Load game version files.
      for (let fileVersion of props.gameInfo.gameRegions[props.regionIndex].gameVersions[props.versionIndex].files) {
        fileVersion.path = gamePathVersion
        gameFiles.value.push(fileVersion)
      }
      gameFiles.value.sort(sortFilesList)
    }
    const sortFilesList = (a, b) => {
      // Compare function that returns natural ordered elements.
      return a.name.localeCompare(b.name, navigator.language, { numeric: true, ignorePunctuation: true })
    }
    const openFile = (file) => {
      if (file.paths.length > 1) {
        // Open the directory that contains the selected files.
        shell.openPath(file.path + '/' + file.id)
      } else {
        // Open the selected file with the system default application.
        shell.openPath(file.path + '/' + file.paths[0])
      }
    }

    return {
      gameFiles,
      openFile
    }
  }
}
</script>

<style lang="postcss" scoped>
/* Styling. */
h6 {
  @apply font-semibold mt-1 text-center text-color-700 text-4xl w-full;
}
.file-card {
  @apply bg-theme-100 dark:bg-theme-900 hover:bg-theme-200 dark:hover:bg-theme-800 cursor-pointer duration-500 flex h-14 rounded-xl overflow-hidden shadow-color transform w-full;
}
.file-text {
  @apply my-auto pointer-events-none px-4;
}
.separator {
  @apply bg-theme-200 dark:bg-theme-600 h-0.5 my-5 w-full;
}
</style>