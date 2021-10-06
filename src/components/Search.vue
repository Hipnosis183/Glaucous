<template>
  <vi-overlay>
    <div class="space-y-4 w-search">
      <!-- Search dialog. -->
      <vi-modal class="rounded-3xl">
        <div class="flex justify-between space-x-4">
          <!-- Search bar. -->
          <div class="flex space-x-2 w-full">
            <!-- Search query input. -->
            <vi-input
              v-model="queryInput"
              clearable
              icon-prefix="icon-search"
              placeholder="Search..."
            />
            <!-- Search category select. -->
            <vi-select
              v-model="searchSelect"
              class="w-max"
            >
              <vi-option
                v-for="item in searchOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </vi-option>
            </vi-select>
          </div>
          <!-- Add query button. -->
          <vi-button-icon @click="queryAdd(queryInput.trim(), searchSelect)">
            <vi-icon class="w-6">
              <icon-add />
            </vi-icon>
          </vi-button-icon>
          <!-- Remove query button. -->
          <vi-button-icon @click="$emit('close')">
            <vi-icon class="w-6">
              <icon-close />
            </vi-icon>
          </vi-button-icon>
        </div>
        <!-- Search filters. -->
        <ul
          v-if="queryFilters.length > 0"
          class="flex flex-wrap mt-2"
        >
          <li
            v-for="game in queryFilters"
            :key="game.value"
            :value="game.value"
            class="mr-2 mt-2"
          >
            <!-- Filter chip. -->
            <vi-chip @remove="queryRemove(game.label)">
              {{ game.label }}: {{ game.value }}
            </vi-chip>
          </li>
        </ul>
      </vi-modal>
      <!-- Search results. -->
      <vi-list
        v-if="queryResults.length > 0"
        :listDisplay="1"
        :remote-method="querySearchNext"
      >
        <li
          v-for="game in queryResults"
          :key="game._id"
          :value="game._id"
          @click="gameOpen(game._id)"
        >
          <!-- Game card. -->
          <vi-card-list :gameInfo="game" />
        </li>
      </vi-list>
    </div>
  </vi-overlay>
</template>

<script>
// Import Vue functions.
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// Import database controllers functions.
import { getGamesSearch } from '@/database/controllers/Game'

export default {
  name: 'Search',
  setup(props, { emit }) {
    // Instantiate Vue elements.
    const router = useRouter()

    // Manage search select and options data.
    let searchSelect = ref('title')
    const searchOptions = [
      { label: 'Title', value: 'title' },
      { label: 'Platform', value: 'platform' },
      { label: 'Developer', value: 'developer' },
      { label: 'Year', value: 'releaseYear' }
    ]

    // Go to the selected game page.
    const gameOpen = (game) => {
      router.push({ name: 'Game', params: { id: game } })
      emit('close')
    }

    // Manage search queries.
    const paginationCount = 50
    let paginationIndex = ref(0)
    let queryInput = ref('')
    let queryFilters = ref([])
    let queryResults = ref([])
    let queryObject = ref({
      title: '',
      platform: '',
      developer: '',
      releaseYear: ''
    })
    const querySearch = () => {
      // Get games matching the query.
      getGamesSearch(paginationIndex.value, paginationCount, queryObject.value)
        .then((res) => {
          // Store results.
          queryResults.value = res
          // Set next pagination index.
          paginationIndex.value += paginationCount
        })
    }
    const querySearchNext = () => {
      // Check game results to avoid replacement.
      if (queryResults.value.length > paginationIndex.value - 1) {
        // Get next batch of games.
        getGamesSearch(paginationIndex.value, paginationCount, queryObject.value)
          .then((res) => {
            // Append results to already stored.
            queryResults.value = queryResults.value.concat(res)
            // Set next pagination index.
            paginationIndex.value += paginationCount
          })
      }
    }
    const queryAdd = (input, select) => {
      // Only search with a minimum of two characters.
      if (input !== '' && select !== '' && input.length > 1) {
        // Set the selected search query field.
        switch (select) {
          // Set title search parameter.
          case 'title': {
            if (queryObject.value.title != '') return
            else queryObject.value.title = input; break
          }
          // Set platform search parameter.
          case 'platform': {
            if (queryObject.value.platform != '') return
            else queryObject.value.platform = input; break
          }
          // Set developer search parameter.
          case 'developer': {
            if (queryObject.value.developer != '') return
            else queryObject.value.developer = input; break
          }
          // Set release year search parameter.
          case 'releaseYear': {
            if (queryObject.value.releaseYear != '') return
            else queryObject.value.releaseYear = input; break
          }
        }
        // Add query as a search filter to show in the UI.
        queryFilters.value.push({ label: select, value: input })
        // Ensure pagination index is reset.
        paginationIndex.value = 0
        // Make search with newly added filter.
        querySearch()
        // Reset search input.
        queryInput.value = ''
      }
    }
    const queryRemove = (name) => {
      // Remove the selected search query field.
      switch (name) {
        // Remove title search parameter.
        case 'title': queryObject.value.title = ''
          break
        // Remove platform search parameter.
        case 'platform': queryObject.value.platform = ''
          break
        // Remove developer search parameter.
        case 'developer': queryObject.value.developer = ''
          break
        // Remove release year search parameter.
        case 'releaseYear': queryObject.value.releaseYear = ''
          break
      }
      // Remove query from search filters.
      let queryIndex = queryFilters.value.findIndex(res => res.label == name)
      queryFilters.value.splice(queryIndex, 1)
      // Ensure pagination index is reset.
      paginationIndex.value = 0
      // Control filters to avoid an empty search, getting all games.
      if (queryFilters.value.length) {
        querySearch()
      } else {
        // Empty results.
        queryResults.value = []
      }
    }

    return {
      gameOpen,
      queryInput,
      queryFilters,
      queryResults,
      queryAdd,
      queryRemove,
      querySearch,
      querySearchNext,
      searchOptions,
      searchSelect
    }
  }
}
</script>

<style scoped>
/* Styling. */
.w-search {
  width: calc(100vw / 1.6);
}
</style>