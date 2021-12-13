<template>
  <div>
    <div v-if="$store.getters.getSettingsGeneralEditMode">
      <!-- Create game platform dialog. -->
      <create-game-platform
        v-show="createPlatformDialog"
        :game-platform="$route.params.id"
        @close="createPlatformClose()"
      />
      <!-- Edit platform dialog. -->
      <edit-platform
        v-show="editPlatformDialog"
        :group-platform="platform.parent"
        @close="editPlatformClose()"
      />
      <!-- Delete platform dialog. -->
      <vi-dialog-box
        v-show="deletePlatformDialog"
        @accept="deletePlatformClose()"
        @cancel="deletePlatformOpen()"
        dialog-actions="OkCancel"
      >
        Delete platform <b>'{{ platform.name }}'</b> ?
        <br />
        It will also delete all its game entries.
      </vi-dialog-box>
    </div>
    <!-- Platform settings dialog. -->
    <view-platform-settings
      v-show="settingsPlatformDialog"
      @close="settingsPlatformClose()"
    />
    <!-- Navigation bar. -->
    <vi-nav-bar
      :nav-title="platform.name"
      :nav-subtitle="platform.games.length + ' elements'"
    >
      <div
        v-if="$store.getters.getSettingsGeneralEditMode"
        class="flex items-center ml-2 -mr-1 space-x-1"
      >
        <!-- Open create game platform dialog. -->
        <vi-button-nb
          button-icon="icon-add"
          @click="createPlatformOpen()"
        />
        <!-- Open edit platform dialog. -->
        <vi-button-nb
          button-icon="icon-edit"
          @click="editPlatformOpen()"
        />
        <!-- Open delete platform dialog. -->
        <vi-button-nb
          button-icon="icon-remove"
          @click="deletePlatformOpen()"
        />
      </div>
      <div class="flex items-center ml-2">
        <!-- Open platform settings dialog. -->
        <vi-button-nb
          button-icon="icon-settings"
          @click="settingsPlatformOpen()"
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
      <list-settings list-platform />
      <!-- Horizontal padding. -->
      <div class="w-full" />
    </vi-nav-bar>
    <!-- Show platform's games list. -->
    <div class="flex flex-col max-h-content min-h-content overflow-hidden">
      <vi-list
        v-if="platform.games.length > 0"
        :list-display="listDisplay"
        list-platform
        :list-remote-method="loadPlatformNext"
      >
        <li
          v-for="game in platform.games"
          :key="game._id"
          :value="game._id"
          @click="$router.push({ name: 'Game', params: { id: game._id } })"
        >
          <!-- Game cards. -->
          <vi-card-grid
            v-if="listDisplay == 1"
            :game-info="game"
            list-platform
          />
          <vi-card-list
            v-else-if="listDisplay == 2"
            :game-info="game"
          />
          <vi-card-compact
            v-else-if="listDisplay == 3"
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
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
// Import database controllers functions.
import { getPlatform, deletePlatform } from '@/database/controllers/Platform'
import { getGamesPlatform } from '@/database/controllers/Game'
// Import form components.
import CreateGamePlatform from '@/components/Create/CreateGamePlatform.vue'
import EditPlatform from '@/components/Edit/EditPlatform.vue'
import ListSettings from '@/components/List/ListSettings/ListSettings.vue'
import ViewPlatformSettings from './ViewPlatform/ViewPlatformSettings.vue'

