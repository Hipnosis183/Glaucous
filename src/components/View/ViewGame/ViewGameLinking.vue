<template>
  <!-- View game linking dialog. -->
  <vi-overlay
    v-show="gameLinkingDialog"
    @close="gameLinkingShow()"
    :rounded="false"
    class="pos-initial z-10"
  >
    <!-- Unlink game dialog. -->
    <vi-dialog-box
      v-show="unlinkGameDialog"
      @accept="unlinkGameClose()"
      @cancel="unlinkGameOpen()"
      actions="OkCancel"
    >
      Unlink the game <b>'{{ gameInfo.gameRegions[regionIndex].title }}'</b> ?
      <br />
      It will stop being grouped with the games listed.
    </vi-dialog-box>
    <!-- Unlink linked game dialog. -->
    <vi-dialog-box
      v-show="unlinkLinkedGameDialog"
      @accept="unlinkLinkedGameClose()"
      @cancel="unlinkLinkedGameOpen()"
      actions="OkCancel"
    >
      Unlink the game <b>'{{ unlinkLinkedGameTitle }}'</b> ?
      <br />
      It will stop being grouped with the games listed.
    </vi-dialog-box>
    <!-- Unlink error dialog. -->
    <vi-dialog-box
      v-show="unlinkErrorDialog"
      @accept="unlinkErrorShow()"
    >
      This game is not linked with any other.
    </vi-dialog-box>
    <!-- Validation error dialog. -->
    <vi-dialog-box
      v-show="validationErrorDialog"
      @accept="validationErrorShow()"
    >
      Complete the required field.
    </vi-dialog-box>
    <!-- Game linking dialog. -->
    <vi-modal v-if="$store.getters.getSettingsGeneralEditMode">
      <!-- Padding. -->
      <div class="w-80" />
      <!-- Form header. -->
      <div class="flex justify-between mb-6 mx-2">
        <!-- Form title. -->
        <p class="mr-10 pt-1 text-2xl">Game Linking</p>
        <!-- Form buttons. -->
        <div class="space-x-4">
          <vi-button-icon @click="linkGame_()">
            <vi-icon class="w-6">
              <icon-add />
            </vi-icon>
          </vi-button-icon>
          <vi-button-icon @click="unlinkGameOpen()">
            <vi-icon class="w-6">
              <icon-remove />
            </vi-icon>
          </vi-button-icon>
        </div>
      </div>
      <vi-select
        v-model="querySelected"
        clearable
        placeholder="Search..."
        remote
        :remote-method="querySearch"
        class="w-full"
      >
        <vi-option
          v-for="item in queryResults"
          :key="item._id"
          :label="item.child.title + ' (' + item.releaseYear + ') - ' + item.platforms.join(' / ')"
          :value="item._id"
        >
        </vi-option>
      </vi-select>
      <div v-if="linkedGames.length > 0">
        <!-- Separator. -->
        <div class="bg-theme-200 dark:bg-theme-600 h-0.5 my-5 w-full" />
        <!-- List game playlists. -->
        <div class="font-medium space-y-2">
          <div
            v-for="game in linkedGames"
            :key="game"
            :value="game"
          >
            <vi-chip
              large
              multiline
              @clicked="$router.push({ name: 'Game', params: { id: game._id } })"
              @remove="unlinkLinkedGameOpen(game)"
            >
              {{ game.gameRegions[0].title }}
              <p class="text-sm mt-1">{{ game.platform.name }}</p>
            </vi-chip>
          </div>
        </div>
      </div>
    </vi-modal>
    <!-- Show linked games list. -->
    <ul v-else>
      <div
        v-if="linkedGames.length > 0"
        class="gap-4 grid grid-flow-row"
      >
        <li
          v-for="game in linkedGames"
          :key="game._id"
          :value="game._id"
          @click="$router.push({ name: 'Game', params: { id: game._id } })"
        >
          <!-- Game card. -->
          <vi-card-compact :gameInfo="game" />
        </li>
      </div>
      <div v-else>
        <li>
          <!-- Empty card. -->
          <vi-modal class="text-center">
            <p>No other platforms available.</p>
          </vi-modal>
        </li>
      </div>
    </ul>
  </vi-overlay>
  <!-- Open view game linking dialog. -->
  <vi-button-ui
    button-large
    @click="gameLinkingShow()"
    class="mr-2"
  >
    <h6 class="w-full">Also On</h6>
  </vi-button-ui>
</template>

<script>
// Import Vue functions.
import { onMounted, ref } from 'vue'
// Import database controllers functions.
import { getGamesLinked, getGamesLinkedSearch, linkGame, unlinkGame } from '@/database/controllers/Game'

