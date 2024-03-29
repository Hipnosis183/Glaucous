<template>
  <div>
    <div v-if="$store.getters.getSettingsGeneralEditMode">
      <!-- Create game platform dialog. -->
      <create-game-platform
        v-show="createPlatformDialog"
        @close="createPlatformClose()"
      />
      <!-- Edit developer dialog. -->
      <edit-developer
        v-show="editDeveloperDialog"
        @close="editDeveloperClose()"
      />
      <!-- Delete developer dialog. -->
      <vi-dialog-box
        v-show="deleteDeveloperDialog"
        @accept="deleteDeveloperClose()"
        @cancel="deleteDeveloperOpen()"
        dialog-actions="OkCancel"
      >
        Delete developer <b>'{{ developer.name }}'</b> ?
        <br />
        It will remove it from all game entries where it's included.
      </vi-dialog-box>
    </div>
    <!-- Navigation bar. -->
    <vi-nav-bar
      :nav-title="developer.name"
      :nav-subtitle="developer.count + ' elements'"
    >
      <div
        v-if="$store.getters.getSettingsGeneralEditMode"
        class="flex items-center ml-2 space-x-1"
      >
        <!-- Open create game platform dialog. -->
        <vi-button-nb
          button-icon="icon-add"
          @click="createPlatformOpen()"
        />
        <!-- Open edit developer dialog. -->
        <vi-button-nb
          button-icon="icon-edit"
          @click="editDeveloperOpen()"
        />
        <!-- Open delete developer dialog. -->
        <vi-button-nb
          button-icon="icon-remove"
          @click="deleteDeveloperOpen()"
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
      <list-settings />
    </vi-nav-bar>
    <!-- Show developer's games list. -->
    <div class="flex flex-col max-h-content min-h-content overflow-hidden">
      <vi-list
        v-if="developer.games.length > 0"
        :list-display="$store.getters.getSettingsListsDisplayMode"
        :list-remote-method="loadDeveloperNext"
      >
        <li
          v-for="game in developer.games"
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
</template>

<script>
// Import Vue functions.
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
// Import database controllers functions.
import { getDeveloper, deleteDeveloper } from '@/database/controllers/Developer'
import { getGamesDeveloper, getGamesDeveloperCount } from '@/database/controllers/Game'
// Import form components.
import CreateGamePlatform from '@/components/Create/CreateGamePlatform.vue'
import EditDeveloper from '@/components/Edit/EditDeveloper.vue'
import ListSettings from '@/components/List/ListSettings/ListSettings.vue'

export default {
  name: 'ViewDeveloper',
  components: {
    CreateGamePlatform,
    EditDeveloper,
    ListSettings
  },
  setup() {
    // Instantiate Vue elements.
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    // Load developer games list on mounting.
    onMounted(() => { loadDeveloper() })

    // Load and manage developer information.
    let developer = ref({
      name: null,
      count: null,
      games: []
    })
    const loadDeveloper = () => {
      // Ensure pagination index is reset.
      paginationIndex.value = 0
      // Get developer.
      getDeveloper(route.params.id)
        .then((res) => developer.value.name = res.name)
      // Get developer's games.
      getGamesDeveloper(route.params.id, paginationIndex.value, paginationCount)
        .then((res) => {
          developer.value.games = res
          // Set next pagination index.
          paginationIndex.value += paginationCount
        })
      // Get games count.
      getGamesDeveloperCount(route.params.id)
        .then((res) => { developer.value.count = res })
    }
    const loadDeveloperNext = () => {
      // Check loaded games to avoid duplication.
      if (developer.value.games) {
        // Get next batch of games.
        getGamesDeveloper(route.params.id, paginationIndex.value, paginationCount)
          .then((res) => {
            developer.value.games = developer.value.games.concat(res)
            // Set next pagination index.
            paginationIndex.value += paginationCount
          })
      }
    }

    // Manage game platform operations.
    let createPlatformDialog = ref(false)
    const createPlatformOpen = () => {
      // Restore the data on the store.
      store.commit('resetGameSelected')
      store.commit('resetGameForm')
      // Save data of the current developer into the store.
      store.commit('setGamePlatformDevelopers', [route.params.id])
      // Open create dialog.
      createPlatformDialog.value = !createPlatformDialog.value
    }
    const createPlatformClose = () => {
      // Reload developer.
      loadDeveloper()
      // Close create dialog.
      createPlatformDialog.value = !createPlatformDialog.value
    }

    // Manage developer operations.
    let editDeveloperDialog = ref(false)
    const editDeveloperOpen = () => {
      // Restore the data on the store.
      store.commit('resetDeveloperForm')
      // Save current developer ID into the store.
      store.state.developerSelected = route.params.id
      // Save data of the current developer into the store.
      store.commit('setDeveloperName', developer.value.name)
      // Open edit dialog.
      editDeveloperDialog.value = !editDeveloperDialog.value
    }
    const editDeveloperClose = () => {
      // Reload developer.
      loadDeveloper()
      // Close edit dialog.
      editDeveloperDialog.value = !editDeveloperDialog.value
    }
    let deleteDeveloperDialog = ref(false)
    const deleteDeveloperOpen = () => {
      // Open delete dialog.
      deleteDeveloperDialog.value = !deleteDeveloperDialog.value
    }
    const deleteDeveloperClose = () => {
      // Delete developer.
      deleteDeveloper(route.params.id)
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
        getGamesDeveloper(route.params.id, paginationIndex.value, paginationCount, query)
          .then((res) => {
            developer.value.games = res
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
      loadDeveloper()
    }

    return {
      createPlatformClose,
      createPlatformDialog,
      createPlatformOpen,
      deleteDeveloperClose,
      deleteDeveloperDialog,
      deleteDeveloperOpen,
      developer,
      editDeveloperClose,
      editDeveloperDialog,
      editDeveloperOpen,
      loadDeveloperNext,
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