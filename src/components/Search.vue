<template>
  <hip-overlay>
    <div class="space-y-4 w-search">
      <!-- Search dialog. -->
      <hip-modal class="rounded-3xl">
        <div class="flex justify-between space-x-4">
          <!-- Search bar. -->
          <div class="flex space-x-2 w-full">
            <!-- Search query input. -->
            <hip-input
              v-model="queryInput"
              clearable
              icon-prefix="el-icon-search"
              placeholder="Search..."
            />
            <!-- Search category select. -->
            <hip-select
              v-model="searchSelect"
              class="w-max"
            >
              <hip-option
                v-for="item in searchOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </hip-option>
            </hip-select>
          </div>
          <!-- Add query button. -->
          <hip-button
            :icon="true"
            @click="queryAdd(queryInput.trim(), searchSelect)"
            class="el-icon-circle-plus-outline text-2xl"
          ></hip-button>
          <!-- Remove query button. -->
          <hip-button
            :icon="true"
            @click="$emit('close')"
            class="el-icon-circle-close text-2xl"
          ></hip-button>
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
            <hip-chip @remove="queryRemove(game.label)">
              {{ game.label }}: {{ game.value }}
            </hip-chip>
          </li>
        </ul>
      </hip-modal>
      <!-- Search results. -->
      <hip-list
        v-if="queryResults.length > 0"
        :remote-method="querySearchNext"
      >
        <li
          v-for="game in queryResults"
          :key="game._id"
          :value="game._id"
          @click="viewGame(game._id)"
        >
          <!-- Game card. -->
          <hip-card-compact
            :gameInfo="game"
            :gameImage="getImage(game)"
          />
        </li>
      </hip-list>
    </div>
  </hip-overlay>
</template>

<script>
// Import UI components.
import {
  HipButton,
  HipCardCompact,
  HipChip,
  HipInput,
  HipList,
  HipModal,
  HipOption,
  HipOverlay,
  HipSelect
} from './Component'
// Import database controllers functions.
import {
  getGamesSearch,
  getImage
} from '../database/controllers/Game'

export default {
  components: {
    // UI components.
    HipButton,
    HipCardCompact,
    HipChip,
    HipInput,
    HipList,
    HipModal,
    HipOption,
    HipOverlay,
    HipSelect
  },
  data() {
    return {
      queryInput: '',
      queryFilters: [],
      queryResults: [],
      queryObject: {
        title: '',
        platform: '',
        developer: '',
        releaseYear: ''
      },
      searchSelect: 'title',
      searchOptions: [
        { label: 'Title', value: 'title' },
        { label: 'Platform', value: 'platform' },
        { label: 'Developer', value: 'developer' },
        { label: 'Year', value: 'releaseYear' }
      ],
      pagination: {
        index: 0,
        count: 50
      },
    }
  },
  methods: {
    // Query searching.
    querySearch() {
      // Get games matching the query.
      getGamesSearch(this.pagination.index, this.pagination.count, this.queryObject)
        .then(res => {
          // Store results.
          this.queryResults = res
          // Set next pagination index.
          this.pagination.index += this.pagination.count
        })
    },
    querySearchNext() {
      // Check game results to avoid replacement.
      if (this.queryResults.length > this.pagination.index - 1) {
        // Get next batch of games.
        getGamesSearch(this.pagination.index, this.pagination.count, this.queryObject)
          .then(res => {
            // Append results to already stored.
            this.queryResults = this.queryResults.concat(res)
            // Set next pagination index.
            this.pagination.index += this.pagination.count
          })
      }
    },
    queryAdd(input, select) {
      // Only search with a minimum of two characters.
      if (input !== '' && select !== '' && input.length > 1) {
        // Set the selected search query field.
        switch (select) {
          // Set title search parameter.
          case 'title': {
            if (this.queryObject.title != '') return
            else this.queryObject.title = input; break
          }
          // Set platform search parameter.
          case 'platform': {
            if (this.queryObject.platform != '') return
            else this.queryObject.platform = input; break
          }
          // Set developer search parameter.
          case 'developer': {
            if (this.queryObject.developer != '') return
            else this.queryObject.developer = input; break
          }
          // Set release year search parameter.
          case 'releaseYear': {
            if (this.queryObject.releaseYear != '') return
            else this.queryObject.releaseYear = input; break
          }
        }
        // Add query as a search filter to show in the UI.
        this.queryFilters.push({ label: select, value: input })
        // Ensure pagination index is reset.
        this.pagination.index = 0
        // Make search with newly added filter.
        this.querySearch()
        // Reset search input.
        this.queryInput = ''
      }
    },
    queryRemove(name) {
      // Remove the selected search query field.
      switch (name) {
        // Remove title search parameter.
        case 'title': this.queryObject.title = ''; break
        // Remove platform search parameter.
        case 'platform': this.queryObject.platform = ''; break
        // Remove developer search parameter.
        case 'developer': this.queryObject.developer = ''; break
        // Remove release year search parameter.
        case 'releaseYear': this.queryObject.releaseYear = ''; break
      }
      // Remove query from search filters.
      let queryIndex = this.queryFilters.findIndex(res => res.label == name)
      this.queryFilters.splice(queryIndex, 1)
      // Ensure pagination index is reset.
      this.pagination.index = 0
      // Control filters to avoid an empty search, getting all games.
      if (this.queryFilters.length) {
        this.querySearch()
      } else {
        // Empty results.
        this.queryResults = []
      }
    },
    // Get games cover image.
    getImage(game) {
      return getImage(game)
    },
    // Go to the selected game page.
    viewGame(game) {
      this.$router.push({ name: 'ViewGame', params: { id: game } })
      this.$emit('close')
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