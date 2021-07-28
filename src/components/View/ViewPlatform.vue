<template>
  <div>
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
      <div class="flex justify-center mt-6 space-x-4">
        <!-- Confirm platform deletion. -->
        <hip-button
          :icon="true"
          @click="deletePlatformClose()"
          class="el-icon-circle-check text-2xl"
        ></hip-button>
        <!-- Cancel platform deletion. -->
        <hip-button
          :icon="true"
          @click="deletePlatformOpen()"
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
        class="el-icon-circle-plus-outline text-2xl"
      ></hip-button-nb>
      <!-- Open edit platform dialog. -->
      <hip-button-nb
        v-show="$store.state.editMode"
        @click="editPlatformOpen()"
        class="el-icon-edit-outline text-2xl"
      ></hip-button-nb>
      <!-- Open delete platform dialog. -->
      <hip-button-nb
        v-show="$store.state.editMode"
        @click="deletePlatformOpen()"
        class="el-icon-remove-outline text-2xl"
      ></hip-button-nb>
      <!-- Padding. -->
      <div class="w-full"></div>
      <!-- Page title. -->
      <p class="m-auto mr-6 text-xl whitespace-nowrap">{{ platform.name }}</p>
    </hip-nav-bar>
    <!-- Show platform's games list. -->
    <ul class="gap-4 grid grid-cols-4 m-6">
      <li
        v-for="game in platform.games"
        :key="game._id"
        :value="game._id"
        @click="$router.push({ name: 'ViewGame', params: { id: game._id } })"
      >
        <!-- Game card. -->
        <hip-card-sq>
          <!-- Game card image. -->
          <img
            v-if="getImage(game)"
            :src="'file://' + getImage(game)"
            class="absolute cursor-pointer h-40 left-0 object-cover rounded-t-xl top-0 w-full"
          >
          <div
            v-else
            class="absolute border-2 border-gray-200 cursor-pointer h-40 items-center left-0 rounded-t-xl top-0 w-full"
          >
            <div class="flex h-full items-center w-full">
              <div class="el-icon-picture m-auto text-6xl text-gray-300"></div>
            </div>
          </div>
          <!-- Game card information. -->
          <div class="mt-40">
            <div class="mb-2">
              <h1 class="font-semibold text-xl text-theme-800">{{ game.gameRegions[0].title }}</h1>
              <h2 class="font-normal text-base text-theme-600">{{ game.gameRegions[0].subTitle }}</h2>
            </div>
            <div class="mb-2">
              <h2 class="font-normal italic text-base text-gray-600">{{ game.gameRegions[0].originalTitle }}</h2>
            </div>
            <h3 class="font-normal text-base text-gray-600">{{ game.platform.name }} - {{ game.releaseYear }}</h3>
          </div>
        </hip-card-sq>
      </li>
    </ul>
  </div>
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
      this.$store.commit('resetGameSelected')
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
      // Load first picture image as cover if it doesn't exists.
      if (!imageFile) {
        imageFile = readdirSync(imagePath).filter(res => !res.startsWith('0'.repeat(8)))[0]
      }
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