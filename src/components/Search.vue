<template>
  <hip-overlay>
    <div class="space-y-4 w-search">
      <!-- Search dialog. -->
      <hip-modal class="justify-center">
        <div class="flex justify-between space-x-4">
          <!-- Search bar. -->
          <el-input
            v-model="queryInput"
            clearable
            placeholder="Search..."
            prefix-icon="el-icon-search"
          >
            <!-- Search category select. -->
            <template #append>
              <el-select
                v-model="searchSelect"
                class="w-40"
              >
                <el-option
                  v-for="item in searchOptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                  <p>{{ item.name }}</p>
                </el-option>
              </el-select>
            </template>
          </el-input>
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
        <ul v-if="queryFilters.length > 0">
          <li
            v-for="game in queryFilters"
            :key="game.value"
            :value="game.value"
            @click="queryRemove(game.name)"
          >
            <!-- Filter chip. -->
            <p>{{ game.name }}: {{ game.value }}</p>
          </li>
        </ul>
      </hip-modal>
      <!-- Search results. -->
      <ul
        v-if="queryResults.length > 0"
        v-infinite-scroll="querySearchNext"
        class="gap-4 grid grid-flow-row"
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
      </ul>
    </div>
  </hip-overlay>
</template>

<script>
// Import functions from modules.
import { app } from '@electron/remote'
import { readdirSync } from 'fs-extra'
// Import UI components.
import {
  HipButton,
  HipCardCompact,
  HipModal,
  HipOverlay
} from './Component'
// Import database controllers functions.
import { getGamesSearch } from '../database/controllers/Game'

export default {
  components: {
    // UI components.
    HipButton,
    HipCardCompact,
    HipModal,
    HipOverlay
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
        { name: 'Title', value: 'title' },
        { name: 'Platform', value: 'platform' },
        { name: 'Developer', value: 'developer' },
        { name: 'Year', value: 'releaseYear' }
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
        this.queryFilters.push({ name: select, value: input })
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
      let queryIndex = this.queryFilters.findIndex(res => res.name == name)
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
  width: calc(100vw - 20rem);
}
</style>