<template>
  <div>
    <!-- Create game platform dialog. -->
    <hip-dialog
      v-show="dialog.createGamePlatform"
      @close="createGamePlatformClose()"
      class="z-10"
    >
      <!-- Insert create game platform form component. -->
      <create-game-platform @close="createGamePlatformClose()" />
    </hip-dialog>
    <!-- Create game region dialog. -->
    <hip-dialog
      v-show="dialog.createGameRegion"
      @close="createGameRegionClose()"
      class="z-10"
    >
      <!-- Insert create game region form component. -->
      <create-game-region @close="createGameRegionClose()" />
    </hip-dialog>
    <!-- Create game version dialog. -->
    <hip-dialog
      v-show="dialog.createGameVersion"
      @close="createGameVersionClose()"
      class="z-10"
    >
      <!-- Insert create game version form component. -->
      <create-game-version @close="createGameVersionClose()" />
    </hip-dialog>
    <!-- Edit game dialog. -->
    <hip-dialog
      v-show="dialog.editGame"
      @close="editGameClose()"
      class="z-10"
    >
      <!-- Insert edit game form component. -->
      <edit-game
        :gameDeveloper="gameInfo.developer._id"
        :gamePlatform="gameInfo.platform._id"
        @close="editGameClose()"
      />
    </hip-dialog>
    <!-- Delete game region dialog. -->
    <hip-dialog
      v-show="dialog.deleteGameRegion"
      @close="deleteGameRegionOpen()"
      class="z-10"
    >
      <!-- Dialog message. -->
      <p class="text-center text-lg">
        Delete region <b>'{{ gameInfo.gameRegions[regionIndex].regionName }}'</b>
        from game <b>'{{ fullTitle }}'</b> ?
        <br />
        It will also delete all its versions.
      </p>
      <!-- Dialog buttons. -->
      <div class="flex justify-center mt-6 space-x-4">
        <!-- Confirm game deletion. -->
        <hip-button
          :icon="true"
          @click="deleteGameRegionClose()"
          class="el-icon-circle-check text-2xl"
        ></hip-button>
        <!-- Cancel game deletion. -->
        <hip-button
          :icon="true"
          @click="deleteGameRegionOpen()"
          class="el-icon-circle-close text-2xl"
        ></hip-button>
      </div>
    </hip-dialog>
    <!-- Delete game version dialog. -->
    <hip-dialog
      v-show="dialog.deleteGameVersion"
      @close="deleteGameVersionOpen()"
      class="z-10"
    >
      <!-- Dialog message. -->
      <p class="text-center text-lg">
        Delete the selected version from game <b>'{{ fullTitle }}'</b> ?
        <br />
        If it's the only version, it will also delete the region.
      </p>
      <!-- Dialog buttons. -->
      <div class="flex justify-center mt-6 space-x-4">
        <!-- Confirm game deletion. -->
        <hip-button
          :icon="true"
          @click="deleteGameVersionClose()"
          class="el-icon-circle-check text-2xl"
        ></hip-button>
        <!-- Cancel game deletion. -->
        <hip-button
          :icon="true"
          @click="deleteGameVersionOpen()"
          class="el-icon-circle-close text-2xl"
        ></hip-button>
      </div>
    </hip-dialog>
    <!-- Delete game platform dialog. -->
    <hip-dialog
      v-show="dialog.deleteGamePlatform"
      @close="deleteGamePlatformOpen()"
      class="z-10"
    >
      <!-- Dialog message. -->
      <p class="text-center text-lg">
        Delete game <b>'{{ fullTitle }}'</b> ?
        <br />
        It will also delete all its regions and versions.
      </p>
      <!-- Dialog buttons. -->
      <div class="flex justify-center mt-6 space-x-4">
        <!-- Confirm game deletion. -->
        <hip-button
          :icon="true"
          @click="deleteGamePlatformClose()"
          class="el-icon-circle-check text-2xl"
        ></hip-button>
        <!-- Cancel game deletion. -->
        <hip-button
          :icon="true"
          @click="deleteGamePlatformOpen()"
          class="el-icon-circle-close text-2xl"
        ></hip-button>
      </div>
    </hip-dialog>
    <!-- Navigation bar. -->
    <hip-nav-bar>
      <!-- Create games menu dialog. -->
      <hip-menu-button
        v-show="$store.getters.getSettingsGeneralEditMode"
        icon="el-icon-circle-plus-outline text-2xl"
      >
        <!-- Open create game platform dialog. -->
        <hip-menu-option
          label="Create Game Platform"
          :method="createGamePlatformOpen"
        />
        <!-- Open create game region dialog. -->
        <hip-menu-option
          label="Create Game Region"
          :method="createGameRegionOpen"
        />
        <!-- Open create game version dialog. -->
        <hip-menu-option
          label="Create Game Version"
          :method="createGameVersionOpen"
        />
      </hip-menu-button>
      <!-- Open edit game dialog. -->
      <hip-button-nb
        v-show="$store.getters.getSettingsGeneralEditMode"
        @click="editGameOpen()"
        class="el-icon-edit-outline text-2xl"
      ></hip-button-nb>
      <!-- Delete games menu dialog. -->
      <hip-menu-button
        v-show="$store.getters.getSettingsGeneralEditMode"
        icon="el-icon-remove-outline text-2xl"
      >
        <!-- Open create game platform dialog. -->
        <hip-menu-option
          label="Delete Game Platform"
          :method="deleteGamePlatformOpen"
        />
        <!-- Open create game region dialog. -->
        <hip-menu-option
          label="Delete Game Region"
          :method="deleteGameRegionOpen"
        />
        <!-- Open create game version dialog. -->
        <hip-menu-option
          label="Delete Game Version"
          :method="deleteGameVersionOpen"
        />
      </hip-menu-button>
      <!-- Set selected game region as the main region. -->
      <hip-button-nb
        v-show="$store.getters.getSettingsGeneralEditMode"
        @click="selectGameRegion()"
        class="el-icon-place text-2xl"
      ></hip-button-nb>
      <!-- Create games menu dialog. -->
      <hip-menu-button
        v-show="$store.getters.getSettingsGeneralEditMode"
        icon="el-icon-folder-opened text-2xl"
      >
        <!-- Open create game region dialog. -->
        <hip-menu-option
          label="Open Game Directory"
          :method="openGamePath"
        />
        <!-- Open create game platform dialog. -->
        <hip-menu-option
          label="Open Store Directory"
          :method="openStorePath"
        />
        <!-- Open create game version dialog. -->
        <hip-menu-option
          label="Open Images Directory"
          :method="openImagesPath"
        />
      </hip-menu-button>
      <!-- Game region tabs. -->
      <ul class="flex w-full">
        <li
          v-for="(region, index) in gameInfo.gameRegions"
          :key="region._id"
          :value="region._id"
          class="relative w-full"
        >
          <!-- Region tab button. -->
          <button
            class="py-3 relative w-full"
            :class="index == regionIndex ? 'border-b-4 border-color-400' : ''"
          >
            <div
              class="absolute h-full top-0 w-full"
              :class="index == regionIndex ? 'bg-color-500 opacity-50' : ''"
            />
            <div class="h-full relative">
              <p>{{ gameInfo.gameRegions[index].regionName }}</p>
            </div>
          </button>
          <div
            @click="changeRegion(index)"
            class="absolute cursor-pointer h-full top-0 w-full"
          />
        </li>
      </ul>
    </hip-nav-bar>
    <!-- Game information. -->
    <div class="relative">
      <transition
        :name="slideBack ? 'slide-b' : 'slide-f'"
        class="absolute bottom-0 left-0 right-0 top-0"
      >
        <div
          :key="regionIndex"
          class="flex m-6 space-x-6"
        >
          <!-- Left card. -->
          <hip-modal class="h-content w-3/5">
            <div class="flex flex-col max-h-content min-h-content overflow-hidden">
              <div class="flex-1 no-scrollbar overflow-y-scroll">
                <!-- Insert game info component. -->
                <view-game-info
                  :key="gameInfo"
                  :fullTitle="fullTitle"
                  :gameInfo="gameInfo"
                  :regionIndex="regionIndex"
                  :versionIndex="versionIndex"
                />
              </div>
              <!-- Insert game links component. -->
              <view-game-links
                :key="gameInfo"
                :fullTitle="fullTitle"
                :gameInfo="gameInfo"
                :gameRegion="gameInfo.gameRegions[regionIndex]"
                @loaded="loadLinks($event)"
              />
            </div>
          </hip-modal>
          <!-- Right card. -->
          <hip-modal class="h-content w-2/5">
            <div class="flex flex-col max-h-content min-h-content overflow-hidden">
              <div class="flex-1 no-scrollbar overflow-y-scroll p-0.5">
                <!-- Insert game images component. -->
                <view-game-images
                  :key="gameInfo"
                  :gameInfo="gameInfo"
                  :regionIndex="regionIndex"
                  :versionIndex="versionIndex"
                />
              </div>
              <!-- Insert game launcher component. -->
              <view-game-launcher
                :key="gameInfo"
                :gameInfo="gameInfo"
                :regionIndex="regionIndex"
                @updated="versionIndex = $event"
              />
            </div>
          </hip-modal>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
