<template>
  <!-- Open files dialog. -->
  <vi-dialog
    height="h-full"
    width="w-1/2"
    class="pos-initial z-10"
  >
    <!-- Validation error dialog. -->
    <vi-dialog-box
      v-show="validationErrorDialog"
      @accept="validationErrorShow()"
    >
      Complete the required fields.
    </vi-dialog-box>
    <!-- Header. -->
    <div class="flex justify-between mb-6 mx-2">
      <!-- Title. -->
      <p class="mr-10 pt-1 text-2xl">Files</p>
      <!-- Buttons. -->
      <vi-button
        button-icon="icon-add"
        @click="gameFilesAdd()"
      />
    </div>
    <!-- Files input. -->
    <vi-input
      v-model="files.name"
      label="Name"
      placeholder="Add a name for the file/collection..."
      required
    />
    <!-- Files container. -->
    <div class="flex flex-col h-content mt-4">
      <!-- Files panel. -->
      <div
        @mouseenter="filesHover = true"
        @mouseleave="filesHover = false"
        @dragenter="filesHover = true"
        @dragleave="filesHover = false"
        @dragover.prevent
        @drop.prevent="filesAddDrop"
        class="h-full overflow-hidden p-0.5 select-none"
      >
        <!-- Files to add. -->
        <div
          v-if="files.paths[0]"
          class="bg-theme-100 dark:bg-theme-800 h-full p-3 pr-1 rounded-2xl shadow-color w-full"
        >
          <div
            class="flex-1 h-full mr-0.5 overflow-y-scroll pr-1 small-scrollbar space-y-2"
            :class="{ 'dark-scrollbar ' : $store.getters.getSettingsThemesDarkMode }"
          >
            <!-- Add files button -->
            <div
              @click="filesAddClick()"
              class="bg-theme-200 dark:bg-theme-900 hover:bg-color-200 dark:hover:bg-color-900 cursor-pointer duration-500 flex items-center overflow-hidden rounded-2xl shadow-color w-full"
            >
              <div class="flex items-center mx-auto opacity-40 p-4 pointer-events-none text-theme-800 dark:text-theme-200">
                <h6>Click or drop to add more files...</h6>
              </div>
            </div>
            <!-- Added files list. -->
            <div
              v-for="file in files.paths"
              :key="file"
              class="cursor-pointer relative"
            >
              <vi-chip
                chip-dark
                chip-large
                multiline
                @remove="filesRemove(file)"
              >{{ getFileName(file) }}</vi-chip>
            </div>
          </div>
        </div>
        <!-- No files to add. -->
        <div
          v-else
          @click="filesAddClick()"
          class="cursor-pointer duration-500 flex h-full items-center rounded-2xl shadow-color w-full"
          :class="filesHover ? 'bg-theme-200 dark:bg-theme-900' : 'bg-theme-100 dark:bg-theme-800'"
        >
          <div class="flex flex-col items-center mx-auto opacity-40 p-4 pointer-events-none text-center text-theme-800 dark:text-theme-200">
            <vi-icon
              icon-manual
              class="mb-4 w-16"
            >
              <icon-plus />
            </vi-icon>
            <h6>Click to select files or drag and drop files here...</h6>
          </div>
        </div>
      </div>
      <!-- Separator. -->
      <div
        v-if="gameFiles.length > 0 || gameFilesStoreAdd.length > 0"
        class="bg-theme-200 dark:bg-theme-600 h-0.5 my-5 w-full"
      />
      <!-- Files list section. -->
      <div
        v-if="gameFiles.length > 0 || gameFilesStoreAdd.length > 0"
        class="max-h-content"
      >
        <div class="h-full space-y-2 overflow-y-auto small-scrollbar darker-scrollbar -mr-1 pr-1">
          <!-- Existing files list. -->
          <div
            v-if="gameFiles.length > 0"
            class="space-y-2"
          >
            <div
              v-for="item in gameFiles"
              :key="item"
            >
              <vi-chip
                chip-large
                multiline
                @remove="gameFilesRemoveExist(item.id)"
              >
                {{ item.name }} ({{ item.paths.length }} {{ item.paths.length > 1 ? 'Files' : 'File' }})
              </vi-chip>
            </div>
          </div>
          <!-- Added files list. -->
          <div
            v-if="gameFilesStoreAdd.length > 0"
            class="space-y-2"
          >
            <div
              v-for="(item, index) in gameFilesStoreAdd"
              :key="item"
              :value="item"
            >
              <vi-chip
                chip-large
                multiline
                @remove="gameFilesRemoveAdded(index)"
              >
                {{ item.name }} ({{ item.paths.length }} {{ item.paths.length > 1 ? 'Files' : 'File' }})
              </vi-chip>
            </div>
          </div>
        </div>
      </div>
    </div>
  </vi-dialog>
