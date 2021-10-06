<template>
  <div>
    <!-- Create playlist dialog. -->
    <vi-dialog
      v-show="createPlaylistDialog"
      @close="createPlaylistClose()"
      class="z-10"
    >
      <!-- Insert create playlist form component. -->
      <create-playlist @close="createPlaylistClose()" />
    </vi-dialog>
    <!-- Navigation bar. -->
    <vi-nav-bar title="Playlists">
      <!-- Open create playlist dialog. -->
      <vi-button-nb
        v-show="$store.getters.getSettingsGeneralEditMode"
        @click="createPlaylistOpen()"
      >
        <vi-icon class="w-6">
          <icon-add />
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
    </vi-nav-bar>
    <!-- Show playlists list. -->
    <div class="h-content m-6">
      <div class="flex flex-col max-h-content min-h-content overflow-hidden">
        <div class="flex-1 no-scrollbar overflow-y-scroll rounded-xl">
          <vi-list
            :listDisplay="1"
            :remote-method="loadPlaylistNext"
          >
            <li
              v-for="playlist in playlists"
              :key="playlist._id"
              :value="playlist._id"
              @click="$router.push({ name: 'Playlist', params: { id: playlist._id } })"
            >
              <!-- Playlist card. -->
              <vi-card>
                <div class="flex items-center p-4 space-x-2">
                  <h1 class="font-medium">{{ playlist.name }}</h1>
                  <h3 class="pt-0.5 text-sm">{{ playlist.games.length }} {{ playlist.games.length == 1 ? 'Title' : 'Titles' }}</h3>
                </div>
              </vi-card>
            </li>
          </vi-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import Vue functions.
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
// Import database controllers functions.
import { getPlaylists, getPlaylistsSearch } from '@/database/controllers/User'
// Import form components.
import CreatePlaylist from '@/components/Create/CreatePlaylist.vue'
import SettingsLists from '@/components/Settings/SettingsLists.vue'

export default {
  name: 'ListPlaylist',
  components: {
    CreatePlaylist,
    SettingsLists
  },
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Load playlists list on mounting.
    onMounted(() => { loadPlaylists() })

    // Load playlists list.
    let playlists = ref(null)
    let paginationIndex = ref(0)
    const paginationCount = 50
    const loadPlaylists = () => {
      // Ensure pagination index is reset.
      paginationIndex.value = 0
      // Get first batch of playlists.
      getPlaylists(paginationIndex.value, paginationCount)
        .then((res) => {
          playlists.value = res
          // Set next pagination index.
          paginationIndex.value += paginationCount
        })
    }
    const loadPlaylistNext = () => {
      // Check loaded playlists to avoid duplication.
      if (playlists.value) {
        // Get next batch of playlists.
        getPlaylists(paginationIndex.value, paginationCount)
          .then((res) => {
            playlists.value = playlists.value.concat(res)
            // Set next pagination index.
            paginationIndex.value += paginationCount
          })
      }
    }

    // Manage playlist operations.
    let createPlaylistDialog = ref(false)
    const createPlaylistOpen = () => {
      // Restore the data on the store.
      store.commit('resetPlaylistForm')
      // Open create dialog.
      createPlaylistDialog.value = !createPlaylistDialog.value
    }
    const createPlaylistClose = () => {
      // Reload playlists.
      loadPlaylists()
      // Close create dialog.
      createPlaylistDialog.value = !createPlaylistDialog.value
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
        // Search for playlists matching the query.
        getPlaylistsSearch(paginationIndex.value, paginationCount, query)
          .then((res) => {
            playlists.value = res
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
      // Reload playlists list.
      loadPlaylists()
    }

    return {
      createPlaylistClose,
      createPlaylistDialog,
      createPlaylistOpen,
      loadPlaylistNext,
      playlists,
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