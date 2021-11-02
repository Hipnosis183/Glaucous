<template>
  <div>
    <!-- Navigation bar. -->
    <vi-nav-bar :title="$route.params.id + ($route.params.id == '1' ? ' Player' : ' Players') + ' Games'">
      <!-- Search bar. -->
      <div class="flex-shrink-0 ml-2 my-auto w-80">
        <vi-input
          v-model="queryInput"
          icon-prefix="icon-search"
          placeholder="Search..."
          remote
          :remote-method="querySearch"
        />
      </div>
      <!-- List settings. -->
      <settings-lists />
    </vi-nav-bar>
    <!-- Show games list. -->
    <div class="flex flex-col max-h-content min-h-content overflow-hidden">
      <div
        class="flex-1 overflow-y-scroll"
        :class="$store.getters.getSettingsListsContentSpacing ? 'p-4 pr-1' : 'p-1 pr-0 small-scrollbar'"
      >
        <vi-list
          v-if="games.length > 0"
          :list-display="$store.getters.getSettingsListsDisplayMode"
          :remote-method="loadGamesNext"
        >
          <li
            v-for="game in games"
            :key="game._id"
            :value="game._id"
            @click="$router.push({ name: 'Game', params: { id: game._id } })"
          >
            <!-- Game cards. -->
            <vi-card-grid
              v-if="$store.getters.getSettingsListsDisplayMode == 0"
              :game-info="game"
            />
            <vi-card-list
              v-else-if="$store.getters.getSettingsListsDisplayMode == 1"
              :game-info="game"
            />
            <vi-card-compact
              v-else-if="$store.getters.getSettingsListsDisplayMode == 2"
              :game-info="game"
            />
          </li>
        </vi-list>
        <div
          v-else-if="querySearched"
          class="flex h-content w-full"
        >
          <p class="m-auto">No games found.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import Vue functions.
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
// Import database controllers functions.
import { getGamesPlayers } from '@/database/controllers/Game'
// Import form components.
import SettingsLists from '@/components/Settings/SettingsLists.vue'

export default {
  name: 'ViewPlayers',
  components: {
    SettingsLists
  },
  setup() {
    // Instantiate Vue elements.
    const route = useRoute()

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
      getGamesPlayers(route.params.id, paginationIndex.value, paginationCount)
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
        getGamesPlayers(route.params.id, paginationIndex.value, paginationCount)
          .then((res) => {
            games.value = games.value.concat(res)
            // Set next pagination index.
            paginationIndex.value += paginationCount
          })
      }
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
        getGamesPlayers(route.params.id, paginationIndex.value, paginationCount, query)
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
  height: calc(100vh - 5.5rem);
}
.min-h-content {
  min-height: calc(100vh - 3.5rem);
}
.max-h-content {
  max-height: calc(100vh - 3.5rem);
}
</style>