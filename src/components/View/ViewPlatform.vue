<template>
  <!-- Create game platform dialog. -->
  <hip-dialog
    v-show="dialog.createGamePlatform"
    @close="createGamePlatformClose()"
  >
    <!-- Insert create game platform form component. -->
    <create-game-platform @close="createGamePlatformClose()" />
  </hip-dialog>
  <!-- Edit platform dialog. -->
  <hip-dialog
    v-show="dialog.editPlatform"
    @close="editPlatformClose()"
  >
    <!-- Insert edit platform form component. -->
    <edit-platform @close="editPlatformClose()" />
  </hip-dialog>
  <!-- Navigation bar. -->
  <hip-nav-bar>
    <!-- Open create game platform dialog. -->
    <hip-button-nb
      class="el-icon-circle-plus-outline text-xl"
      @click="createGamePlatformOpen()"
    ></hip-button-nb>
    <!-- Open edit platform dialog. -->
    <hip-button-nb
      class="el-icon-edit-outline text-xl"
      @click="editPlatformOpen()"
    ></hip-button-nb>
    <!-- Open delete platform dialog. -->
    <hip-button-nb
      class="el-icon-remove-outline text-xl"
      @click="deletePlatform()"
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
import EditPlatform from '../Edit/EditPlatform.vue'
// Import UI components.
import {
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
        editPlatform: false
      },
      // Platform object.
      platform: {
        name: null,
        games: null
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
      // Restore the data on the store.
      this.$store.commit('resetGameForm')
    },
    // Edit operations.
    editPlatformOpen() {
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
      // Restore the data on the store.
      this.$store.commit('resetOtherForm')
    },
    // Delete operations.
    deletePlatform() {
      // Delete platform.
      deletePlatform(this.$route.params.id)
        .then(() => this.$router.back())
    }
  },
  mounted() {
    // Load platform's games list.
    this.loadPlatform()
  }
}
</script>

<style>
</style>
