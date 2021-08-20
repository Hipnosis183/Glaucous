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
    <hip-nav-bar :title="developer.name">
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
      <!-- Search bar. -->
      <div class="flex-shrink-0 ml-2 my-auto w-80">
        <hip-input
          v-model="queryInput"
          clearable
          placeholder="Search..."
          icon-prefix="el-icon-search"
          @clear="queryClear()"
          @input="querySearch(queryInput)"
        />
      </div>
      <div class="flex-shrink-0 ml-2 my-auto w-28">
        <settings-cards-mode-sm />
      </div>
    </hip-nav-bar>
    <!-- Show developer's games list. -->
    <div class="h-content m-6">
      <div class="flex flex-col max-h-content min-h-content overflow-hidden">
        <div class="flex-1 no-scrollbar overflow-y-scroll rounded-xl">
          <hip-list
            v-if="developer.games.length > 0"
            :remote-method="loadDeveloperNext"
          >
            <li
              v-for="game in developer.games"
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
import EditDeveloper from '../Edit/EditDeveloper.vue'
import SettingsCardsModeSm from '../Settings/SettingsCards/SettingsCardsModeSm.vue'
// Import UI components.
import {
  HipButton,
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
  getDeveloper,
  deleteDeveloper
} from '../../database/controllers/Developer'
import {
  getGamesDeveloper,
  getImage
} from '../../database/controllers/Game'

export default {
  name: 'ViewDeveloper',
  components: {
    // Form components.
    CreateGamePlatform,
    EditDeveloper,
    SettingsCardsModeSm,
    // UI components.
    HipButton,
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
      developer: {
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
        editDeveloper: false,
        deleteDeveloper: false
      }
    }
  },
  methods: {
    loadDeveloper() {
      // Ensure pagination index is reset.
      this.pagination.index = 0
      // Get developer.
      getDeveloper(this.$route.params.id)
        .then(res => this.developer.name = res.name)
      // Get developer's games.
      getGamesDeveloper(this.$route.params.id, this.pagination.index, this.pagination.count)
        .then(res => {
          this.developer.games = res
          // Set next pagination index.
          this.pagination.index += this.pagination.count
        })
    },
    loadDeveloperNext() {
      // Check loaded games to avoid duplication.
      if (this.developer.games) {
        // Get next batch of games.
        getGamesDeveloper(this.$route.params.id, this.pagination.index, this.pagination.count)
          .then(res => {
            this.developer.games = this.developer.games.concat(res)
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
        getGamesDeveloper(this.$route.params.id, this.pagination.index, this.pagination.count, query)
          .then(res => {
            this.developer.games = res
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
      this.loadDeveloper()
    },
    // Create operations.
    createGamePlatformOpen() {
      // Restore the data on the store.
      this.$store.commit('resetGameSelected')
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
      return getImage(game)
    }
  },
  mounted() {
    // Load developer's games list.
    this.loadDeveloper()
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