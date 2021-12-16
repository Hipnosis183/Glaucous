<template>
  <div>
    <!-- Navigation bar. -->
    <vi-nav-bar
      nav-title="Favorites"
      :nav-subtitle="favorites.count + ' elements'"
    >
      <!-- Search bar. -->
      <div class="flex-shrink-0 ml-2 my-auto w-80">
        <vi-input
          v-model="queryInput"
          input-icon-prefix="icon-search"
          input-placeholder="Search..."
          input-remote
          :input-remote-method="querySearch"
        />
      </div>
      <!-- List settings. -->
      <list-settings />
    </vi-nav-bar>
    <!-- Show games list. -->
    <div class="flex flex-col max-h-content min-h-content overflow-hidden">
      <vi-list
        v-if="favorites.games.length > 0"
        :list-display="$store.getters.getSettingsListsDisplayMode"
        :list-remote-method="loadGamesNext"
      >
        <li
          v-for="game in favorites.games"
          :key="game._id"
          :value="game._id"
          @click="$router.push({ name: 'Game', params: { id: game._id } })"
        >
          <!-- Game cards. -->
          <vi-card-grid
            v-if="$store.getters.getSettingsListsDisplayMode == 1"
            :game-info="game"
          />
          <vi-card-list
            v-else-if="$store.getters.getSettingsListsDisplayMode == 2"
            :game-info="game"
          />
          <vi-card-compact
            v-else-if="$store.getters.getSettingsListsDisplayMode == 3"
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
</template>

<script>
// Import Vue functions.
import { onMounted, ref } from 'vue'
// Import database controllers functions.
import { getGamesFavorited, getGamesFavoritedCount } from '@/database/controllers/Game'
// Import form components.
import ListSettings from '@/components/List/ListSettings/ListSettings.vue'

export default {
  name: 'Favorites',
  components: {
    ListSettings
  },
  setup() {
    // Load games list on mounting.
    onMounted(() => { loadGames() })

    // Load games list.
    let favorites = ref({
      count: null,
      games: []
    })
    let paginationIndex = ref(0)
    const paginationCount = 50
    const loadGames = () => {
      // Ensure pagination index is reset.
      paginationIndex.value = 0
      // Get first batch of games.
      getGamesFavorited(paginationIndex.value, paginationCount)
        .then((res) => {
          favorites.value.games = res
          // Set next pagination index.
          paginationIndex.value += paginationCount
        })
      // Get games count.
      getGamesFavoritedCount()
        .then((res) => { favorites.value.count = res })
    }
    const loadGamesNext = () => {
      // Check loaded games to avoid duplication.
      if (favorites.value.games) {
        // Get next batch of games.
        getGamesFavorited(paginationIndex.value, paginationCount)
          .then((res) => {
            favorites.value.games = favorites.value.games.concat(res)
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
        getGamesFavorited(paginationIndex.value, paginationCount, query)
          .then((res) => {
            favorites.value.games = res
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
      favorites,
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