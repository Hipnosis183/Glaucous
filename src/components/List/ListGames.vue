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
        v-show="$store.getters.getSettingsGeneralEditMode"
        @click="createGamePlatformOpen()"
        class="el-icon-circle-plus-outline text-2xl"
      ></hip-button-nb>
      <!-- Search bar. -->
      <div class="flex-shrink-0 ml-2 my-auto w-80">
        <hip-input
          v-model="queryInput"
          icon-prefix="el-icon-search"
          placeholder="Search..."
          remote
          :remote-method="querySearch"
        />
      </div>
      <div class="flex-shrink-0 ml-2 my-auto w-28">
        <settings-cards-mode />
      </div>
    </hip-nav-bar>
    <!-- Show games list. -->
    <div class="h-content m-6">
      <div class="flex flex-col max-h-content min-h-content overflow-hidden">
        <div class="flex-1 no-scrollbar overflow-y-scroll rounded-xl">
          <hip-list
            v-if="games.length > 0"
            :remote-method="loadGamesNext"
          >
            <li
              v-for="game in games"
              :key="game._id"
              :value="game._id"
              @click="$router.push({ name: 'ViewGame', params: { id: game._id } })"
            >
              <!-- Game cards. -->
              <hip-card-tall
                v-if="$store.getters.getSettingsCardsCardMode == 0"
                :gameInfo="game"
              />
              <hip-card-large
                v-else-if="$store.getters.getSettingsCardsCardMode == 1"
                :gameInfo="game"
              />
              <hip-card-compact
                v-else-if="$store.getters.getSettingsCardsCardMode == 2"
                :gameInfo="game"
              />
            </li>
          </hip-list>
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
import SettingsCardsMode from '../Settings/SettingsCards/SettingsCardsMode.vue'
// Import UI components.
import {
  HipButtonNb,
  HipCard,
  HipCardCompact,
  HipCardLarge,
  HipCardTall,
  HipDialog,
  HipInput,
  HipList,
  HipNavBar
} from '../Component'
// Import database controllers functions.
import {
  getGamesAll,
  getGamesAllSearch
} from '../../database/controllers/Game'

export default {
  name: 'ListGames',
  components: {
    // Form components.
    CreateGamePlatform,
    SettingsCardsMode,
    // UI components.
    HipButtonNb,
    HipCard,
    HipCardCompact,
    HipCardLarge,
    HipCardTall,
    HipDialog,
    HipInput,
    HipList,
    HipNavBar
  },
  data() {
    return {
      games: [],
      queryInput: null,
      querySearched: false,
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
      // Ensure pagination index is reset.
      this.pagination.index = 0
      // Get first batch of games.
      getGamesAll(this.pagination.index, this.pagination.count)
        .then(res => {
          this.games = res
          // Set next pagination index.
          this.pagination.index += this.pagination.count
        })
    },
    loadGamesNext() {
      // Check loaded games to avoid duplication.
      if (this.games) {
        // Get next batch of games.
        getGamesAll(this.pagination.index, this.pagination.count)
          .then(res => {
            this.games = this.games.concat(res)
            // Set next pagination index.
            this.pagination.index += this.pagination.count
          })
      }
    },
    // Query searching.
    querySearch(query) {
      // Only start search from two characters onwards.
      if (query !== '' && query.length > 1) {
        // Ensure pagination index is reset.
        this.pagination.index = 0
        // A search has been done.
        this.querySearched = true
        // Search for games matching the query.
        getGamesAllSearch(this.pagination.index, this.pagination.count, query)
          .then(res => {
            this.games = res
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
      // Reload games list.
      this.loadGames()
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
      // Reload game list.
      this.loadGames()
      // Close create dialog.
      this.dialog.createGamePlatform = !this.dialog.createGamePlatform
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