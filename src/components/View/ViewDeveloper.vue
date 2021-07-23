<template>
  <!-- Create game platform dialog. -->
  <hip-dialog
    v-show="dialog.createGamePlatform"
    @close="createGamePlatformClose()"
    class="z-10"
  >
    <!-- Insert create game platform form component. -->
    <create-game-platform
      :gameDeveloper="$route.params.id"
      @close="createGamePlatformClose()"
    />
  </hip-dialog>
  <!-- Edit developer dialog. -->
  <hip-dialog
    v-show="dialog.editDeveloper"
    @close="editDeveloperClose()"
    class="z-10"
  >
    <!-- Insert edit developer form component. -->
    <edit-developer @close="editDeveloperClose()" />
  </hip-dialog>
  <!-- Delete developer dialog. -->
  <hip-dialog
    v-show="dialog.deleteDeveloper"
    @close="deleteDeveloperOpen()"
    class="z-10"
  >
    <!-- Dialog message. -->
    <p class="text-center text-lg">
      Delete developer <b>'{{ developer.name }}'</b> ?
      <br />
      It will also delete all its game entries.
    </p>
    <div class="flex justify-center mt-6 space-x-4">
      <!-- Confirm developer deletion. -->
      <hip-button
        :icon="true"
        @click="deleteDeveloperClose()"
        class="el-icon-circle-check text-2xl"
      ></hip-button>
      <!-- Cancel developer deletion. -->
      <hip-button
        :icon="true"
        @click="deleteDeveloperOpen()"
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
    <!-- Open edit developer dialog. -->
    <hip-button-nb
      v-show="$store.state.editMode"
      @click="editDeveloperOpen()"
      class="el-icon-edit-outline text-2xl"
    ></hip-button-nb>
    <!-- Open delete developer dialog. -->
    <hip-button-nb
      v-show="$store.state.editMode"
      @click="deleteDeveloperOpen()"
      class="el-icon-remove-outline text-2xl"
    ></hip-button-nb>
    <!-- Padding. -->
    <div class="w-full"></div>
  </hip-nav-bar>
  <!-- Show developer's games list. -->
  <ul class="gap-4 grid grid-cols-4 m-6">
    <li
      v-for="game in developer.games"
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
            <h1 class="font-semibold text-xl text-blue-800">{{ game.gameRegions[0].title }}</h1>
            <h2 class="font-normal text-base text-blue-600">{{ game.gameRegions[0].subTitle }}</h2>
          </div>
          <div class="mb-2">
            <h2 class="font-normal italic text-base text-gray-600">{{ game.gameRegions[0].originalTitle }}</h2>
          </div>
          <h3 class="font-normal text-base text-gray-600">{{ game.platform.name }} - {{ game.releaseYear }}</h3>
        </div>
      </hip-card-sq>
    </li>
  </ul>
</template>

<script>
// Import form components.
import CreateGamePlatform from '../Create/CreateGamePlatform.vue'
import EditDeveloper from '../Edit/EditDeveloper.vue'
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
  getDeveloper,
  deleteDeveloper
} from '../../database/controllers/Developer'
import { getGamesD } from '../../database/controllers/Game'

export default {
  name: 'ViewDeveloper',
  components: {
    // Form components.
    CreateGamePlatform,
    EditDeveloper,
    // UI components.
    HipButton,
    HipButtonNb,
    HipCardSq,
    HipDialog,
    HipNavBar
  },
  data() {
    return {
      developer: {
        name: null,
        games: null
      },
      dialog: {
        createGamePlatform: false,
        editDeveloper: false,
        deleteDeveloper: false
      }
    }
  },
  methods: {
    loadDeveloper() {
      // Get developer.
      getDeveloper(this.$route.params.id)
        .then(res => this.developer.name = res.name)
      // Get developer's games.
      getGamesD(this.$route.params.id)
        .then(res => this.developer.games = res)
    },
    // Create operations.
    createGamePlatformOpen() {
      // Restore the data on the store.
      this.$store.commit('resetGameForm')
      // Save data of the current developer into the store.
      this.$store.commit('setGamePlatformDeveloper', this.$route.params.id)
      // Open create dialog.
      this.dialog.createGamePlatform = !this.dialog.createGamePlatform
    },
    createGamePlatformClose() {
      // Reload developer.
      this.loadDeveloper()
      // Close create dialog.
      this.dialog.createGamePlatform = !this.dialog.createGamePlatform
    },
    // Edit operations.
    editDeveloperOpen() {
      // Restore the data on the store.
      this.$store.commit('resetOtherForm')
      // Save current developer ID into the store.
      this.$store.state.otherSelected = this.$route.params.id
      // Save data of the current developer into the store.
      this.$store.commit('setOtherName', this.developer.name)
      // Open edit dialog.
      this.dialog.editDeveloper = !this.dialog.editDeveloper
    },
    editDeveloperClose() {
      // Reload developer.
      this.loadDeveloper()
      // Close edit dialog.
      this.dialog.editDeveloper = !this.dialog.editDeveloper
    },
    // Delete operations.
    deleteDeveloperOpen() {
      // Open delete dialog.
      this.dialog.deleteDeveloper = !this.dialog.deleteDeveloper
    },
    deleteDeveloperClose() {
      // Delete developer.
      deleteDeveloper(this.$route.params.id)
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
    // Load developer's games list.
    this.loadDeveloper()
  }
}
</script>

<style>
</style>