// Import functions from modules.
import {
  app,
  shell
} from '@electron/remote'
// Import form components.
import CreateGamePlatform from '../Create/CreateGamePlatform.vue'
import CreateGameRegion from '../Create/CreateGameRegion.vue'
import CreateGameVersion from '../Create/CreateGameVersion.vue'
import EditGame from '../Edit/EditGame.vue'
import ViewGameImages from './ViewGame/ViewGameImages.vue'
import ViewGameInfo from './ViewGame/ViewGameInfo.vue'
import ViewGameLauncher from './ViewGame/ViewGameLauncher.vue'
import ViewGameLinks from './ViewGame/ViewGameLinks.vue'
// Import UI components.
import {
  HipButton,
  HipButtonNb,
  HipDialog,
  HipMenuButton,
  HipMenuOption,
  HipModal,
  HipNavBar
} from '../Component'
// Import database controllers functions.
import {
  getGame,
  deleteGamePlatform,
  deleteGameRegion,
  deleteGameVersion,
  selectGameRegion
} from '../../database/controllers/Game'

export default {
  name: 'ViewGame',
  components: {
    // Form components.
    CreateGamePlatform,
    CreateGameRegion,
    CreateGameVersion,
    EditGame,
    ViewGameImages,
    ViewGameInfo,
    ViewGameLauncher,
    ViewGameLinks,
    // UI components.
    HipButton,
    HipButtonNb,
    HipDialog,
    HipMenuButton,
    HipMenuOption,
    HipModal,
    HipNavBar
  },
  data() {
    return {
      gameInfo: {
        developer: { name: null },
        platform: { name: null },
        releaseYear: null,
        numberPlayers: null,
        links: [],
        gamePlatforms: [],
        gameRegions: [{
          title: null,
          subTitle: null,
          originalTitle: null,
          romanizedTitle: null,
          translatedTitle: null,
          region: null,
          serial: null,
          gameVersions: [{
            name: null,
            number: null,
            latest: null,
            comments: []
          }]
        }]
      },
      gamePath: null,
      regionIndex: 0,
      versionIndex: 0,
      slideBack: false,
      dialog: {
        createGamePlatform: false,
        createGameRegion: false,
        createGameVersion: false,
        editGame: false,
        deleteGameRegion: false,
        deleteGameVersion: false,
        deleteGamePlatform: false
      }
    }
  },
  methods: {
    loadGame() {
      // Get game.
      getGame(this.$route.params.id)
        .then(res => {
          this.gameInfo = res
          // Save current platform ID into the store.
          this.$store.state.selectedPlatform = res.platform._id
          this.$store.commit('setPlatformStore')
          // Save current game IDs into the store.
          this.$store.state.gameSelected.gamePlatform = res._id
          this.$store.state.gameSelected.gameRegion = res.gameRegions[this.regionIndex]._id
          this.$store.state.gameSelected.gameVersion = res.gameRegions[this.regionIndex].gameVersions[this.versionIndex]._id
          // Set game store path.
          this.gamePath = app.getAppPath() + '/data/' + res.platform._id + '/' + res._id + '/games/' + res.gameRegions[this.regionIndex]._id
        })
    },
    loadLinks(res) {
      // Get links.
      this.gameInfo.links = res
    },
    // Create operations.
    createGamePlatformOpen() {
      // Restore the data on the store.
      this.$store.commit('resetGameForm')
      // Open create dialog.
      this.dialog.createGamePlatform = !this.dialog.createGamePlatform
    },
    createGamePlatformClose() {
      // Reload game.
      this.loadGame()
      // Close create dialog.
      this.dialog.createGamePlatform = !this.dialog.createGamePlatform
    },
    createGameRegionOpen() {
      // Restore the data on the store.
      this.$store.commit('resetGameForm')
      // Save data of the current game region into the store.
      this.$store.commit('setGameRegionTitle', this.gameInfo.gameRegions[this.regionIndex].title)
      this.$store.commit('setGameRegionSubTitle', this.gameInfo.gameRegions[this.regionIndex].subTitle)
      // Open create dialog.
      this.dialog.createGameRegion = !this.dialog.createGameRegion
    },
    createGameRegionClose() {
      // Reload game.
      this.loadGame()
      // Close create dialog.
      this.dialog.createGameRegion = !this.dialog.createGameRegion
    },
    createGameVersionOpen() {
      // Restore the data on the store.
      this.$store.commit('resetGameForm')
      // Open create dialog.
      this.dialog.createGameVersion = !this.dialog.createGameVersion
    },
    createGameVersionClose() {
      // Reload game.
      this.loadGame()
      // Close create dialog.
      this.dialog.createGameVersion = !this.dialog.createGameVersion
    },
    // Edit operations.
    editGameOpen() {
      // Restore the data on the store.
      this.$store.commit('resetGameForm')
      // Save data of the current game into the store.
      this.$store.commit('setGamePlatformDeveloper', this.gameInfo.developer._id)
      this.$store.commit('setGamePlatformPlatform', this.gameInfo.platform._id)
      this.$store.commit('setGamePlatformReleaseYear', this.gameInfo.releaseYear)
      this.$store.commit('setGamePlatformNumberPlayers', this.gameInfo.numberPlayers)
      this.$store.commit('setGamePlatformLinks', this.gameInfo.links)
      this.$store.commit('setGameRegionTitle', this.gameInfo.gameRegions[this.regionIndex].title)
      this.$store.commit('setGameRegionPreTitle', this.gameInfo.gameRegions[this.regionIndex].preTitle)
      this.$store.commit('setGameRegionSubTitle', this.gameInfo.gameRegions[this.regionIndex].subTitle)
      this.$store.commit('setGameRegionOriginalTitle', this.gameInfo.gameRegions[this.regionIndex].originalTitle)
      this.$store.commit('setGameRegionRomanizedTitle', this.gameInfo.gameRegions[this.regionIndex].romanizedTitle)
      this.$store.commit('setGameRegionTranslatedTitle', this.gameInfo.gameRegions[this.regionIndex].translatedTitle)
      this.$store.commit('setGameRegionRegion', this.gameInfo.gameRegions[this.regionIndex].region)
      this.$store.commit('setGameRegionSerial', this.gameInfo.gameRegions[this.regionIndex].serial)
      this.$store.commit('setGameVersionName', this.gameInfo.gameRegions[this.regionIndex].gameVersions[this.versionIndex].name)
      this.$store.commit('setGameVersionNumber', this.gameInfo.gameRegions[this.regionIndex].gameVersions[this.versionIndex].number)
      this.$store.commit('setGameVersionLatest', this.gameInfo.gameRegions[this.regionIndex].gameVersions[this.versionIndex].latest)
      this.$store.commit('setGameVersionComments', this.gameInfo.gameRegions[this.regionIndex].gameVersions[this.versionIndex].comments)
      // Open edit dialog.
      this.dialog.editGame = !this.dialog.editGame
    },
    editGameClose() {
      // Reload game.
      this.loadGame()
      // Close edit dialog.
      this.dialog.editGame = !this.dialog.editGame
    },
    // Delete operations.
    deleteGameRegionOpen() {
      // Open delete dialog.
      this.dialog.deleteGameRegion = !this.dialog.deleteGameRegion
    },
    deleteGameRegionClose() {
      // Delete game region.
      deleteGameRegion(this.gameInfo, this.regionIndex)
        .then(res => {
          // If the game had multiple regions.
          if (res) {
            // Reload updated game entry.
            this.loadGame()
            // Reset selected region.
            this.regionIndex = 0
            // Reset selected version.
            this.versionIndex = 0
            // Close delete dialog.
            this.dialog.deleteGameRegion = !this.dialog.deleteGameRegion
          } else {
            // If the game only had one region.
            this.$router.back()
          }
        })
    },
    deleteGameVersionOpen() {
      // Open delete dialog.
      this.dialog.deleteGameVersion = !this.dialog.deleteGameVersion
    },
    deleteGameVersionClose() {
      // Delete game region.
      deleteGameVersion(this.gameInfo, this.regionIndex, this.versionIndex)
        .then(res => {
          // If the game had multiple regions.
          if (res) {
            // Reload updated game entry.
            this.loadGame()
            // Reset selected version.
            this.versionIndex = 0
            // Close delete dialog.
            this.dialog.deleteGameVersion = !this.dialog.deleteGameVersion
          } else {
            // If the game only had one region.
            this.$router.back()
          }
        })
    },
    deleteGamePlatformOpen() {
      // Open delete dialog.
      this.dialog.deleteGamePlatform = !this.dialog.deleteGamePlatform
    },
    deleteGamePlatformClose() {
      // Delete game platform.
      deleteGamePlatform(this.gameInfo)
        .then(() => this.$router.back())
    },
    // Region selection operations.
    changeRegion(sel) {
      // Set sliding transition orientation.
      this.slideBack = sel < this.regionIndex ? true : false
      // Reset version index.
      this.versionIndex = 0
      // Set region index.
      this.regionIndex = sel
      // Save current game IDs into the store.
      this.$store.state.gameSelected.gameRegion = this.gameInfo.gameRegions[sel]._id
      this.$store.state.gameSelected.gameVersion = this.gameInfo.gameRegions[sel].gameVersions[this.versionIndex]._id
      // Update game store path.
      this.gamePath = app.getAppPath() + '/data/' + this.gameInfo.platform._id + '/' + this.gameInfo._id + '/games/' + this.gameInfo.gameRegions[sel]._id
    },
    nextRegion() {
      if (this.regionIndex < this.gameInfo.gameRegions.length - 1) {
        // Set sliding transition orientation.
        this.slideBack = false
        // Increase region index.
        this.regionIndex++
      }
    },
    prevRegion() {
      if (this.regionIndex > 0) {
        // Set sliding transition orientation.
        this.slideBack = true
        // Decrease region index.
        this.regionIndex--
      }
    },
    selectGameRegion() {
      // Set the currently selected region as the default.
      selectGameRegion(this.gameInfo, this.regionIndex)
        .then(() => {
          // Reload game.
          this.loadGame()
          // Reset region index.
          this.regionIndex = 0
          // Reset version index.
          this.versionIndex = 0
        })
    },
    // Open external directories.
    openGamePath() {
      // Open game file location path in the file manager.
      shell.openPath((this.$store.state.settingsGame.relativePath ? this.$store.state.settingsPlatform.relativePath + '/' : '') + this.$store.state.settingsGame.gamePath)
    },
    openStorePath() {
      // Open game store location path in the file manager.
      shell.openPath(this.gamePath)
    },
    openImagesPath() {
      // Open images location path in the file manager.
      shell.openPath(this.gamePath + '/images')
    }
  },
  mounted() {
    // Load game entry.
    this.loadGame()
  },
  computed: {
    fullTitle() {
      let fullTitle = this.gameInfo.gameRegions[this.regionIndex].title
      if (this.gameInfo.gameRegions[this.regionIndex].subTitle) {
        fullTitle = fullTitle + ' ' + this.gameInfo.gameRegions[this.regionIndex].subTitle
      }
      if (this.gameInfo.gameRegions[this.regionIndex].preTitle) {
        fullTitle = this.gameInfo.gameRegions[this.regionIndex].preTitle + ' ' + fullTitle
      }
      return fullTitle
    }
  }
}
</script>

<style scoped>
/* Calculations. */
.h-content {
  height: calc(100vh - 6.25rem);
}
.min-h-content {
  min-height: calc(100vh - 9.25rem);
}
.max-h-content {
  max-height: calc(100vh - 9.25rem);
}
</style>