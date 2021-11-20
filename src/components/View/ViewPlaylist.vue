<template>
  <div>
    <!-- Edit playlist dialog. -->
    <edit-playlist
      v-show="editPlaylistDialog"
      @close="editPlaylistClose()"
    />
    <!-- Delete playlist dialog. -->
    <vi-dialog-box
      v-show="deletePlaylistDialog"
      @accept="deletePlaylistClose()"
      @cancel="deletePlaylistOpen()"
      dialog-actions="OkCancel"
    >
      Delete playlist <b>'{{ playlist.name }}'</b> ?
    </vi-dialog-box>
    <!-- Navigation bar. -->
    <vi-nav-bar :nav-title="playlist.name">
      <div class="flex items-center ml-2 space-x-1">
        <!-- Open edit playlist dialog. -->
        <vi-button-nb
          button-icon="icon-edit"
          @click="editPlaylistOpen()"
        />
        <!-- Open delete playlist dialog. -->
        <vi-button-nb
          button-icon="icon-remove"
          @click="deletePlaylistOpen()"
        />
      </div>
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
      <settings-lists />
    </vi-nav-bar>
    <!-- Show playlist's games list. -->
    <div class="flex flex-col max-h-content min-h-content overflow-hidden">
      <div
        class="flex-1 overflow-y-scroll"
        :class="$store.getters.getSettingsListsContentSpacing ? 'p-4 pr-1' : 'p-1 pr-0 small-scrollbar'"
      >
        <vi-list
          v-if="playlist.games.length > 0"
          :list-display="$store.getters.getSettingsListsDisplayMode"
          :list-remote-method="loadPlaylistNext"
        >
          <li
            v-for="game in playlist.games"
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
import EditPlaylist from '@/components/Edit/EditPlaylist.vue'
import SettingsLists from '@/components/Settings/SettingsLists.vue'

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
  height: calc(100vh - 5.5rem);
}
.min-h-content {
  min-height: calc(100vh - 3.5rem);
}
.max-h-content {
  max-height: calc(100vh - 3.5rem);
}
</style>