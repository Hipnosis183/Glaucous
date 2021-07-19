<template>
  <!-- Create game platform dialog. -->
  <hip-dialog
    v-show="dialog.createGamePlatform"
    @close="createGamePlatformClose()"
    class="z-10"
  >
    <!-- Insert create game platform form component. -->
    <create-game-platform
      :gamePlatform="$route.params.id"
      @close="createGamePlatformClose()"
    />
  </hip-dialog>
  <!-- Edit platform dialog. -->
  <hip-dialog
    v-show="dialog.editPlatform"
    @close="editPlatformClose()"
    class="z-10"
  >
    <!-- Insert edit platform form component. -->
    <edit-platform @close="editPlatformClose()" />
  </hip-dialog>
  <!-- Delete platform dialog. -->
  <hip-dialog
    v-show="dialog.deletePlatform"
    @close="deletePlatformOpen()"
    class="z-10"
  >
    <!-- Dialog message. -->
    <p class="text-center text-lg">
      Delete platform <b>'{{ platform.name }}'</b> ?
      <br />
      It will also delete all its game entries.
    </p>
    <div class="flex space-x-4 mt-6 justify-center">
      <!-- Confirm platform deletion. -->
      <hip-button
        class="el-icon-circle-check text-2xl"
        @click="deletePlatformClose()"
        :icon="true"
      ></hip-button>
      <!-- Cancel platform deletion. -->
      <hip-button
        class="el-icon-circle-close text-2xl"
        @click="deletePlatformOpen()"
        :icon="true"
      ></hip-button>
    </div>
  </hip-dialog>
  <!-- Navigation bar. -->
  <hip-nav-bar>
    <!-- Open create game platform dialog. -->
    <hip-button-nb
      v-show="$store.state.editMode"
      class="el-icon-circle-plus-outline text-2xl"
      @click="createGamePlatformOpen()"
    ></hip-button-nb>
    <!-- Open edit platform dialog. -->
    <hip-button-nb
      v-show="$store.state.editMode"
      class="el-icon-edit-outline text-2xl"
      @click="editPlatformOpen()"
    ></hip-button-nb>
    <!-- Open delete platform dialog. -->
    <hip-button-nb
      v-show="$store.state.editMode"
      class="el-icon-remove-outline text-2xl"
      @click="deletePlatformOpen()"
    ></hip-button-nb>
    <!-- Padding. -->
    <div class="w-full"></div>
  </hip-nav-bar>
  <!-- Show platform's games list. -->
  <ul class="grid grid-cols-4 gap-4 m-6">
    <li
      v-for="game in platform.games"
      :key="game._id"
      :value="game._id"
      @click="$router.push({ name: 'ViewGame', params: { id: game._id } })"
    >
      <!-- Game card. -->
      <hip-card-sq>
        <img
          v-if="getImage(game)"
          class="absolute top-0 left-0 w-full h-40 rounded-t-xl object-cover cursor-pointer"
          :src="'file://' + getImage(game)"
        >
        <div
          v-else
          class="absolute top-0 left-0 w-full h-40 rounded-t-xl cursor-pointer items-center border-2 border-gray-200"
        >
          <div class="flex w-full h-full items-center">
            <div class="el-icon-picture text-6xl text-gray-300 m-auto"></div>
          </div>
        </div>
        <div class="mt-40">
          <div class="mb-2">
            <h1 class="text-xl text-blue-800 font-semibold">{{ game.gameRegions[0].title }}</h1>
            <h2 class="text-base text-blue-600 font-normal">{{ game.gameRegions[0].subTitle }}</h2>
          </div>
          <div class="mb-2">
            <h2 class="text-base text-gray-600 italic font-normal">{{ game.gameRegions[0].originalTitle }}</h2>
          </div>
          <h3 class="text-base text-gray-600 font-normal">{{ game.platform.name }} - {{ game.releaseYear }}</h3>
        </div>
      </hip-card-sq>
    </li>
  </ul>
</template>

<script>
// Import form components.
import CreateGamePlatform from '../Create/CreateGamePlatform.vue'
import EditPlatform from '../Edit/EditPlatform.vue'
// Import functions from modules.
import { app } from '@electron/remote'
import { readdirSync } from 'fs-extra'
// Import UI components.
import {
  HipButton,
  HipButtonNb,
  HipCardSq,
  HipDialog,
  HipNavBar
} from '../Component'
// Import database controllers functions.
import {
  getPlatform,
  deletePlatform
} from '../../database/controllers/Platform'
import { getGamesP } from '../../database/controllers/Game'

export default {
  name: 'ViewPlatform',
  components: {
    // Form components.
    CreateGamePlatform,
    EditPlatform,
    // UI components.
    HipButton,
    HipButtonNb,
    HipCardSq,
    HipDialog,
    HipNavBar
  },
  data() {
    return {
      platform: {
        name: null,
        games: null
      },
      dialog: {
        createGamePlatform: false,
        editPlatform: false,
        deletePlatform: false
      }
    }
  },
  methods: {
    loadPlatform() {
      // Get platform.
      getPlatform(this.$route.params.id)
        .then(res => this.platform.name = res.name)
      // Get platform's games.
      getGamesP(this.$route.params.id)
        .then(res => this.platform.games = res)
    },
    // Create operations.
    createGamePlatformOpen() {
      // Restore the data on the store.
      this.$store.commit('resetGameForm')
      // Save data of the current platform into the store.
      this.$store.commit('setGamePlatformPlatform', this.$route.params.id)
      // Open create dialog.
      this.dialog.createGamePlatform = !this.dialog.createGamePlatform
    },
    createGamePlatformClose() {
      // Reload platform.
      this.loadPlatform()
      // Close create dialog.
      this.dialog.createGamePlatform = !this.dialog.createGamePlatform
    },
    // Edit operations.
    editPlatformOpen() {
      // Restore the data on the store.
      this.$store.commit('resetOtherForm')
      // Save current platform ID into the store.
      this.$store.state.otherSelected = this.$route.params.id
      // Save data of the current platform into the store.
      this.$store.commit('setOtherName', this.platform.name)
      // Open edit dialog.
      this.dialog.editPlatform = !this.dialog.editPlatform
    },
    editPlatformClose() {
      // Reload platform.
      this.loadPlatform()
      // Close edit dialog.
      this.dialog.editPlatform = !this.dialog.editPlatform
    },
    // Delete operations.
    deletePlatformOpen() {
      // Open delete dialog.
      this.dialog.deletePlatform = !this.dialog.deletePlatform
    },
    deletePlatformClose() {
      // Delete platform.
      deletePlatform(this.$route.params.id)
        .then(() => this.$router.back())
    },
    // Get games cover image.
    getImage(game) {
      // Set the image directory path of the game region.
      let imagePath = app.getAppPath() + '/images/' + game._id + '/' + game.gameRegions[0]._id
      // Load images filenames and filter the cover image file.
      let imageFile = readdirSync(imagePath).filter(res => res.startsWith('0'.repeat(8)))[0]
      // Return the cover if it exists.
      return imageFile ? (imagePath + '/' + imageFile) : false
    },
  },
  mounted() {
    // Load platform's games list.
    this.loadPlatform()
  }
}
</script>

<style>
</style>
