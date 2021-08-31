<template>
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
    <h1 class="font-bold ml-2 text-xl">Launch Game</h1>
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
        :icon="true"
        @click="runGame()"
        class="el-icon-video-play text-2xl"
      ></hip-button>
    </div>
  </div>
</template>

<script>
// Import functions from modules.
import { exec } from 'child_process'
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
    // UI components.
    HipButton,
    HipDialog,
    HipOption,
    HipSelect
  },
  data() {
    return {
      dialog: {
        launcherError: false
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
      // Define command to execute.
      let gameCommand = this.$store.state.settingsPlatform.executablePath + '/' + this.$store.state.settingsPlatform.executableCommand + ' "' + this.$store.state.settingsGame.gamePath + '"'
      // Define execution options.
      let gameOptions = {
        cwd: this.$store.state.settingsPlatform.executablePath
      }
      // Execute command.
      exec(gameCommand, gameOptions, (error, stdout, stderr) => {
        if (error) { console.log(error); this.launcherError() }
      })
    },
    // Show errors.
    launcherError() {
      // Open game launch error dialog.
      this.dialog.launcherError = !this.dialog.launcherError
    }
  }
}
</script>

<style>
</style>