</template>

<script>
// Import Vue functions.
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
// Import functions from modules.
import { dialog } from '@electron/remote'
import * as path from 'path'

export default {
  name: 'FormGameFilesView',
  props: {
    gameType: { type: String }
  },
  setup(props) {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage local file operations.
    let files = ref({
      name: null,
      paths: []
    })
    let filesHover = ref(false)
    const filesAddClick = () => {
      // Open dialog to select files.
      dialog.showOpenDialog({
        properties: ['openFile', 'multiSelections'],
        filters: [{ extensions: ['*'] }]
      }).then((res) => {
        if (res.filePaths.length > 0) {
          // Add files to the temporary list.
          res.filePaths.forEach((file) => files.value.paths.push(file))
        }
      })
    }
    const filesAddDrop = (req) => {
      if (req.dataTransfer.files.length > 0) {
        for (let file of req.dataTransfer.files) {
          // Add files to the temporary list.
          files.value.paths.push(file.path)
        }
      }
    }
    const filesRemove = (file) => {
      // Remove file from the temporary list.
      files.value.paths.splice(files.value.paths.indexOf(file), 1)
    }

    // Manage store file operations.
    const gameFiles = computed(() => {
      return gameFilesStore.value.filter((res) => !gameFilesStoreRemove.value.includes(res.id))
    })
    const gameFilesStore = computed(() => {
      return store.state.gameForm['g' + props.gameType.slice(1)].files.files
    })
    const gameFilesStoreAdd = computed(() => {
      return store.state.gameForm['g' + props.gameType.slice(1)].files.add
    })
    const gameFilesStoreRemove = computed(() => {
      return store.state.gameForm['g' + props.gameType.slice(1)].files.remove
    })
    const gameFilesAdd = () => {
      // Validate required fields.
      if (!files.value.name || !(files.value.paths.length > 0)) {
        validationErrorShow(); return
      }
      // Avoid reactivity to alter the original reference values.
      let filesStore = {
        name: files.value.name,
        paths: files.value.paths
      }
      // Save added files into the store.
      store.commit('set' + props.gameType + 'FilesAdd', filesStore)
      // Clear temporary files list.
      files.value.name = null
      files.value.paths = []
    }
    const gameFilesRemoveAdded = (index) => {
      // Remove an added file from the store.
      store.commit('set' + props.gameType + 'FilesRemoveAdded', index)
    }
    const gameFilesRemoveExist = (id) => {
      // Remove a existing file from the store.
      store.commit('set' + props.gameType + 'FilesRemove', id)
    }

    // Manage file operations.
    const getFileName = (file) => {
      // Strip full path and return filename.
      return path.basename(file)
    }
    let validationErrorDialog = ref(false)
    const validationErrorShow = () => {
      // Toggle validation error dialog.
      validationErrorDialog.value = !validationErrorDialog.value
    }

    return {
      files,
      filesAddClick,
      filesAddDrop,
      filesHover,
      filesRemove,
      gameFiles,
      gameFilesStoreAdd,
      gameFilesAdd,
      gameFilesRemoveAdded,
      gameFilesRemoveExist,
      getFileName,
      validationErrorDialog,
      validationErrorShow
    }
  }
}
</script>

<style scoped>
/* Calculations. */
.h-content {
  height: calc(100% - 9.5rem);
}
.max-h-content {
  max-height: calc(100% / 3);
}
</style>