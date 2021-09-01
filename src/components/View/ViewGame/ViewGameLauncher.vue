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
      :gameCommand="gameCommand"
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
        @click="runGame()"
        class="ml-auto"
      >
        <span class="el-icon-caret-right" /> Launch
      </hip-button>
    </div>
    <div class="flex space-x-4">
      <hip-select v-model="selectedVersion">
        <hip-option
          v-for="item in gameInfo.gameRegions[regionIndex].gameVersions"
          :key="item._id"
          :label="gameInfo.gameRegions[regionIndex].title + (item.currentVersion ? ' (' + item.currentVersion + ')' : '')"
          :value="item._id"
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
      dialog: {
        launcherError: false,
        settingsGame: false
      }
    }
  },
  props: [
    'gameInfo',
    'regionIndex',
    'selectedVersion'
  ],
  methods: {
    // Launch game.
    runGame() {
      // Define execution options.
      let gameOptions = {
        cwd: this.$store.state.settingsPlatform.executablePath
      }
      // Execute command.
      exec(this.gameCommand, gameOptions, (error, stdout, stderr) => {
        if (error) { console.log(error); this.launcherError() }
      })
    },
    // Show errors.
    launcherError() {
      // Open game launch error dialog.
      this.dialog.launcherError = !this.dialog.launcherError
    },
    // Settings operations.
    settingsGameOpen() {
      // Load stored data.
      this.$store.commit('resetGameStore')
      // Open settings dialog.
      this.dialog.settingsGame = !this.dialog.settingsGame
    },
    settingsGameClose() {
      // Close settings dialog.
      this.dialog.settingsGame = !this.dialog.settingsGame
    }
  },
  computed: {
    gameCommand() {
      // Return command to execute.
      return this.$store.state.settingsPlatform.executablePath + '/' + this.$store.state.settingsPlatform.executableCommand + ' "' + this.$store.state.settingsGame.gamePath + '"'
    }
  }
}
</script>

<style>
</style>