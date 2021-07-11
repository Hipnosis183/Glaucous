<template>
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
    <edit-game @close="editGameClose()" />
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
    <div class="flex space-x-4 mt-6 justify-center">
      <!-- Confirm game deletion. -->
      <hip-button
        class="el-icon-circle-check text-2xl"
        @click="deleteGameRegionClose()"
        :icon="true"
      ></hip-button>
      <!-- Cancel game deletion. -->
      <hip-button
        class="el-icon-circle-close text-2xl"
        @click="deleteGameRegionOpen()"
        :icon="true"
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
    <div class="flex space-x-4 mt-6 justify-center">
      <!-- Confirm game deletion. -->
      <hip-button
        class="el-icon-circle-check text-2xl"
        @click="deleteGamePlatformClose()"
        :icon="true"
      ></hip-button>
      <!-- Cancel game deletion. -->
      <hip-button
        class="el-icon-circle-close text-2xl"
        @click="deleteGamePlatformOpen()"
        :icon="true"
      ></hip-button>
    </div>
  </hip-dialog>
  <!-- View game details dialog. -->
  <hip-dialog
    v-show="dialog.viewGameDetails"
    @close="viewGameDetails()"
  >
    <!-- Insert view game details component. -->
    <view-game-details
      :gameInfo="gameInfo"
      :regionIndex="regionIndex"
      :regionName="getRegion(regionIndex)"
    />
  </hip-dialog>
  <!-- Insert view game linking component. -->
  <view-game-linking
    v-show="dialog.viewGameLinking"
    :gameInfo="gameInfo"
    :regionIndex="regionIndex"
    :key="gameInfo"
    @reload="loadGame()"
    @close="viewGameLinking()"
  />
  <!-- Navigation bar. -->
  <hip-nav-bar>
    <!-- Open create game region dialog. -->
    <hip-button-nb
      v-show="$store.state.editMode"
      class="el-icon-circle-plus-outline text-2xl"
      @click="createGameRegionOpen()"
    ></hip-button-nb>
    <!-- Open edit game dialog. -->
    <hip-button-nb
      v-show="$store.state.editMode"
      class="el-icon-edit-outline text-2xl"
      @click="editGameOpen()"
    ></hip-button-nb>
    <!-- Open delete game region dialog. -->
    <hip-button-nb
      v-show="$store.state.editMode"
      class="el-icon-remove-outline text-2xl"
      @click="deleteGameRegionOpen()"
    ></hip-button-nb>
    <!-- Open delete game platform dialog. -->
    <hip-button-nb
      v-show="$store.state.editMode"
      class="el-icon-delete text-2xl"
      @click="deleteGamePlatformOpen()"
    ></hip-button-nb>
    <!-- Game region tabs. -->
    <ul class="w-full flex">
      <li
        class="w-full"
        v-for="(region, index) in gameInfo.gameRegions"
        :key="region._id"
        :value="region._id"
      >
        <button
          class="w-full py-3"
          :class="index == regionIndex ? 'bg-gray-200 border-b-4 border-indigo-400' : ''"
          @click="changeRegion(index)"
        >{{ getRegion(index) }}</button>
      </li>
    </ul>
  </hip-nav-bar>
  <!-- Game information. -->
  <div class="flex m-6 space-x-6 min-h-content">
    <!-- Left card. -->
    <div class="w-3/5 bg-white p-6 rounded-xl shadow leading-loose">
      <img
        class="w-12 float-right rounded-md border-2 border-gray-200"
        :src="'./images/flags/' + gameInfo.gameRegions[regionIndex].region + '.svg'"
      />
      <!-- Header title. -->
      <div class="mb-10">
        <p class="text-4xl">{{ gameInfo.gameRegions[regionIndex].title }}</p>
        <p class="text-2xl">{{ gameInfo.gameRegions[regionIndex].subTitle }}</p>
      </div>
      <!-- Body contents. -->
      <div class="flex flex-inline items-center space-x-4 mb-6">
        <h1 class="data-title">Game Information</h1>
        <!-- Open view game details dialog. -->
        <hip-button @click="viewGameDetails()">Details</hip-button>
      </div>
      <div class="mb-6">
        <div class="data-container">
          <p class="font-semibold">Full Title:</p>
          <p>{{ fullTitle }}</p>
        </div>
        <div class="data-container">
          <p class="font-semibold">Original Title:</p>
          <p>{{ gameInfo.gameRegions[regionIndex].originalTitle }}</p>
        </div>
        <div class="data-container">
          <p class="font-semibold">Romanized Title:</p>
          <p>{{ gameInfo.gameRegions[regionIndex].romanizedTitle }}</p>
        </div>
        <div class="data-container">
          <p class="font-semibold">Translated Title:</p>
          <p>{{ gameInfo.gameRegions[regionIndex].translatedTitle }}</p>
        </div>
      </div>
      <div>
        <div class="data-container">
          <p class="font-semibold">Developer:</p>
          <!-- Go to the developer page. -->
          <p @click="$router.push({ name: 'ViewDeveloper', params: { id: gameInfo.developer._id } })">
            {{ gameInfo.developer.name }}
          </p>
        </div>
        <div class="data-container">
          <p class="font-semibold">Platform:</p>
          <!-- Go to the platform page. -->
          <p @click="$router.push({ name: 'ViewPlatform', params: { id: gameInfo.platform._id } })">
            {{ gameInfo.platform.name }}
          </p>
          <!-- Open view game linking dialog. -->
          <hip-button @click="viewGameLinking()">Also On</hip-button>
        </div>
        <div class="data-container">
          <p class="font-semibold">Release Year:</p>
          <p>{{ gameInfo.releaseYear }}</p>
        </div>
        <div class="data-container">
          <p class="font-semibold">Number of Players:</p>
          <p>{{ gameInfo.numberPlayers }}</p>
        </div>
      </div>
    </div>
    <!-- Right card. -->
    <div class="w-2/5 bg-white p-6 rounded-xl shadow">
    </div>
  </div>
