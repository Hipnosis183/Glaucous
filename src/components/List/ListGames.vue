<template>
  <div>
    <!-- Create game platform dialog. -->
    <hip-dialog
      v-show="createPlatformDialog"
      @close="createPlatformClose()"
      class="z-10"
    >
      <!-- Insert create game platform form component. -->
      <create-game-platform @close="createPlatformClose()" />
    </hip-dialog>
    <!-- Navigation bar. -->
    <hip-nav-bar title="Games">
      <!-- Open create developer dialog. -->
      <hip-button-nb
        v-show="$store.getters.getSettingsGeneralEditMode"
        @click="createPlatformOpen()"
      >
        <hip-icon class="w-6">
          <icon-add />
        </hip-icon>
      </hip-button-nb>
      <!-- Search bar. -->
      <div class="flex-shrink-0 ml-2 my-auto w-80">
        <hip-input
          v-model="queryInput"
          icon-prefix="icon-search"
          placeholder="Search..."
          remote
          :remote-method="querySearch"
        />
      </div>
      <!-- List settings. -->
      <settings-lists
        gameSettings
        groupSettings
      />
    </hip-nav-bar>
    <!-- Show games list. -->
    <div class="h-content m-6">
      <div class="flex flex-col max-h-content min-h-content overflow-hidden">
        <div class="flex-1 no-scrollbar overflow-y-scroll rounded-xl">
          <hip-list
            v-if="games.length > 0"
            :listDisplay="$store.getters.getSettingsListsListDisplay"
            :remote-method="loadGamesNext"
          >
            <li
              v-for="game in games"
              :key="game._id"
              :value="game._id"
              @click="$router.push({ name: 'ViewGame', params: { id: game._id } })"
            >
              <!-- Game cards. -->
              <hip-card-grid
                v-if="$store.getters.getSettingsListsListDisplay == 0"
                :gameInfo="game"
              />
              <hip-card-list
                v-else-if="$store.getters.getSettingsListsListDisplay == 1"
                :gameInfo="game"
              />
              <hip-card-compact
                v-else-if="$store.getters.getSettingsListsListDisplay == 2"
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
// Import Vue functions.
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
// Import database controllers functions.
import { getGamesAll, getGamesAllSearch } from '@/database/controllers/Game'
// Import form components.
import CreateGamePlatform from '@/components/Create/CreateGamePlatform.vue'
import SettingsLists from '@/components/Settings/SettingsLists.vue'

export default {
  name: 'ListGames',
  components: {
    CreateGamePlatform,
    SettingsLists
  },
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Load games list on mounting.
    onMounted(() => { loadGames() })

    // Load games list.
    let games = ref([])
    let paginationIndex = ref(0)
    const paginationCount = 50
    const loadGames = () => {
      // Ensure pagination index is reset.
      paginationIndex.value = 0
      // Get first batch of games.
      getGamesAll(paginationIndex.value, paginationCount)
        .then((res) => {
          games.value = res
          // Set next pagination index.
          paginationIndex.value += paginationCount
        })
    }
    const loadGamesNext = () => {
      // Check loaded games to avoid duplication.
      if (games.value) {
        // Get next batch of games.
        getGamesAll(paginationIndex.value, paginationCount)
          .then((res) => {
            games.value = games.value.concat(res)
            // Set next pagination index.
            paginationIndex.value += paginationCount
          })
      }
    }

    // Manage game platform operations.
    let createPlatformDialog = ref(false)
    const createPlatformOpen = () => {
      // Restore the data on the store.
      store.commit('resetGameSelected')
      store.commit('resetGameForm')
      // Open create dialog.
      createPlatformDialog.value = !createPlatformDialog.value
    }
    const createPlatformClose = () => {
      // Reload game list.
      loadGames()
      // Close create dialog.
      createPlatformDialog.value = !createPlatformDialog.value
    }

    // Manage search queries.
    let queryInput = ref('')
    let querySearched = ref(false)
    const querySearch = (query) => {
      // Only start search from two characters onwards.
      if (query !== '' && query.length > 1) {
        // Ensure pagination index is reset.
        paginationIndex.value = 0
        // A search has been done.
        querySearched.value = true
        // Search for games matching the query.
        getGamesAllSearch(paginationIndex.value, paginationCount, query)
          .then((res) => {
            games.value = res
            // Set next pagination index.
            paginationIndex.value += paginationCount
          })
      } else {
        if (querySearched.value) {
          queryClear()
        }
      }
    }
    const queryClear = () => {
      // A search hasn't been done yet.
      querySearched.value = false
      // Reload games list.
      loadGames()
    }

    return {
      createPlatformClose,
      createPlatformDialog,
      createPlatformOpen,
      games,
      loadGamesNext,
      queryInput,
      querySearched,
      querySearch
    }
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