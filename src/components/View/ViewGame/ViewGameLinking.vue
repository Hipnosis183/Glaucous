<template>
  <hip-overlay>
    <!-- Unlink game dialog. -->
    <hip-dialog
      v-show="unlinkGameDialog"
      @close="unlinkGameOpen()"
      class="pos-initial z-10"
    >
      <!-- Dialog message. -->
      <p class="text-center text-lg">
        Unlink the game <b>'{{ gameInfo.gameRegions[regionIndex].title }}'</b> ?
        <br />
        It will stop being grouped with the games listed.
      </p>
      <div class="flex justify-center mt-6 space-x-4">
        <!-- Confirm game unlink. -->
        <hip-button
          :icon="true"
          @click="unlinkGameClose()"
          class="el-icon-circle-check text-2xl"
        ></hip-button>
        <!-- Cancel game unlink. -->
        <hip-button
          :icon="true"
          @click="unlinkGameOpen()"
          class="el-icon-circle-close text-2xl"
        ></hip-button>
      </div>
    </hip-dialog>
    <!-- Unlink error dialog. -->
    <hip-dialog
      v-show="unlinkErrorDialog"
      @close="unlinkErrorShow()"
      class="pos-initial z-10"
    >
      <!-- Dialog message. -->
      <p class="text-center text-lg">
        This game is not linked with any other.
      </p>
      <div class="flex justify-center mt-6 space-x-4">
        <!-- Close message. -->
        <hip-button
          :icon="true"
          @click="unlinkErrorShow()"
          class="el-icon-circle-check text-2xl"
        ></hip-button>
      </div>
    </hip-dialog>
    <!-- Validation error dialog. -->
    <hip-dialog
      v-show="validationErrorDialog"
      @close="validationErrorShow()"
      class="pos-initial z-10"
    >
      <!-- Dialog message. -->
      <p class="text-center text-lg">
        Complete the required field.
      </p>
      <div class="flex justify-center mt-6 space-x-4">
        <!-- Close message. -->
        <hip-button
          :icon="true"
          @click="validationErrorShow()"
          class="el-icon-circle-check text-2xl"
        ></hip-button>
      </div>
    </hip-dialog>
    <!-- Game linking dialog. -->
    <hip-modal
      v-show="$store.getters.getSettingsGeneralEditMode"
      class="justify-center mb-4"
    >
      <!-- Form header. -->
      <div class="flex justify-between mb-6 mx-2">
        <!-- Form title. -->
        <p class="mr-10 pt-1 text-2xl">Game Linking</p>
        <!-- Form buttons. -->
        <div class="h-10 space-x-4">
          <hip-button
            :icon="true"
            @click="linkGame_()"
            class="el-icon-circle-plus-outline text-2xl"
          ></hip-button>
          <hip-button
            :icon="true"
            @click="unlinkGameOpen()"
            class="el-icon-remove-outline text-2xl"
          ></hip-button>
        </div>
      </div>
      <hip-select
        v-model="querySelected"
        clearable
        placeholder="Search..."
        remote
        :remote-method="querySearch"
        class="w-full"
      >
        <hip-option
          v-for="item in queryResults"
          :key="item._id"
          :label="item.child.title + ' (' + item.releaseYear + ') - ' + item.platforms.join(' / ')"
          :value="item._id"
        >
        </hip-option>
      </hip-select>
    </hip-modal>
    <!-- Show linked games list. -->
    <ul>
      <div
        v-if="linkedGames.length > 0"
        class="gap-4 grid grid-flow-row"
      >
        <li
          v-for="game in linkedGames"
          :key="game._id"
          :value="game._id"
          @click="$router.push({ name: 'ViewGame', params: { id: game._id } })"
        >
          <!-- Game card. -->
          <hip-card-compact :gameInfo="game" />
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
// Import UI components.
import {
  HipButton,
  HipCardCompact,
  HipDialog,
  HipModal,
  HipOption,
  HipOverlay,
  HipSelect
} from '@/components/Component'
// Import database controllers functions.
import {
  getGamesLinked,
  getGamesLinkedSearch,
  linkGame,
  unlinkGame
} from '@/database/controllers/Game'

// Import Vue functions.
import { onMounted, ref } from 'vue'

export default {
  name: 'ViewGameLinking',
  components: {
    // UI components.
    HipButton,
    HipCardCompact,
    HipDialog,
    HipModal,
    HipOption,
    HipOverlay,
    HipSelect
  },
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
      if (!querySelected.value) {
        validationErrorShow()
        return
      }
      // Link current to selected game(s).
      linkGame(props.gameInfo, querySelected.value)
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
      // Open validation error dialog.
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
    let unlinkErrorDialog = ref(false)
    const unlinkErrorShow = () => {
      // Open unlink error dialog.
      unlinkErrorDialog.value = !unlinkErrorDialog.value
    }

    return {
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
      validationErrorDialog,
      validationErrorShow
    }
  }
}
</script>

<style>
</style>