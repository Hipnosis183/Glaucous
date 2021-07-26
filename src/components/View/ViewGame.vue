<template>
  <!-- Create game platform dialog. -->
  <hip-dialog
    v-show="dialog.createGamePlatform"
    @close="createGamePlatformClose()"
  >
    <!-- Insert create game platform form component. -->
    <create-game-platform @close="createGamePlatformClose()" />
  </hip-dialog>
  <!-- Create game region dialog. -->
  <hip-dialog
    v-show="dialog.createGameRegion"
    @close="createGameRegionClose()"
  >
    <!-- Insert create game region form component. -->
    <create-game-region @close="createGameRegionClose()" />
  </hip-dialog>
  <!-- Edit game dialog. -->
  <hip-dialog
    v-show="dialog.editGame"
    @close="editGameClose()"
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
  >
    <!-- Dialog message. -->
    <p class="text-center text-lg">
      Delete region <b>'{{ getRegion(regionIndex) }}'</b>
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
  <!-- Delete game platform dialog. -->
  <hip-dialog
    v-show="dialog.deleteGamePlatform"
    @close="deleteGamePlatformOpen()"
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
    <!-- Open create game platform dialog. -->
    <hip-button-nb
      v-show="$store.state.editMode"
      @click="createGamePlatformOpen()"
      class="el-icon-connection text-2xl"
    ></hip-button-nb>
    <!-- Open create game region dialog. -->
    <hip-button-nb
      v-show="$store.state.editMode"
      @click="createGameRegionOpen()"
      class="el-icon-circle-plus-outline text-2xl"
    ></hip-button-nb>
    <!-- Open edit game dialog. -->
    <hip-button-nb
      v-show="$store.state.editMode"
      @click="editGameOpen()"
      class="el-icon-edit-outline text-2xl"
    ></hip-button-nb>
    <!-- Open delete game region dialog. -->
    <hip-button-nb
      v-show="$store.state.editMode"
      @click="deleteGameRegionOpen()"
      class="el-icon-remove-outline text-2xl"
    ></hip-button-nb>
    <!-- Open delete game platform dialog. -->
    <hip-button-nb
      v-show="$store.state.editMode"
      @click="deleteGamePlatformOpen()"
      class="el-icon-delete text-2xl"
    ></hip-button-nb>
    <!-- Game region tabs. -->
    <ul class="flex w-full">
      <li
        v-for="(region, index) in gameInfo.gameRegions"
        :key="region._id"
        :value="region._id"
        class="w-full"
      >
        <!-- Region tab button. -->
        <button
          @click="changeRegion(index)"
          class="py-3 w-full"
          :class="index == regionIndex ? 'bg-gray-200 border-b-4 border-indigo-400' : ''"
        >{{ getRegion(index) }}</button>
      </li>
    </ul>
  </hip-nav-bar>
  <!-- Game information. -->
  <div class="flex m-6 space-x-6">
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
            :regionName="getRegion(regionIndex)"
            @reload="loadGame()"
          />
        </div>
        <!-- Insert game links component. -->
        <view-game-links
          :key="gameInfo"
          :gameInfo="gameInfo"
          @loaded="loadLinks($event)"
        />
      </div>
    </hip-modal>
    <!-- Right card. -->
    <hip-modal class="h-content w-2/5">
      <div class="flex max-h-content overflow-hidden">
        <div class="flex-1 no-scrollbar overflow-y-scroll">
          <!-- Insert game images component. -->
          <view-game-images
            :key="gameInfo"
            :gameInfo="gameInfo"
            :regionIndex="regionIndex"
          />
        </div>
      </div>
    </hip-modal>
  </div>
</template>

<script>
// Import form components.
import CreateGamePlatform from '../Create/CreateGamePlatform.vue'
import CreateGameRegion from '../Create/CreateGameRegion.vue'
import EditGame from '../Edit/EditGame.vue'
import ViewGameImages from './ViewGame/ViewGameImages.vue'
import ViewGameInfo from './ViewGame/ViewGameInfo.vue'
import ViewGameLinks from './ViewGame/ViewGameLinks.vue'
// Import UI components.
import {
  HipButton,
  HipButtonNb,
  HipDialog,
  HipModal,
  HipNavBar
} from '../Component'
// Import database controllers functions.
import {
  getGame,
  getRegion,
  deleteGamePlatform,
  deleteGameRegion
} from '../../database/controllers/Game'

