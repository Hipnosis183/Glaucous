<template>
  <div>
    <!-- Create game platform dialog. -->
    <hip-dialog
      v-show="createPlatformDialog"
      @close="createPlatformClose()"
      class="z-10"
    >
      <!-- Insert create game platform form component. -->
      <create-game-platform
        :gamePlatform="$route.params.id"
        @close="createPlatformClose()"
      />
    </hip-dialog>
    <!-- Edit platform dialog. -->
    <hip-dialog
      v-show="editPlatformDialog"
      @close="editPlatformClose()"
      class="z-10"
    >
      <!-- Insert edit platform form component. -->
      <edit-platform
        :groupPlatform="platform.parent"
        @close="editPlatformClose()"
      />
    </hip-dialog>
    <!-- Delete platform dialog. -->
    <hip-dialog
      v-show="deletePlatformDialog"
      @close="deletePlatformOpen()"
      class="z-10"
    >
      <!-- Dialog message. -->
      <p class="text-center text-lg">
        Delete platform <b>'{{ platform.name }}'</b> ?
        <br />
        It will also delete all its game entries.
      </p>
      <div class="flex justify-center mt-6 space-x-4">
        <!-- Confirm platform deletion. -->
        <hip-button
          icon
          @click="deletePlatformClose()"
        >
          <hip-icon class="w-6">
            <icon-check />
          </hip-icon>
        </hip-button>
        <!-- Cancel platform deletion. -->
        <hip-button
          icon
          @click="deletePlatformOpen()"
        >
          <hip-icon class="w-6">
            <icon-close />
          </hip-icon>
        </hip-button>
      </div>
    </hip-dialog>
    <!-- Platform settings dialog. -->
    <hip-dialog
      v-show="settingsPlatformDialog"
      @close="settingsPlatformClose()"
      width="w-2/3"
      class="z-10"
    >
      <view-platform-settings
        v-if="$store.state.selectedPlatform"
        :key="$store.state.selectedPlatform"
        @close="settingsPlatformClose()"
      />
    </hip-dialog>
    <!-- Navigation bar. -->
    <hip-nav-bar
      :button="true"
      :title="platform.name"
    >
      <!-- Open create game platform dialog. -->
      <hip-button-nb
        v-show="$store.getters.getSettingsGeneralEditMode"
        @click="createPlatformOpen()"
      >
        <hip-icon class="w-6">
          <icon-add />
        </hip-icon>
      </hip-button-nb>
      <!-- Open edit platform dialog. -->
      <hip-button-nb
        v-show="$store.getters.getSettingsGeneralEditMode"
        @click="editPlatformOpen()"
      >
        <hip-icon class="w-6">
          <icon-edit />
        </hip-icon>
      </hip-button-nb>
      <!-- Open delete platform dialog. -->
      <hip-button-nb
        v-show="$store.getters.getSettingsGeneralEditMode"
        @click="deletePlatformOpen()"
      >
        <hip-icon class="w-6">
          <icon-remove />
        </hip-icon>
      </hip-button-nb>
      <!-- Search bar. -->
      <div class="flex-shrink-0 ml-2 my-auto w-80">
        <hip-input
          v-model="queryInput"
          icon-prefix="icon-search"
          placeholder="Search..."
          remote
          :remote-method="querySearch"
        />
      </div>
      <div class="flex-shrink-0 ml-2 my-auto w-28">
        <settings-cards-mode />
      </div>
      <!-- Horizontal padding. -->
      <div class="w-full"></div>
      <!-- Open platform settings dialog. -->
      <hip-button
        v-show="$store.getters.getSettingsGeneralEditMode"
        icon
        @click="settingsPlatformOpen()"
        class="mr-4 my-auto"
      >
        <hip-icon class="w-5">
          <icon-setting />
        </hip-icon>
      </hip-button>
    </hip-nav-bar>
    <!-- Show platform's games list. -->
    <div class="h-content m-6">
      <div class="flex flex-col max-h-content min-h-content overflow-hidden">
        <div class="flex-1 no-scrollbar overflow-y-scroll rounded-xl">
          <hip-list
            v-if="platform.games.length > 0"
            :remote-method="loadPlatformNext"
          >
            <li
              v-for="game in platform.games"
              :key="game._id"
              :value="game._id"
              @click="$router.push({ name: 'ViewGame', params: { id: game._id } })"
            >
              <!-- Game cards. -->
              <hip-card-tall
                v-if="$store.getters.getSettingsCardsCardMode == 0"
                :gameInfo="game"
              />
              <hip-card-large
                v-else-if="$store.getters.getSettingsCardsCardMode == 1"
                :gameInfo="game"
              />
              <hip-card-compact
                v-else-if="$store.getters.getSettingsCardsCardMode == 2"
                :gameInfo="game"
              />
            </li>
          </hip-list>
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
import { getPlatform, deletePlatform } from '@/database/controllers/Platform'
import { getGamesPlatform } from '@/database/controllers/Game'
// Import form components.
import CreateGamePlatform from '@/components/Create/CreateGamePlatform.vue'
import EditPlatform from '@/components/Edit/EditPlatform.vue'
import SettingsCardsMode from '@/components/Settings/SettingsCards/SettingsCardsMode.vue'
import ViewPlatformSettings from './ViewPlatform/ViewPlatformSettings.vue'

export default {
  name: 'ViewPlatform',
  components: {
    CreateGamePlatform,
    EditPlatform,
    SettingsCardsMode,
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
  height: calc(100vh - 6.25rem);
}
.min-h-content {
  min-height: calc(100vh - 6.25rem);
}
.max-h-content {
  max-height: calc(100vh - 6.25rem);
}
</style>