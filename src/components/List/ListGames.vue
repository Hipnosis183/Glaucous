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
    <!-- Navigation bar. -->
    <hip-nav-bar title="Games">
      <!-- Open create developer dialog. -->
      <hip-button-nb
        v-show="$store.state.editMode"
        @click="createGamePlatformOpen()"
        class="el-icon-circle-plus-outline text-2xl"
      ></hip-button-nb>
    </hip-nav-bar>
    <!-- Show games list. -->
    <div class="h-content m-6">
      <div class="flex flex-col max-h-content min-h-content overflow-hidden">
        <div class="flex-1 no-scrollbar overflow-y-scroll rounded-xl">
          <ul
            v-infinite-scroll="loadGamesNext"
            class="gap-4 grid grid-cols-view"
          >
            <li
              v-for="game in games"
              :key="game._id"
              :value="game._id"
              @click="$router.push({ name: 'ViewGame', params: { id: game._id } })"
            >
              <!-- Game cards. -->
              <hip-card-tall
                v-if="$store.state.cardMode == 0"
                :gameInfo="game"
                :gameImage="getImage(game)"
              />
              <hip-card-large
                v-else-if="$store.state.cardMode == 1"
                :gameInfo="game"
                :gameImage="getImage(game)"
              />
              <hip-card-compact
                v-else-if="$store.state.cardMode == 2"
                :gameInfo="game"
                :gameImage="getImage(game)"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import form components.
import CreateGamePlatform from '../Create/CreateGamePlatform.vue'
// Import functions from modules.
import { app } from '@electron/remote'
import { readdirSync } from 'fs-extra'
// Import UI components.
import {
  HipButtonNb,
  HipCard,
  HipCardCompact,
  HipCardLarge,
  HipCardTall,
  HipDialog,
  HipNavBar
} from '../Component'
// Import database controllers functions.
import { getGamesAll } from '../../database/controllers/Game'

export default {
  name: 'ListGames',
  components: {
    // Form components.
    CreateGamePlatform,
    // UI components.
    HipButtonNb,
    HipCard,
    HipCardCompact,
    HipCardLarge,
    HipCardTall,
    HipDialog,
    HipNavBar
  },
  data() {
    return {
      games: null,
      pagination: {
        index: 0,
        count: 50
      },
      dialog: {
        createGamePlatform: false
      }
    }
  },
  methods: {
    loadGames() {
      // Get first batch of games.
      getGamesAll(this.pagination.index, this.pagination.count)
        .then(res => {
          this.games = res
          // Set next pagination index.
          this.pagination.index += this.pagination.count
        })
    },
    loadGamesNext() {
      // Get next batch of games.
      getGamesAll(this.pagination.index, this.pagination.count)
        .then(res => {
          this.games = this.games.concat(res)
          // Set next pagination index.
          this.pagination.index += this.pagination.count
        })
    },
    // Create operations.
    createGamePlatformOpen() {
      // Restore the data on the store.
      this.$store.commit('resetGameSelected')
      this.$store.commit('resetGameForm')
      // Open create dialog.
      this.dialog.createGamePlatform = !this.dialog.createGamePlatform
    },
    createGamePlatformClose() {
      // Close create dialog.
      this.dialog.createGamePlatform = !this.dialog.createGamePlatform
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
    }
  },
  mounted() {
    // Load games list.
    this.loadGames()
  }
}
</script>

<style scoped>
/* Calculations. */
.h-content {
  height: calc(100vh - 6.25rem);
}
.min-h-content {
  min-height: calc(100vh - 6.25rem);
}
.max-h-content {
  max-height: calc(100vh - 6.25rem);
}
</style>