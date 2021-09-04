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
import { exec } from 'child_process'
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
      gamePath: null,
      platformPath: null,
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
        cwd: this.platformPath.length > 0 ? this.platformPath : this.gamePath
      }
      // Execute command.
      exec(this.fullCommand, gameOptions, (error, stdout, stderr) => {
        if (error) { console.log(error); this.launcherError() }
      })
    },
    // Show errors.
    launcherError() {
      // Open game launch error dialog.
      this.dialog.launcherError = !this.dialog.launcherError
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
    }
  },
  computed: {
    fullCommand() {
      // Return command to execute.
      return this.fullPlatformPath + this.fullGamePath
    },
    fullPlatformPath() {
      let platformPath = this.$store.state.settingsPlatform.executablePath + '/' + this.$store.state.settingsPlatform.executableCommand
      // Set the platform executable path as the current working directory.
      this.platformPath = this.$store.state.settingsPlatform.executablePath
      // Empty platform full path if the executable path is empty as well.
      return this.$store.state.settingsPlatform.executablePath ? platformPath + ' ' : ''
    },
    fullGamePath() {
      // Wait for the settings to be loaded.
      if (this.$store.state.settingsGame.gamePath != null) {
        let gamePath = (this.$store.state.settingsGame.relativePath ? this.$store.state.settingsPlatform.relativeGamesPath + '/' : '') + this.$store.state.settingsGame.gamePath
        // Set the game path as the current working directory.
        this.gamePath = gamePath
        // Check and replace the '{relative}' and '{game}' variables.
        let gameParams = this.$store.state.settingsGame.gameParams.replaceAll('{relative}', this.$store.state.settingsPlatform.relativeGamesPath)
        gameParams = gameParams.replaceAll('{game}', gamePath)
        // Return full game command.
        return (this.$store.state.settingsGame.gameFile ? '"' + gamePath + (this.$store.state.settingsGame.gamePath ? '/' : '') + this.$store.state.settingsGame.gameFile + '" ' : '') + gameParams
      }
    }
  }
}
</script>

<style>
</style>