export default {
  name: 'ViewGameLinking',
  props: {
    gameInfo: { type: Object },
    regionIndex: { type: Number }
  },
  setup(props) {
    // Load linked games on mounting.
    onMounted(() => { getLinkedGames(props.gameInfo.gamePlatforms) })

    // Get linked games.
    let linkedGames = ref([])
    let linkedGamesSearch = ref([])
    const getLinkedGames = (games) => {
      getGamesLinked(games)
        .then((res) => {
          // Set linked games, exclude the selected game.
          linkedGames.value = res.filter((res) => res._id != props.gameInfo._id)
          // Set linked games IDs for search.
          linkedGamesSearch.value = []
          res.forEach((game) => {
            linkedGamesSearch.value.push(game._id)
          })
        })
    }

    // Manage search queries.
    let queryResults = ref([])
    let querySelected = ref('')
    const querySearch = (query) => {
      // Only start search from three characters onwards.
      if (query !== '' && query.length > 2) {
        // Search for games matching the query.
        getGamesLinkedSearch(linkedGamesSearch.value, query)
          .then((res) => {
            // Store results.
            queryResults.value = res
          })
      } else {
        // Keep results empty.
        queryResults.value = []
      }
    }

    // Manage game linking.
    const linkGame_ = () => {
      // Validate required fields.
      if (!querySelected.value || linkedGamesSearch.value.includes(querySelected.value)) {
        validationErrorShow()
        return
      }
      // Link current to selected game(s).
      let gamePlatforms = { gamePlatforms: linkedGamesSearch.value }
      linkGame(gamePlatforms, querySelected.value)
        .then((res) => {
          // Reload linked games.
          getLinkedGames(res)
          // Reset query.
          queryResults.value = []
          querySelected.value = ''
        })
    }
    let validationErrorDialog = ref(false)
    const validationErrorShow = () => {
      // Toggle validation error dialog.
      validationErrorDialog.value = !validationErrorDialog.value
    }

    // Manage game unlinking.
    let unlinkGameDialog = ref(false)
    const unlinkGameOpen = () => {
      if (linkedGames.value.length > 0) {
        // Open unlink dialog.
        unlinkGameDialog.value = !unlinkGameDialog.value
      } else {
        // Open unlink error dialog.
        unlinkErrorShow()
      }
    }
    const unlinkGameClose = () => {
      // Unlink current from associated game(s).
      unlinkGame(props.gameInfo)
        .then(() => {
          // Reset linked games list.
          linkedGames.value = []
          linkedGamesSearch.value = [props.gameInfo._id]
          // Reset query.
          queryResults.value = []
          querySelected.value = ''
          // Close unlink dialog.
          unlinkGameDialog.value = !unlinkGameDialog.value
        })
    }
    let unlinkLinkedGameDialog = ref(false)
    let unlinkLinkedGameSelected = ref(null)
    let unlinkLinkedGameTitle = ref('')
    const unlinkLinkedGameOpen = (game) => {
      // Set the selected linked game to unlink.
      if (game) {
        unlinkLinkedGameSelected.value = game
        unlinkLinkedGameTitle.value = game.gameRegions[0].title
      }
      // Open unlink dialog.
      unlinkLinkedGameDialog.value = !unlinkLinkedGameDialog.value
    }
    const unlinkLinkedGameClose = () => {
      let unlinkGameValue = unlinkLinkedGameSelected.value
      // Unlink selected linked game from the rest.
      unlinkGame(unlinkGameValue)
        .then(() => {
          // Reload linked games.
          let gamesLinked = linkedGamesSearch.value.filter((res) => res != unlinkGameValue._id)
          getLinkedGames(gamesLinked)
          // Reset query.
          queryResults.value = []
          querySelected.value = ''
          // Close unlink dialog.
          unlinkLinkedGameDialog.value = !unlinkLinkedGameDialog.value
        })
    }
    let unlinkErrorDialog = ref(false)
    const unlinkErrorShow = () => {
      // Toggle unlink error dialog.
      unlinkErrorDialog.value = !unlinkErrorDialog.value
    }

    // Manage linked games.
    let gameLinkingDialog = ref(false)
    const gameLinkingShow = () => {
      // Toggle game linking dialog.
      gameLinkingDialog.value = !gameLinkingDialog.value
    }

    return {
      gameLinkingDialog,
      gameLinkingShow,
      linkGame_,
      linkedGames,
      queryResults,
      querySearch,
      querySelected,
      unlinkErrorDialog,
      unlinkErrorShow,
      unlinkGameClose,
      unlinkGameDialog,
      unlinkGameOpen,
      unlinkLinkedGameClose,
      unlinkLinkedGameDialog,
      unlinkLinkedGameOpen,
      unlinkLinkedGameSelected,
      unlinkLinkedGameTitle,
      validationErrorDialog,
      validationErrorShow
    }
  }
}
</script>

<style>
</style>