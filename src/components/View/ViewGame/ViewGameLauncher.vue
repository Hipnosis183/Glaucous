<template>
  <!-- Game settings dialog. -->
  <view-game-settings
    v-show="settingsGameDialog"
    :fullCommand="fullCommand"
    @close="settingsGameClose()"
  />
  <!-- Launcher error dialog. -->
  <vi-dialog
    v-show="launchErrorDialog"
    @close="launchErrorShow()"
    class="pos-initial z-10"
  >
    <!-- Dialog message. -->
    <p class="text-center text-lg">
      An error has ocurred when launching the game.
      <br />
      Check if your configuration is correct and try again.
    </p>
    <div class="flex justify-center mt-6 space-x-4">
      <!-- Close message. -->
      <vi-button-icon @click="launchErrorShow()">
        <vi-icon class="w-6">
          <icon-check />
        </vi-icon>
      </vi-button-icon>
    </div>
  </vi-dialog>
  <div class="pt-4 space-y-4">
    <div class="flex items-center">
      <h1 class="font-bold ml-2 text-xl">Start Game</h1>
      <!-- Open game settings dialog. -->
      <vi-button-icon
        @click="launchGame()"
        class="ml-auto"
      >
        <vi-icon class="w-6">
          <icon-play />
        </vi-icon>
      </vi-button-icon>
    </div>
    <div class="flex space-x-4">
      <vi-select v-model="$store.state.gameSelected.gameVersion">
        <vi-option
          v-for="(item, index) in gameInfo.gameRegions[regionIndex].gameVersions"
          :key="item._id"
          :label="gameInfo.gameRegions[regionIndex].title + (item.name ? ' (' + item.name + ')' : item.number ? ' (' + item.number + ')' : '')"
          :value="item._id"
          @click="changeVersion(index)"
        >
        </vi-option>
      </vi-select>
      <vi-button-icon
        v-show="$store.getters.getSettingsGeneralEditMode"
        @click="settingsGameOpen()"
      >
        <vi-icon class="w-6">
          <icon-setting />
        </vi-icon>
      </vi-button-icon>
    </div>
  </div>
</template>

<script>
// Import Vue functions.
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
// Import functions from modules.
import { app } from '@electron/remote'
import { exec } from 'child_process'
import { existsSync, readJSONSync } from 'fs-extra'
// Import database controllers functions.
import { addRecent } from '@/database/controllers/User'
// Import form components.
import ViewGameSettings from './ViewGameSettings.vue'

export default {
  name: 'ViewGameLauncher',
  components: {
    ViewGameSettings
  },
  emits: [
    'updated'
  ],
  props: {
    gameInfo: { type: Object },
    regionIndex: { type: Number }
  },
  setup(props, { emit }) {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage game launching.
    let gamePath = ref(null)
    let emulatorPath = ref(null)
    const launchGame = () => {
      // Define execution options.
      let gameOptions = {
        cwd: emulatorPath.value ? emulatorPath.value.length > 0 ? emulatorPath.value : gamePath.value : gamePath.value
      }
      // Execute command.
      exec(fullCommand.value, gameOptions, (error) => {
        if (error) {
          // Log error and display message.
          console.log(error)
          launchErrorShow()
        } else {
          // Add launched game to the recently played list.
          addRecent(props.gameInfo._id)
        }
      })
    }
    let launchErrorDialog = ref(false)
    const launchErrorShow = () => {
      // Toggle game launch error dialog.
      launchErrorDialog.value = !launchErrorDialog.value
    }

    // Manage emulators.
    let emulatorGame = ref(null)
    let emulatorPlatform = ref(null)
    const emulatorFile = app.getAppPath() + '/data/emulators.json'
    const loadEmulator = () => {
      // Reset emulators.
      emulatorPlatform.value = null
      emulatorGame.value = null
      // Read emulator file.
      if (existsSync(emulatorFile)) {
        readJSONSync(emulatorFile).forEach((res) => {
          if (res.id == store.state.settingsPlatform.emulator) {
            // Load emulator configuration for the selected platform.
            emulatorPlatform.value = res
          }
          if (res.id == store.state.settingsGame.emulator) {
            // Load emulator configuration for the selected game.
            emulatorGame.value = res
          }
        })
      }
    }

    // Load emulator on component creation.
    loadEmulator()

    // Watch for changes on the selected emulator.
    const emulatorStore = computed(() => {
      return store.state.settingsGame.emulator
    })
    watch(() => emulatorStore.value, () => { loadEmulator() })

    // Define emulator and game paths.
    const fullCommand = computed(() => {
      // Return command to execute.
      return fullEmulatorPath.value + fullGamePath.value
    })
    const fullEmulatorPath = computed(() => {
      let emulator = emulatorGame.value ? emulatorGame.value : emulatorPlatform.value
      if (emulator != null) {
        let _emulatorPath = emulator.path + '/' + emulator.file
        // Set the platform executable path as the current working directory.
        emulatorPath.value = emulator.path
        // Return full platform command.
        return '"' + _emulatorPath + '" ' + (emulator.params ? emulator.params + ' ' : '')
      } else {
        return ''
      }
    })
    const fullGamePath = computed(() => {
      // Wait for the settings to be loaded.
      if (store.state.settingsGame.gamePath != null) {
        let _gamePath = (store.state.settingsGame.relativePath ? store.state.settingsPlatform.relativePath + '/' : '') + store.state.settingsGame.gamePath
        // Set the game path as the current working directory.
        gamePath.value = _gamePath
        // Check and replace the '{relative}' and '{game}' variables.
        let gameParams = store.state.settingsGame.gameParams.replaceAll('{relative}', store.state.settingsPlatform.relativePath)
        gameParams = gameParams.replaceAll('{game}', _gamePath)
        // Return full game command.
        return (store.state.settingsGame.gameFile ? '"' + _gamePath + (store.state.settingsGame.gamePath ? '/' : '') + store.state.settingsGame.gameFile + '" ' : '') + gameParams
      }
    })

    // Manage game settings.
    let changedVersion = ref(false)
    const changeVersion = (index) => {
      changedVersion.value = true
      // Send selected game version index to parent component.
      emit('updated', index)
    }
    let settingsGameDialog = ref(false)
    const settingsGameOpen = () => {
      if (changedVersion.value) {
        // Update the store with the new game version selected.
        store.commit('setGameStore')
        changedVersion.value = false
      } else {
        // Load stored data.
        store.commit('resetGameStore')
      }
      // Open settings dialog.
      settingsGameDialog.value = !settingsGameDialog.value
    }
    const settingsGameClose = () => {
      // Close settings dialog.
      settingsGameDialog.value = !settingsGameDialog.value
    }

    return {
      changeVersion,
      fullCommand,
      gamePath,
      launchErrorShow,
      launchErrorDialog,
      launchGame,
      settingsGameClose,
      settingsGameDialog,
      settingsGameOpen
    }
  }
}
</script>

<style>
</style>