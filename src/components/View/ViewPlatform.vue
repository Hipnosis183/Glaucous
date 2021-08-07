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
    <hip-nav-bar :title="platform.name">
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
      <!-- Search bar. -->
      <div class="ml-2 my-auto w-80">
        <el-input
          v-model="queryInput"
          @clear="queryClear()"
          @input="querySearch(queryInput)"
          clearable
          placeholder="Search..."
          prefix-icon="el-icon-search"
          size="medium"
        />
      </div>
    </hip-nav-bar>
    <!-- Show platform's games list. -->
    <div class="h-content m-6">
      <div class="flex flex-col max-h-content min-h-content overflow-hidden">
        <div class="flex-1 no-scrollbar overflow-y-scroll rounded-xl">
          <ul
            v-if="platform.games.length > 0"
            v-infinite-scroll="loadPlatformNext"
            class="gap-4 grid grid-cols-view"
          >
            <li
              v-for="game in platform.games"
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
          <div
            v-else-if="querySearched"
            class="flex h-content w-full"
          >
            <p class="m-auto">No games found.</p>
          </div>
        </div>
      </div>
    </div>
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
  HipCard,
  HipCardCompact,
  HipCardLarge,
  HipCardTall,
  HipDialog,
  HipNavBar
} from '../Component'
// Import database controllers functions.
import {
  getPlatform,
  deletePlatform
} from '../../database/controllers/Platform'
import { getGamesPlatform } from '../../database/controllers/Game'

export default {
  name: 'ViewPlatform',
  components: {
    // Form components.
    CreateGamePlatform,
    EditPlatform,
    // UI components.
    HipButton,
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
      platform: {
        name: null,
        games: []
      },
      queryInput: null,
      querySearched: false,
      pagination: {
        index: 0,
        count: 50
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
      getGamesPlatform(this.$route.params.id, this.pagination.index, this.pagination.count, true)
        .then(res => {
          this.platform.games = res
          // Set next pagination index.
          this.pagination.index += this.pagination.count
        })
    },
    loadPlatformNext() {
      // Check loaded games to avoid duplication.
      if (this.platform.games) {
        // Get next batch of games.
        getGamesPlatform(this.$route.params.id, this.pagination.index, this.pagination.count, true)
          .then(res => {
            this.platform.games = this.platform.games.concat(res)
            // Set next pagination index.
            this.pagination.index += this.pagination.count
          })
      }
    },
    // Query searching.
    querySearch(query) {
      // Only start search from three characters onwards.
      if (query !== '' && query.length > 2) {
        // Ensure pagination index is reset.
        this.pagination.index = 0
        // A search has been done.
        this.querySearched = true
        // Search for games matching the query.
        getGamesPlatform(this.$route.params.id, this.pagination.index, this.pagination.count, true, query)
          .then(res => {
            this.platform.games = res
            // Set next pagination index.
            this.pagination.index += this.pagination.count
          })
      } else {
        if (this.querySearched) {
          this.queryClear()
        }
      }
    },
    queryClear() {
      // A search hasn't been done yet.
      this.querySearched = false
      // Ensure pagination index is reset.
      this.pagination.index = 0
      // Reload games list.
      this.loadPlatform()
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
    }
  },
  mounted() {
    // Load platform's games list.
    this.loadPlatform()
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