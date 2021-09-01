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
      <edit-platform
        :groupPlatform="platform.parent"
        @close="editPlatformClose()"
      />
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
    <!-- Platform settings dialog. -->
    <hip-dialog
      v-show="dialog.settingsPlatform"
      @close="settingsPlatformClose()"
      width="w-2/3"
      class="z-10"
    >
      <view-platform-settings
        v-if="$store.state.selectedPlatform"
        :key="$store.state.selectedPlatform"
        @close="settingsPlatformClose()"
      />
    </hip-dialog>
    <!-- Navigation bar. -->
    <hip-nav-bar :title="platform.name">
      <!-- Open create game platform dialog. -->
      <hip-button-nb
        v-show="$store.getters.getSettingsGeneralEditMode"
        @click="createGamePlatformOpen()"
        class="el-icon-circle-plus-outline text-2xl"
      ></hip-button-nb>
      <!-- Open edit platform dialog. -->
      <hip-button-nb
        v-show="$store.getters.getSettingsGeneralEditMode"
        @click="editPlatformOpen()"
        class="el-icon-edit-outline text-2xl"
      ></hip-button-nb>
      <!-- Open delete platform dialog. -->
      <hip-button-nb
        v-show="$store.getters.getSettingsGeneralEditMode"
        @click="deletePlatformOpen()"
        class="el-icon-remove-outline text-2xl"
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
        <settings-cards-mode-sm />
      </div>
      <!-- Horizontal padding. -->
      <div class="w-full"></div>
      <!-- Open platform settings dialog. -->
      <hip-button
        v-show="$store.getters.getSettingsGeneralEditMode"
        :icon="true"
        @click="settingsPlatformOpen()"
        class="el-icon-s-tools mr-4 my-auto text-xl"
      ></hip-button>
    </hip-nav-bar>
    <!-- Show platform's games list. -->
    <div class="h-content m-6">
      <div class="flex flex-col max-h-content min-h-content overflow-hidden">
        <div class="flex-1 no-scrollbar overflow-y-scroll rounded-xl">
          <hip-list
            v-if="platform.games.length > 0"
            :remote-method="loadPlatformNext"
          >
            <li
              v-for="game in platform.games"
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
import EditPlatform from '../Edit/EditPlatform.vue'
import SettingsCardsModeSm from '../Settings/SettingsCards/SettingsCardsModeSm.vue'
import ViewPlatformSettings from './ViewPlatform/ViewPlatformSettings.vue'
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
    SettingsCardsModeSm,
    ViewPlatformSettings,
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
      platform: {
        name: null,
        parent: null,
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
        deletePlatform: false,
        settingsPlatform: false
      }
    }
  },
  methods: {
    loadPlatform() {
      // Ensure pagination index is reset.
      this.pagination.index = 0
      // Get platform.
      getPlatform(this.$route.params.id)
        .then(res => {
          this.platform.name = res.name
          this.platform.parent = res.parent ? res.parent._id : ''
          // Save current platform ID into the store.
          this.$store.state.selectedPlatform = res._id
        })
      // Get platform's games.
      getGamesPlatform(this.$route.params.id, this.pagination.index, this.pagination.count)
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
        getGamesPlatform(this.$route.params.id, this.pagination.index, this.pagination.count)
          .then(res => {
            this.platform.games = this.platform.games.concat(res)
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
        getGamesPlatform(this.$route.params.id, this.pagination.index, this.pagination.count, query)
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
      this.$store.commit('resetPlatformForm')
      // Save current platform ID into the store.
      this.$store.state.platformSelected = this.$route.params.id
      // Save data of the current platform into the store.
      this.$store.commit('setPlatformName', this.platform.name)
      this.$store.commit('setPlatformParent', this.platform.parent)
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
    // Settings operations.
    settingsPlatformOpen() {
      // Load stored data.
      this.$store.commit('resetPlatformStore')
      // Open settings dialog.
      this.dialog.settingsPlatform = !this.dialog.settingsPlatform
    },
    settingsPlatformClose() {
      // Close settings dialog.
      this.dialog.settingsPlatform = !this.dialog.settingsPlatform
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