export default {
  name: 'ViewGame',
  components: {
    // Form components.
    CreateGamePlatform,
    CreateGameRegion,
    EditGame,
    ViewGameImages,
    ViewGameInfo,
    ViewGameLinks,
    // UI components.
    HipButton,
    HipButtonNb,
    HipDialog,
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
        latestVersion: null,
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
            currentVersion: null,
            comments: []
          }]
        }]
      },
      regionIndex: 0,
      dialog: {
        createGamePlatform: false,
        createGameRegion: false,
        editGame: false,
        deleteGameRegion: false,
        deleteGamePlatform: false
      }
    }
  },
  methods: {
    loadGame() {
      // Get game.
      getGame(this.$route.params.id)
        .then(res => this.gameInfo = res)
    },
    loadLinks(res) {
      // Get links.
      this.gameInfo.links = res
    },
    // Create operations.
    createGamePlatformOpen() {
      // Restore the data on the store.
      this.$store.commit('resetGameSelected')
      this.$store.commit('resetGameForm')
      // Save current game IDs into the store.
      this.$store.state.gameSelected.gamePlatform = this.gameInfo._id
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
      this.$store.commit('resetGameSelected')
      this.$store.commit('resetGameForm')
      // Save current game IDs into the store.
      this.$store.state.gameSelected.gamePlatform = this.gameInfo._id
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
    // Edit operations.
    editGameOpen() {
      // Restore the data on the store.
      this.$store.commit('resetGameSelected')
      this.$store.commit('resetGameForm')
      // Save current game IDs into the store.
      this.$store.state.gameSelected.gamePlatform = this.gameInfo._id
      this.$store.state.gameSelected.gameRegion = this.gameInfo.gameRegions[this.regionIndex]._id
      this.$store.state.gameSelected.gameVersion = this.gameInfo.gameRegions[this.regionIndex].gameVersions[0]._id
      // Save data of the current game into the store.
      this.$store.commit('setGamePlatformDeveloper', this.gameInfo.developer._id)
      this.$store.commit('setGamePlatformPlatform', this.gameInfo.platform._id)
      this.$store.commit('setGamePlatformReleaseYear', this.gameInfo.releaseYear)
      this.$store.commit('setGamePlatformNumberPlayers', this.gameInfo.numberPlayers)
      this.$store.commit('setGamePlatformLatestVersion', this.gameInfo.latestVersion)
      this.$store.commit('setGamePlatformLinks', this.gameInfo.links)
      this.$store.commit('setGameRegionTitle', this.gameInfo.gameRegions[this.regionIndex].title)
      this.$store.commit('setGameRegionSubTitle', this.gameInfo.gameRegions[this.regionIndex].subTitle)
      this.$store.commit('setGameRegionOriginalTitle', this.gameInfo.gameRegions[this.regionIndex].originalTitle)
      this.$store.commit('setGameRegionRomanizedTitle', this.gameInfo.gameRegions[this.regionIndex].romanizedTitle)
      this.$store.commit('setGameRegionTranslatedTitle', this.gameInfo.gameRegions[this.regionIndex].translatedTitle)
      this.$store.commit('setGameRegionRegion', this.gameInfo.gameRegions[this.regionIndex].region)
      this.$store.commit('setGameRegionSerial', this.gameInfo.gameRegions[this.regionIndex].serial)
      this.$store.commit('setGameVersionCurrentVersion', this.gameInfo.gameRegions[this.regionIndex].gameVersions[0].currentVersion)
      this.$store.commit('setGameVersionComments', this.gameInfo.gameRegions[this.regionIndex].gameVersions[0].comments)
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
            // Close delete dialog.
            this.dialog.deleteGameRegion = !this.dialog.deleteGameRegion
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
    // Region management.
    getRegion(index) {
      // Get region name.
      return getRegion(this.gameInfo.gameRegions[index].region)
    },
    changeRegion(sel) {
      // Set region index.
      this.regionIndex = sel
    },
    nextRegion() {
      // Increase region index.
      if (this.regionIndex < this.gameInfo.gameRegions.length - 1) {
        this.regionIndex++
      }
    },
    prevRegion() {
      // Decrease region index.
      if (this.regionIndex > 0) {
        this.regionIndex--
      }
    }
  },
  mounted() {
    // Load game entry.
    this.loadGame()
  },
  computed: {
    fullTitle() {
      return this.gameInfo.gameRegions[this.regionIndex].subTitle ?
        this.gameInfo.gameRegions[this.regionIndex].title + ' ' + this.gameInfo.gameRegions[this.regionIndex].subTitle :
        this.gameInfo.gameRegions[this.regionIndex].title
    }
  }
}
</script>

<style lang="postcss" scoped>
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