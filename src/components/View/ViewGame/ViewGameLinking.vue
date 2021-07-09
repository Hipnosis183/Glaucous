<template>
  <hip-overlay>
    <!-- Game linking dialog. -->
    <hip-modal class="flex justify-center pt-8 mb-4">
      <!-- Game search bar. -->
      <el-select
        class="w-80"
        filterable
        remote
        :remote-method="querySearch"
        reserve-keyword
        v-model="querySelected"
      >
        <!-- Game search results. -->
        <el-option
          v-for="item in queryResults"
          :key="item._id"
          :label="item.child.title + ' (' + item.releaseYear + ') - ' + item.platforms.join(' / ')"
          :value="item._id"
        >
        </el-option>
      </el-select>
      <!-- Form buttons. -->
      <div class="flex space-x-4 mt-4 justify-center">
        <hip-button @click="linkGame()">Link</hip-button>
        <hip-button @click="unlinkGame()">Unlink</hip-button>
      </div>
    </hip-modal>
    <!-- Show linked games list. -->
    <ul class="grid grid-flow-row gap-4">
      <li
        v-for="game in linkedGames"
        :key="game._id"
        :value="game._id"
        @click="$router.push({ name: 'ViewGame', params: { id: game._id } })"
      >
        <!-- Game card. -->
        <hip-card-sq>
          <div class="mb-2">
            <h1 class="text-xl text-blue-800 font-semibold">{{ game.gameRegions[0].title }}</h1>
            <h2 class="text-base text-blue-600 font-normal">{{ game.gameRegions[0].subTitle }}</h2>
          </div>
          <div class="mb-2">
            <h2 class="text-base text-gray-600 italic font-normal">{{ game.gameRegions[0].originalTitle }}</h2>
          </div>
          <h3 class="text-base text-gray-600 font-normal">{{ game.platform.name }} - {{ game.releaseYear }}</h3>
        </hip-card-sq>
      </li>
    </ul>
  </hip-overlay>
</template>

<script>
// Import UI components.
import {
  HipButton,
  HipCardSq,
  HipModal,
  HipOverlay
} from '../../Component'
// Import database controllers functions.
import {
  getGames,
  searchGameByTitle,
  linkGame,
  unlinkGame
} from '../../../database/controllers/Game'

export default {
  name: 'ViewGameLinking',
  components: {
    // UI components.
    HipButton,
    HipCardSq,
    HipModal,
    HipOverlay
  },
  props: [
    'gameInfo'
  ],
  data() {
    return {
      linkedGames: [],
      queryResults: [],
      querySelected: [],
    }
  },
  methods: {
    // Game linking operations.
    linkGame() {
      // Link current to selected game(s).
      linkGame(this.gameInfo, this.querySelected).then(() => {
        // Reload updated game entry.
        this.$emit('reload')
        // Reset query.
        this.queryResults = []
        this.querySelected = ''
      })
    },
    unlinkGame() {
      // Unlink current from associated game(s).
      unlinkGame(this.gameInfo).then(() => {
        // Reload updated game entry.
        this.$emit('reload')
        // Reset query.
        this.queryResults = []
        this.querySelected = ''
      })
    },
    // Query searching.
    querySearch(query) {
      // Only start search from two characters onwards.
      if (query !== '' && query.length > 2) {
        // Search for games matching the query.
        searchGameByTitle(query, this.gameInfo.gamePlatforms)
          .then(res => {
            // Store results.
            this.queryResults = res
          })
      } else {
        // Keep results empty.
        this.queryResults = []
      }
    }
  },
  mounted() {
    // Load linked games.
    getGames(this.gameInfo.gamePlatforms)
      .then(res => this.linkedGames = res)
  }
}
</script>

<style>
</style>
