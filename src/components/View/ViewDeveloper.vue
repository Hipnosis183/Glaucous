<template>
  <div>
    <!-- Create game platform dialog. -->
    <vi-dialog
      v-show="createPlatformDialog"
      @close="createPlatformClose()"
      class="z-10"
    >
      <!-- Insert create game platform form component. -->
      <create-game-platform
        :gameDeveloper="$route.params.id"
        @close="createPlatformClose()"
      />
    </vi-dialog>
    <!-- Edit developer dialog. -->
    <vi-dialog
      v-show="editDeveloperDialog"
      @close="editDeveloperClose()"
      class="z-10"
    >
      <!-- Insert edit developer form component. -->
      <edit-developer @close="editDeveloperClose()" />
    </vi-dialog>
    <!-- Delete developer dialog. -->
    <vi-dialog
      v-show="deleteDeveloperDialog"
      @close="deleteDeveloperOpen()"
      class="z-10"
    >
      <!-- Dialog message. -->
      <p class="text-center text-lg">
        Delete developer <b>'{{ developer.name }}'</b> ?
        <br />
        It will also delete all its game entries.
      </p>
      <div class="flex justify-center mt-6 space-x-4">
        <!-- Confirm developer deletion. -->
        <vi-button-icon @click="deleteDeveloperClose()">
          <vi-icon class="w-6">
            <icon-check />
          </vi-icon>
        </vi-button-icon>
        <!-- Cancel developer deletion. -->
        <vi-button-icon @click="deleteDeveloperOpen()">
          <vi-icon class="w-6">
            <icon-close />
          </vi-icon>
        </vi-button-icon>
      </div>
    </vi-dialog>
    <!-- Navigation bar. -->
    <vi-nav-bar :title="developer.name">
      <!-- Open create game platform dialog. -->
      <vi-button-nb
        v-show="$store.getters.getSettingsGeneralEditMode"
        @click="createPlatformOpen()"
      >
        <vi-icon class="w-6">
          <icon-add />
        </vi-icon>
      </vi-button-nb>
      <!-- Open edit developer dialog. -->
      <vi-button-nb
        v-show="$store.getters.getSettingsGeneralEditMode"
        @click="editDeveloperOpen()"
      >
        <vi-icon class="w-6">
          <icon-edit />
        </vi-icon>
      </vi-button-nb>
      <!-- Open delete developer dialog. -->
      <vi-button-nb
        v-show="$store.getters.getSettingsGeneralEditMode"
        @click="deleteDeveloperOpen()"
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
    <!-- Show developer's games list. -->
    <div class="h-content m-6">
      <div class="flex flex-col max-h-content min-h-content overflow-hidden">
        <div class="flex-1 no-scrollbar overflow-y-scroll rounded-xl">
          <vi-list
            v-if="developer.games.length > 0"
            :listDisplay="$store.getters.getSettingsListsListDisplay"
            :remote-method="loadDeveloperNext"
          >
            <li
              v-for="game in developer.games"
              :key="game._id"
              :value="game._id"
              @click="$router.push({ name: 'ViewGame', params: { id: game._id } })"
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
import { getDeveloper, deleteDeveloper } from '@/database/controllers/Developer'
import { getGamesDeveloper } from '@/database/controllers/Game'
// Import form components.
import CreateGamePlatform from '../Create/CreateGamePlatform.vue'
import EditDeveloper from '../Edit/EditDeveloper.vue'
import SettingsLists from '../Settings/SettingsLists.vue'

export default {
  name: 'ViewDeveloper',
  components: {
    CreateGamePlatform,
    EditDeveloper,
    SettingsLists
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
      store.commit('setGamePlatformDeveloper', route.params.id)
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
  height: calc(100vh - 6.25rem);
}
.min-h-content {
  min-height: calc(100vh - 6.25rem);
}
.max-h-content {
  max-height: calc(100vh - 6.25rem);
}
</style>