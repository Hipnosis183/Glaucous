<template>
  <hip-overlay>
    <!-- Unlink game dialog. -->
    <hip-dialog
      v-show="dialog.unlinkGame"
      class="top-0 left-14 z-10"
      @close="unlinkGameOpen()"
    >
      <!-- Dialog message. -->
      <p class="text-center text-lg">
        Unlink the game <b>'{{ gameInfo.gameRegions[regionIndex].title }}'</b> ?
        <br />
        It will stop being grouped with the games listed.
      </p>
      <div class="flex space-x-4 mt-6 justify-center">
        <!-- Confirm game unlink. -->
        <hip-button
          class="el-icon-circle-check text-2xl"
          @click="unlinkGameClose()"
          :icon="true"
        ></hip-button>
        <!-- Cancel game unlink. -->
        <hip-button
          class="el-icon-circle-close text-2xl"
          @click="unlinkGameOpen()"
          :icon="true"
        ></hip-button>
      </div>
    </hip-dialog>
    <!-- Validation error dialog. -->
    <hip-dialog
      v-show="dialog.validationError"
      class="top-0 left-14 z-10"
      @close="validationError()"
    >
      <!-- Dialog message. -->
      <p class="text-center text-lg">
        Complete the required field.
      </p>
      <div class="flex space-x-4 mt-6 justify-center">
        <!-- Close message. -->
        <hip-button
          class="el-icon-circle-check text-2xl"
          @click="validationError()"
          :icon="true"
        ></hip-button>
      </div>
    </hip-dialog>
    <!-- Game linking dialog. -->
    <hip-modal
      v-show="$store.state.editMode"
      class="justify-center pt-8 mb-4"
    >
      <!-- Form header. -->
      <div class="flex justify-between mb-6 mx-2">
        <!-- Form title. -->
        <h1 class="text-2xl pt-1 mr-10">Game Linking</h1>
        <!-- Form buttons. -->
        <div class="h-10 space-x-4">
          <hip-button
            class="el-icon-circle-plus-outline text-2xl"
            @click="linkGame()"
            :icon="true"
          ></hip-button>
          <hip-button
            class="el-icon-remove-outline text-2xl"
            @click="unlinkGameOpen()"
            :icon="true"
          ></hip-button>
        </div>
      </div>
      <!-- Game search bar. -->
      <el-select
        v-model="querySelected"
        class="w-full"
        filterable
        placeholder="Required"
        remote
        :remote-method="querySearch"
        reserve-keyword
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
    </hip-modal>
    <!-- Show linked games list. -->
    <ul>
      <div
        v-if="linkedGames.length > 0"
        class="grid grid-flow-row gap-4"
      >
        <li
          class="inline-flex"
          v-for="game in linkedGames"
          :key="game._id"
          :value="game._id"
          @click="$router.push({ name: 'ViewGame', params: { id: game._id } })"
        >
          <!-- Game card image. -->
          <img
            v-if="getImage(game)"
            class="h-32 ar-square rounded-l-xl object-cover cursor-pointer"
            :src="'file://' + getImage(game)"
          >
          <div
            v-else
            class="h-32 ar-square rounded-l-xl cursor-pointer items-center bg-gray-100 border-2 border-gray-200"
          >
            <div class="flex w-full h-full items-center">
              <div class="el-icon-picture text-6xl text-gray-300 m-auto"></div>
            </div>
          </div>
          <!-- Game card information. -->
          <hip-card-sq class="w-full rounded-l-none">
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
// Import functions from modules.
import { app } from '@electron/remote'
import { readdirSync } from 'fs-extra'
// Import UI components.
import {
  HipButton,
  HipCardSq,
  HipDialog,
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
    HipDialog,
    HipModal,
    HipOverlay
  },
  props: [
    'gameInfo',
    'regionIndex'
  ],
  data() {
    return {
      linkedGames: [],
      queryResults: [],
      querySelected: [],
      dialog: {
        unlinkGame: false,
        validationError: false
      },
    }
  },
  emits: ['reload'],
  methods: {
    // Game linking operations.
    linkGame() {
      // Validate required fields.
      if (!this.querySelected) {
        this.validationError()
        return
      }
      // Link current to selected game(s).
      linkGame(this.gameInfo, this.querySelected).then(() => {
        // Reload updated game entry.
        this.$emit('reload')
        // Reset query.
        this.queryResults = []
        this.querySelected = ''
      })
    },
    unlinkGameOpen() {
      // Open unlink dialog.
      this.dialog.unlinkGame = !this.dialog.unlinkGame
    },
    unlinkGameClose() {
      // Unlink current from associated game(s).
      unlinkGame(this.gameInfo).then(() => {
        // Reload updated game entry.
        this.$emit('reload')
        // Reset query.
        this.queryResults = []
        this.querySelected = ''
        // Close unlink dialog.
        this.dialog.unlinkGame = !this.dialog.unlinkGame
      })
    },
    // Query searching.
    querySearch(query) {
      // Only start search from three characters onwards.
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
    },
    // Show validation errors.
    validationError() {
      // Open error dialog.
      this.dialog.validationError = !this.dialog.validationError
    },
    // Get games cover image.
    getImage(game) {
      // Set the image directory path of the game region.
      let imagePath = app.getAppPath() + '/images/' + game._id + '/' + game.gameRegions[0]._id
      // Load images filenames and filter the cover image file.
      let imageFile = readdirSync(imagePath).filter(res => res.startsWith('0'.repeat(8)))[0]
      // Return the cover if it exists.
      return imageFile ? (imagePath + '/' + imageFile) : false
    },
  },
  mounted() {
    // Load linked games.
    getGames(this.gameInfo.gamePlatforms)
      // Exclude the selected game.
      .then(res => this.linkedGames = res.filter(res => res._id != this.gameInfo._id))
  }
}
</script>

<style>
</style>