export default {
  name: 'ViewPlatform',
  components: {
    CreateGamePlatform,
    EditPlatform,
    ListSettings,
    ViewPlatformSettings
  },
  setup() {
    // Instantiate Vue elements.
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    // Load platform games list on mounting.
    onMounted(() => { loadPlatform() })

    // Load and manage platform information.
    let platform = ref({
      name: null,
      parent: null,
      games: []
    })
    const loadPlatform = () => {
      // Ensure pagination index is reset.
      paginationIndex.value = 0
      // Get platform.
      getPlatform(route.params.id)
        .then((res) => {
          platform.value.name = res.name
          platform.value.parent = res.parent ? res.parent._id : ''
          // Save current platform ID into the store.
          store.state.selectedPlatform = res._id
          store.commit('setPlatformStore')
          store.commit('setPlatformOverStore')
        })
      // Get platform's games.
      getGamesPlatform(route.params.id, paginationIndex.value, paginationCount)
        .then((res) => {
          platform.value.games = res
          // Set next pagination index.
          paginationIndex.value += paginationCount
        })
    }
    const loadPlatformNext = () => {
      // Check loaded games to avoid duplication.
      if (platform.value.games) {
        // Get next batch of games.
        getGamesPlatform(route.params.id, paginationIndex.value, paginationCount)
          .then((res) => {
            platform.value.games = platform.value.games.concat(res)
            // Set next pagination index.
            paginationIndex.value += paginationCount
          })
      }
    }
    const listDisplay = computed(() => {
      return store.getters.getSettingsPlatformOverDisplayMode
        ? store.getters.getSettingsPlatformOverDisplayMode
        : store.getters.getSettingsListsDisplayMode
    })

    // Manage game platform operations.
    let createPlatformDialog = ref(false)
    const createPlatformOpen = () => {
      // Restore the data on the store.
      store.commit('resetGameSelected')
      store.commit('resetGameForm')
      // Save data of the current platform into the store.
      store.commit('setGamePlatformPlatform', route.params.id)
      // Open create dialog.
      createPlatformDialog.value = !createPlatformDialog.value
    }
    const createPlatformClose = () => {
      // Reload platform.
      loadPlatform()
      // Close create dialog.
      createPlatformDialog.value = !createPlatformDialog.value
    }

    // Manage platform operations.
    let editPlatformDialog = ref(false)
    const editPlatformOpen = () => {
      // Restore the data on the store.
      store.commit('resetPlatformForm')
      // Save current platform ID into the store.
      store.state.platformSelected = route.params.id
      // Save data of the current platform into the store.
      store.commit('setPlatformName', platform.value.name)
      store.commit('setPlatformParent', platform.value.parent)
      // Open edit dialog.
      editPlatformDialog.value = !editPlatformDialog.value
    }
    const editPlatformClose = () => {
      // Reload platform.
      loadPlatform()
      // Close edit dialog.
      editPlatformDialog.value = !editPlatformDialog.value
    }
    let deletePlatformDialog = ref(false)
    const deletePlatformOpen = () => {
      // Open delete dialog.
      deletePlatformDialog.value = !deletePlatformDialog.value
    }
    const deletePlatformClose = () => {
      // Delete platform.
      deletePlatform(route.params.id)
        .then(() => router.back())
    }

    // Manage platform settings.
    let settingsPlatformDialog = ref(false)
    const settingsPlatformOpen = () => {
      // Load stored data.
      store.commit('resetPlatformStore')
      // Open settings dialog.
      settingsPlatformDialog.value = !settingsPlatformDialog.value
    }
    const settingsPlatformClose = () => {
      // Close settings dialog.
      settingsPlatformDialog.value = !settingsPlatformDialog.value
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
        getGamesPlatform(route.params.id, paginationIndex.value, paginationCount, query)
          .then((res) => {
            platform.value.games = res
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
      loadPlatform()
    }

    return {
      createPlatformClose,
      createPlatformDialog,
      createPlatformOpen,
      deletePlatformClose,
      deletePlatformDialog,
      deletePlatformOpen,
      platform,
      editPlatformClose,
      editPlatformDialog,
      editPlatformOpen,
      listDisplay,
      loadPlatformNext,
      queryInput,
      querySearched,
      querySearch,
      settingsPlatformClose,
      settingsPlatformDialog,
      settingsPlatformOpen
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