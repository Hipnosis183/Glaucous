<template>
  <hip-overlay>
    <!-- Unlink game dialog. -->
    <hip-dialog
      v-show="dialog.unlinkGame"
      @close="unlinkGameOpen()"
      class="pos-initial z-10"
    >
      <!-- Dialog message. -->
      <p class="text-center text-lg">
        Unlink the game <b>'{{ gameInfo.gameRegions[regionIndex].title }}'</b> ?
        <br />
        It will stop being grouped with the games listed.
      </p>
      <div class="flex justify-center mt-6 space-x-4">
        <!-- Confirm game unlink. -->
        <hip-button
          :icon="true"
          @click="unlinkGameClose()"
          class="el-icon-circle-check text-2xl"
        ></hip-button>
        <!-- Cancel game unlink. -->
        <hip-button
          :icon="true"
          @click="unlinkGameOpen()"
          class="el-icon-circle-close text-2xl"
        ></hip-button>
      </div>
    </hip-dialog>
    <!-- Unlink error dialog. -->
    <hip-dialog
      v-show="dialog.unlinkError"
      @close="unlinkError()"
      class="pos-initial z-10"
    >
      <!-- Dialog message. -->
      <p class="text-center text-lg">
        This game is not linked with any other.
      </p>
      <div class="flex justify-center mt-6 space-x-4">
        <!-- Close message. -->
        <hip-button
          :icon="true"
          @click="unlinkError()"
          class="el-icon-circle-check text-2xl"
        ></hip-button>
      </div>
    </hip-dialog>
    <!-- Validation error dialog. -->
    <hip-dialog
      v-show="dialog.validationError"
      @close="validationError()"
      class="pos-initial z-10"
    >
      <!-- Dialog message. -->
      <p class="text-center text-lg">
        Complete the required field.
      </p>
      <div class="flex justify-center mt-6 space-x-4">
        <!-- Close message. -->
        <hip-button
          :icon="true"
          @click="validationError()"
          class="el-icon-circle-check text-2xl"
        ></hip-button>
      </div>
    </hip-dialog>
    <!-- Game linking dialog. -->
    <hip-modal
      v-show="$store.state.editMode"
      class="justify-center mb-4"
    >
      <!-- Form header. -->
      <div class="flex justify-between mb-6 mx-2">
        <!-- Form title. -->
        <p class="mr-10 pt-1 text-2xl">Game Linking</p>
        <!-- Form buttons. -->
        <div class="h-10 space-x-4">
          <hip-button
            :icon="true"
            @click="linkGame()"
            class="el-icon-circle-plus-outline text-2xl"
          ></hip-button>
          <hip-button
            :icon="true"
            @click="unlinkGameOpen()"
            class="el-icon-remove-outline text-2xl"
          ></hip-button>
        </div>
      </div>
      <hip-select
        v-model="querySelected"
        clearable
        placeholder="Search..."
        remote
        :remote-method="querySearch"
        class="w-full"
      >
        <hip-option
          v-for="item in queryResults"
          :key="item._id"
          :label="item.child.title + ' (' + item.releaseYear + ') - ' + item.platforms.join(' / ')"
          :value="item._id"
        >
        </hip-option>
      </hip-select>
    </hip-modal>
    <!-- Show linked games list. -->
    <ul>
      <div
        v-if="linkedGames.length > 0"
        class="gap-4 grid grid-flow-row"
      >
        <li
          v-for="game in linkedGames"
          :key="game._id"
          :value="game._id"
          @click="$router.push({ name: 'ViewGame', params: { id: game._id } })"
        >
          <!-- Game card. -->
          <hip-card-compact
            :gameInfo="game"
            :gameImage="getImage(game)"
          />
        </li>
      </div>
      <div v-else>
        <li>
          <!-- Empty card. -->
          <hip-modal class="text-center">
            <p>No other platforms available.</p>
          </hip-modal>
        </li>
      </div>
    </ul>
  </hip-overlay>
</template>

<script>
// Import UI components.
import {
  HipButton,
  HipCardCompact,
  HipDialog,
  HipModal,
  HipOption,
  HipOverlay,
  HipSelect
} from '../../Component'
// Import database controllers functions.
import {
  getGamesLinked,
  getGamesLinkedSearch,
  getImage,
  linkGame,
  unlinkGame
} from '../../../database/controllers/Game'

export default {
  name: 'ViewGameLinking',
  components: {
    // UI components.
    HipButton,
    HipCardCompact,
    HipDialog,
    HipModal,
    HipOption,
    HipOverlay,
    HipSelect
  },
  data() {
    return {
      linkedGames: [],
      linkedGamesSearch: [],
      queryResults: [],
      querySelected: '',
      dialog: {
        unlinkGame: false,
        unlinkError: false,
        validationError: false
      },
    }
  },
  props: [
    'gameInfo',
    'regionIndex'
  ],
  methods: {
    // Game linking operations.
    linkGame() {
      // Validate required fields.
      if (!this.querySelected) {
        this.validationError()
        return
      }
      // Link current to selected game(s).
      linkGame(this.gameInfo, this.querySelected)
        .then(res => {
          // Reload linked games.
          this.getGamesLinked(res)
          // Reset query.
          this.queryResults = []
          this.querySelected = ''
        })
    },
    unlinkGameOpen() {
      if (this.linkedGames.length > 0) {
        // Open unlink dialog.
        this.dialog.unlinkGame = !this.dialog.unlinkGame
      } else {
        // Open unlink error dialog.
        this.unlinkError()
      }
    },
    unlinkGameClose() {
      // Unlink current from associated game(s).
      unlinkGame(this.gameInfo)
        .then(() => {
          // Reset linked games list.
          this.linkedGames = []
          this.linkedGamesSearch = [this.gameInfo._id]
          // Reset query.
          this.queryResults = []
          this.querySelected = ''
          // Close unlink dialog.
          this.dialog.unlinkGame = !this.dialog.unlinkGame
        })
    },
    // Get linked games.
    getGamesLinked(games) {
      getGamesLinked(games)
        .then(res => {
          // Set linked games, exclude the selected game.
          this.linkedGames = res.filter(res => res._id != this.gameInfo._id)
          // Set linked games IDs for search.
          this.linkedGamesSearch = []
          res.forEach(game => {
            this.linkedGamesSearch.push(game._id)
          })
        })
    },
    // Get games cover image.
    getImage(game) {
      return getImage(game)
    },
    // Query searching.
    querySearch(query) {
      // Only start search from three characters onwards.
      if (query !== '' && query.length > 2) {
        // Search for games matching the query.
        getGamesLinkedSearch(this.linkedGamesSearch, query)
          .then(res => {
            // Store results.
            this.queryResults = res
          })
      } else {
        // Keep results empty.
        this.queryResults = []
      }
    },
    // Show errors.
    unlinkError() {
      // Open unlink error dialog.
      this.dialog.unlinkError = !this.dialog.unlinkError
    },
    validationError() {
      // Open validation error dialog.
      this.dialog.validationError = !this.dialog.validationError
    }
  },
  mounted() {
    // Load linked games.
    this.getGamesLinked(this.gameInfo.gamePlatforms)
  }
}
</script>

<style>
</style>