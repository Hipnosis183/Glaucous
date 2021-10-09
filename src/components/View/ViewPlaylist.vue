<template>
  <div>
    <!-- Edit playlist dialog. -->
    <edit-playlist
      v-show="editPlaylistDialog"
      @close="editPlaylistClose()"
    />
    <!-- Delete playlist dialog. -->
    <vi-dialog
      v-show="deletePlaylistDialog"
      @close="deletePlaylistOpen()"
      class="z-10"
    >
      <!-- Dialog message. -->
      <p class="text-center text-lg">
        Delete playlist <b>'{{ playlist.name }}'</b> ?
      </p>
      <div class="flex justify-center mt-6 space-x-4">
        <!-- Confirm playlist deletion. -->
        <vi-button-icon @click="deletePlaylistClose()">
          <vi-icon class="w-6">
            <icon-check />
          </vi-icon>
        </vi-button-icon>
        <!-- Cancel playlist deletion. -->
        <vi-button-icon @click="deletePlaylistOpen()">
          <vi-icon class="w-6">
            <icon-close />
          </vi-icon>
        </vi-button-icon>
      </div>
    </vi-dialog>
    <!-- Navigation bar. -->
    <vi-nav-bar :title="playlist.name">
      <!-- Open edit playlist dialog. -->
      <vi-button-nb
        v-show="$store.getters.getSettingsGeneralEditMode"
        @click="editPlaylistOpen()"
      >
        <vi-icon class="w-6">
          <icon-edit />
        </vi-icon>
      </vi-button-nb>
      <!-- Open delete playlist dialog. -->
      <vi-button-nb
        v-show="$store.getters.getSettingsGeneralEditMode"
        @click="deletePlaylistOpen()"
      >
        <vi-icon class="w-6">
          <icon-remove />
        </vi-icon>
      </vi-button-nb>
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
      <settings-lists gameSettings />
    </vi-nav-bar>
    <!-- Show playlist's games list. -->
    <div class="h-content m-6">
      <div class="flex flex-col max-h-content min-h-content overflow-hidden">
        <div class="flex-1 no-scrollbar overflow-y-scroll rounded-xl">
          <vi-list
            v-if="playlist.games.length > 0"
            :listDisplay="$store.getters.getSettingsListsListDisplay"
            :remote-method="loadPlaylistNext"
          >
            <li
              v-for="game in playlist.games"
              :key="game._id"
              :value="game._id"
              @click="$router.push({ name: 'Game', params: { id: game._id } })"
            >
              <!-- Game cards. -->
              <vi-card-grid
                v-if="$store.getters.getSettingsListsListDisplay == 0"
                :gameInfo="game"
              />
              <vi-card-list
                v-else-if="$store.getters.getSettingsListsListDisplay == 1"
                :gameInfo="game"
              />
              <vi-card-compact
                v-else-if="$store.getters.getSettingsListsListDisplay == 2"
                :gameInfo="game"
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
  </div>
</template>

<script>
// Import Vue functions.
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
// Import database controllers functions.
import { getPlaylist, deletePlaylist } from '@/database/controllers/User'
import { getGamesPlaylist } from '@/database/controllers/Game'
// Import form components.
import EditPlaylist from '../Edit/EditPlaylist.vue'
import SettingsLists from '../Settings/SettingsLists.vue'

export default {
  name: 'ViewPlaylist',
  components: {
    EditPlaylist,
    SettingsLists
  },
  setup() {
    // Instantiate Vue elements.
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    // Load playlist games list on mounting.
    onMounted(() => { loadPlaylist() })

    // Load and manage playlist information.
    let playlist = ref({
      name: null,
      games: []
    })
    const loadPlaylist = () => {
      // Ensure pagination index is reset.
      paginationIndex.value = 0
      // Get playlist.
      getPlaylist(route.params.id)
        .then((res) => playlist.value.name = res.name)
      // Get playlist's games.
      getGamesPlaylist(route.params.id, paginationIndex.value, paginationCount)
        .then((res) => {
          playlist.value.games = res
          // Set next pagination index.
          paginationIndex.value += paginationCount
        })
    }
    const loadPlaylistNext = () => {
      // Check loaded games to avoid duplication.
      if (playlist.value.games) {
        // Get next batch of games.
        getGamesPlaylist(route.params.id, paginationIndex.value, paginationCount)
          .then((res) => {
            playlist.value.games = playlist.value.games.concat(res)
            // Set next pagination index.
            paginationIndex.value += paginationCount
          })
      }
    }

    // Manage playlist operations.
    let editPlaylistDialog = ref(false)
    const editPlaylistOpen = () => {
      // Restore the data on the store.
      store.commit('resetPlaylistForm')
      // Save current playlist ID into the store.
      store.state.playlistSelected = route.params.id
      // Save data of the current playlist into the store.
      store.commit('setPlaylistName', playlist.value.name)
      // Open edit dialog.
      editPlaylistDialog.value = !editPlaylistDialog.value
    }
    const editPlaylistClose = () => {
      // Reload playlist.
      loadPlaylist()
      // Close edit dialog.
      editPlaylistDialog.value = !editPlaylistDialog.value
    }
    let deletePlaylistDialog = ref(false)
    const deletePlaylistOpen = () => {
      // Open delete dialog.
      deletePlaylistDialog.value = !deletePlaylistDialog.value
    }
    const deletePlaylistClose = () => {
      // Delete playlist.
      deletePlaylist(route.params.id)
        .then(() => router.back())
    }

    // Manage search queries.
    const paginationCount = 50
    let paginationIndex = ref(0)
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
        getGamesPlaylist(route.params.id, paginationIndex.value, paginationCount, query)
          .then((res) => {
            playlist.value.games = res
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
      loadPlaylist()
    }

    return {
      deletePlaylistClose,
      deletePlaylistDialog,
      deletePlaylistOpen,
      playlist,
      editPlaylistClose,
      editPlaylistDialog,
      editPlaylistOpen,
      loadPlaylistNext,
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