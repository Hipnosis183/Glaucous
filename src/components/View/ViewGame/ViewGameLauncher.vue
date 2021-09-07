<template>
  <!-- Game settings dialog. -->
  <hip-dialog
    v-show="dialog.settingsGame"
    @close="settingsGameClose()"
    width="w-2/3"
    class="pos-initial z-10"
  >
    <view-game-settings
      v-if="$store.state.gameSelected.gameVersion"
      :key="$store.state.gameSelected.gameVersion"
      :fullCommand="fullCommand"
      @close="settingsGameClose()"
    />
  </hip-dialog>
  <!-- Launcher error dialog. -->
  <hip-dialog
    v-show="dialog.launcherError"
    @close="launcherError()"
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
      <hip-button
        :icon="true"
        @click="launcherError()"
        class="el-icon-circle-check text-2xl"
      ></hip-button>
    </div>
  </hip-dialog>
  <div class="pt-4 space-y-4">
    <div class="flex items-center">
      <h1 class="font-bold ml-2 text-xl">Start Game</h1>
      <!-- Open game settings dialog. -->
      <hip-button
        @click="launchGame()"
        class="ml-auto"
      >
        <span class="el-icon-caret-right" /> Launch
      </hip-button>
    </div>
    <div class="flex space-x-4">
      <hip-select v-model="$store.state.gameSelected.gameVersion">
        <hip-option
          v-for="(item, index) in gameInfo.gameRegions[regionIndex].gameVersions"
          :key="item._id"
          :label="gameInfo.gameRegions[regionIndex].title + (item.name ? ' (' + item.name + ')' : item.number ? ' (' + item.number + ')' : '')"
          :value="item._id"
          @click="changeVersion(index)"
        >
        </hip-option>
      </hip-select>
      <hip-button
        v-show="$store.getters.getSettingsGeneralEditMode"
        :icon="true"
        @click="settingsGameOpen()"
        class="el-icon-s-tools text-xl"
      ></hip-button>
    </div>
  </div>
</template>

<script>
// Import functions from modules.
import { app } from '@electron/remote'
import { exec } from 'child_process'
import {
  existsSync,
  readJSONSync
} from 'fs-extra'
// Import form components.
import ViewGameSettings from './ViewGameSettings.vue'
// Import UI components.
import {
  HipButton,
  HipDialog,
  HipOption,
  HipSelect
} from '../../Component'

export default {
  name: 'ViewGameLauncher',
  components: {
    // Form components.
    ViewGameSettings,
    // UI components.
    HipButton,
    HipDialog,
    HipOption,
    HipSelect
  },
  data() {
    return {
      changedVersion: false,
      emulatorGame: null,
      emulatorPlatform: null,
      emulatorPath: null,
      emulatorFile: app.getAppPath() + '/data/emulators.json',
      gamePath: null,
      dialog: {
        launcherError: false,
        settingsGame: false
      }
    }
  },
  props: [
    'gameInfo',
    'regionIndex'
  ],
  emits: [
    'updated'
  ],
  methods: {
    // Launch game.
    launchGame() {
      // Define execution options.
      let gameOptions = {
        cwd: this.emulatorPath ? this.emulatorPath.length > 0 ? this.emulatorPath : this.gamePath : this.gamePath
      }
      // Execute command.
      exec(this.fullCommand, gameOptions, (error, stdout, stderr) => {
        if (error) { console.log(error); this.launcherError() }
      })
    },
    loadEmulator() {
      // Reset emulators.
      this.emulatorPlatform = null
      this.emulatorGame = null
      // Read emulator file.
      if (existsSync(this.emulatorFile)) {
        readJSONSync(this.emulatorFile).forEach(res => {
          if (res.id == this.$store.state.settingsPlatform.emulator) {
            // Load emulator configuration for the selected platform.
            this.emulatorPlatform = res
          }
          if (res.id == this.$store.state.settingsGame.emulator) {
            // Load emulator configuration for the selected game.
            this.emulatorGame = res
          }
        })
      }
    },
    changeVersion(index) {
      this.changedVersion = true
      // Send selected game version index to parent component.
      this.$emit('updated', index)
    },
    // Settings operations.
    settingsGameOpen() {
      if (this.changedVersion) {
        // Update the store with the new game version selected.
        this.$store.commit('setGameStore')
        this.changedVersion = false
      } else {
        // Load stored data.
        this.$store.commit('resetGameStore')
      }
      // Open settings dialog.
      this.dialog.settingsGame = !this.dialog.settingsGame
    },
    settingsGameClose() {
      // Close settings dialog.
      this.dialog.settingsGame = !this.dialog.settingsGame
    },
    // Show errors.
    launcherError() {
      // Open game launch error dialog.
      this.dialog.launcherError = !this.dialog.launcherError
    }
  },
  created() {
    // Load emulator.
    this.loadEmulator()
  },
  computed: {
    emulator() {
      return this.$store.state.settingsGame.emulator
    },
    fullCommand() {
      // Return command to execute.
      return this.fullEmulatorPath + this.fullGamePath
    },
    fullEmulatorPath() {
      let emulator = this.emulatorGame ? this.emulatorGame : this.emulatorPlatform
      if (emulator != null) {
        let emulatorPath = emulator.path + '/' + emulator.file
        // Set the platform executable path as the current working directory.
        this.emulatorPath = emulator.path
        // Return full platform command.
        return '"' + emulatorPath + '" ' + (emulator.params ? emulator.params + ' ' : '')
      } else {
        return ''
      }
    },
    fullGamePath() {
      // Wait for the settings to be loaded.
      if (this.$store.state.settingsGame.gamePath != null) {
        let gamePath = (this.$store.state.settingsGame.relativePath ? this.$store.state.settingsPlatform.relativePath + '/' : '') + this.$store.state.settingsGame.gamePath
        // Set the game path as the current working directory.
        this.gamePath = gamePath
        // Check and replace the '{relative}' and '{game}' variables.
        let gameParams = this.$store.state.settingsGame.gameParams.replaceAll('{relative}', this.$store.state.settingsPlatform.relativePath)
        gameParams = gameParams.replaceAll('{game}', gamePath)
        // Return full game command.
        return (this.$store.state.settingsGame.gameFile ? '"' + gamePath + (this.$store.state.settingsGame.gamePath ? '/' : '') + this.$store.state.settingsGame.gameFile + '" ' : '') + gameParams
      }
    }
  },
  watch: {
    // Watch for changes on the selected emulator.
    emulator() {
      // Reload emulator.
      this.loadEmulator()
    }
  }
}
</script>

<style>
</style>