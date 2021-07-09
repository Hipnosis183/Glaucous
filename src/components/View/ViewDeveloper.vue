<template>
  <!-- Create game platform dialog. -->
  <hip-dialog
    v-show="dialog.createGamePlatform"
    @close="createGamePlatformClose()"
  >
    <!-- Insert create game platform form component. -->
    <create-game-platform @close="createGamePlatformClose()" />
  </hip-dialog>
  <!-- Edit developer dialog. -->
  <hip-dialog
    v-show="dialog.editDeveloper"
    @close="editDeveloperClose()"
  >
    <!-- Insert edit developer form component. -->
    <edit-developer @close="editDeveloperClose()" />
  </hip-dialog>
  <!-- Navigation bar. -->
  <hip-nav-bar>
    <!-- Open create game platform dialog. -->
    <hip-button-nb @click="createGamePlatformOpen()">+</hip-button-nb>
    <!-- Open delete developer dialog. -->
    <hip-button-nb @click="deleteDeveloper()">-</hip-button-nb>
    <!-- Open edit developer dialog. -->
    <hip-button-nb @click="editDeveloperOpen()">/</hip-button-nb>
    <!-- Padding. -->
    <div class="w-full"></div>
  </hip-nav-bar>
  <!-- Show developer's games list. -->
  <ul class="grid grid-cols-4 gap-4 m-6">
    <li
      v-for="game in developer.games"
      :key="game._id"
      :value="game._id"
      @click="$router.push({ name: 'ViewGame', params: { id: game._id } })"
    >
      <!-- Game card. -->
      <hip-card-sq>
        <div class="mb-2">
          <h1 class="text-xl text-blue-800 font-semibold">{{ game.gameRegions[0].title }}</h1>
          <h2 class="text-base text-blue-600 font-normal">{{ game.gameRegions[0].subTitle }}</h2>
        </div>
        <div class="mb-2">
          <h2 class="text-base text-gray-600 italic font-normal">{{ game.gameRegions[0].originalTitle }}</h2>
        </div>
        <h3 class="text-base text-gray-600 font-normal">{{ game.platform.name }} - {{ game.releaseYear }}</h3>
      </hip-card-sq>
    </li>
  </ul>
</template>

<script>
// Import form components.
import CreateGamePlatform from '../Create/CreateGamePlatform.vue'
import EditDeveloper from '../Edit/EditDeveloper.vue'
// Import UI components.
import {
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
    HipButtonNb,
    HipCardSq,
    HipDialog,
    HipNavBar
  },
  data() {
    return {
      // Dialog object.
      dialog: {
        createGamePlatform: false,
        editDeveloper: false
      },
      // Developer object.
      developer: {
        name: null,
        games: null
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
      // Restore the data on the store.
      this.$store.commit('resetGameForm')
    },
    // Edit operations.
    editDeveloperOpen() {
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
      // Restore the data on the store.
      this.$store.commit('resetOtherForm')
    },
    // Delete operations.
    deleteDeveloper() {
      // Delete developer.
      deleteDeveloper(this.$route.params.id)
        .then(() => this.$router.back())
    }
  },
  mounted() {
    // Load developer's games list.
    this.loadDeveloper()
  }
}
</script>

<style>
</style>