</template>

<script>
// Import form components.
import CreateGameRegion from '../Create/CreateGameRegion.vue'
import EditGame from '../Edit/EditGame.vue'
import ViewGameDetails from './ViewGame/ViewGameDetails.vue'
import ViewGameLinking from './ViewGame/ViewGameLinking.vue'
// Import UI components.
import {
  HipButton,
  HipButtonNb,
  HipDialog,
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
    CreateGameRegion,
    EditGame,
    ViewGameDetails,
    ViewGameLinking,
    // UI components.
    HipButton,
    HipButtonNb,
    HipDialog,
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
        gamePlatforms: [],
        gameRegions: [{
          title: null,
          subTitle: null,
          originalTitle: null,
          romanizedTitle: null,
          translatedTitle: null,
          region: null,
          gameVersions: [{
            currentVersion: null,
            comments: [null]
          }]
        }]
      },
      regionIndex: 0,
      dialog: {
        createGameRegion: false,
        editGame: false,
        deleteGameRegion: false,
        deleteGamePlatform: false,
        viewGameDetails: false,
        viewGameLinking: false
      }
    }
  },
  methods: {
    loadGame() {
      // Get game.
      getGame(this.$route.params.id)
        //.then(res => this.gameInfo = res)
        .then(res => this.gameInfo = res)
    },
    // Create operations.
    createGameRegionOpen() {
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
      // Restore the data on the store.
      this.$store.commit('resetGameForm')
    },
    // Edit operations.
    editGameOpen() {
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
      this.$store.commit('setGameRegionTitle', this.gameInfo.gameRegions[this.regionIndex].title)
      this.$store.commit('setGameRegionSubTitle', this.gameInfo.gameRegions[this.regionIndex].subTitle)
      this.$store.commit('setGameRegionOriginalTitle', this.gameInfo.gameRegions[this.regionIndex].originalTitle)
      this.$store.commit('setGameRegionRomanizedTitle', this.gameInfo.gameRegions[this.regionIndex].romanizedTitle)
      this.$store.commit('setGameRegionTranslatedTitle', this.gameInfo.gameRegions[this.regionIndex].translatedTitle)
      this.$store.commit('setGameRegionRegion', this.gameInfo.gameRegions[this.regionIndex].region)
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
      // Restore the data on the store.
      this.$store.commit('resetGameForm')
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
    // View details.
    viewGameDetails() {
      // Open details dialog.
      this.dialog.viewGameDetails = !this.dialog.viewGameDetails
    },
    // View and manage linked games.
    viewGameLinking() {
      // Open game linking dialog.
      this.dialog.viewGameLinking = !this.dialog.viewGameLinking
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
      return this.gameInfo.gameRegions[this.regionIndex].title + ' ' + this.gameInfo.gameRegions[this.regionIndex].subTitle
    }
  }
}
</script>

<style>
</style>
