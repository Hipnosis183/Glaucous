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
        :gameDeveloper="$route.params.id"
        @close="createPlatformClose()"
      />
    </hip-dialog>
    <!-- Edit developer dialog. -->
    <hip-dialog
      v-show="editDeveloperDialog"
      @close="editDeveloperClose()"
      class="z-10"
    >
      <!-- Insert edit developer form component. -->
      <edit-developer @close="editDeveloperClose()" />
    </hip-dialog>
    <!-- Delete developer dialog. -->
    <hip-dialog
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
        <hip-button
          icon
          @click="deleteDeveloperClose()"
          class="el-icon-circle-check text-2xl"
        ></hip-button>
        <!-- Cancel developer deletion. -->
        <hip-button
          icon
          @click="deleteDeveloperOpen()"
          class="el-icon-circle-close text-2xl"
        ></hip-button>
      </div>
    </hip-dialog>
    <!-- Navigation bar. -->
    <hip-nav-bar :title="developer.name">
      <!-- Open create game platform dialog. -->
      <hip-button-nb
        v-show="$store.getters.getSettingsGeneralEditMode"
        @click="createPlatformOpen()"
        class="el-icon-circle-plus-outline text-2xl"
      ></hip-button-nb>
      <!-- Open edit developer dialog. -->
      <hip-button-nb
        v-show="$store.getters.getSettingsGeneralEditMode"
        @click="editDeveloperOpen()"
        class="el-icon-edit-outline text-2xl"
      ></hip-button-nb>
      <!-- Open delete developer dialog. -->
      <hip-button-nb
        v-show="$store.getters.getSettingsGeneralEditMode"
        @click="deleteDeveloperOpen()"
        class="el-icon-remove-outline text-2xl"
      ></hip-button-nb>
      <!-- Search bar. -->
      <div class="flex-shrink-0 ml-2 my-auto w-80">
        <hip-input
          v-model="queryInput"
          icon-prefix="el-icon-search"
          placeholder="Search..."
          remote
          :remote-method="querySearch"
        />
      </div>
      <div class="flex-shrink-0 ml-2 my-auto w-28">
        <settings-cards-mode />
      </div>
    </hip-nav-bar>
    <!-- Show developer's games list. -->
    <div class="h-content m-6">
      <div class="flex flex-col max-h-content min-h-content overflow-hidden">
        <div class="flex-1 no-scrollbar overflow-y-scroll rounded-xl">
          <hip-list
            v-if="developer.games.length > 0"
            :remote-method="loadDeveloperNext"
          >
            <li
              v-for="game in developer.games"
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
// Import form components.
import CreateGamePlatform from '../Create/CreateGamePlatform.vue'
import EditDeveloper from '../Edit/EditDeveloper.vue'
import SettingsCardsMode from '../Settings/SettingsCards/SettingsCardsMode.vue'
// Import UI components.
import {
  HipButton,
  HipButtonNb,
  HipCard,
  HipCardCompact,
  HipCardLarge,
  HipCardTall,
  HipDialog,
  HipInput,
  HipList,
  HipNavBar
} from '@/components/Component'
// Import database controllers functions.
import {
  getDeveloper,
  deleteDeveloper
} from '@/database/controllers/Developer'
import { getGamesDeveloper } from '@/database/controllers/Game'

// Import Vue functions.
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'ViewDeveloper',
  components: {
    // Form components.
    CreateGamePlatform,
    EditDeveloper,
    SettingsCardsMode,
    // UI components.
    HipButton,
    HipButtonNb,
    HipCard,
    HipCardCompact,
    HipCardLarge,
    HipCardTall,
    HipDialog,
    HipInput,
    HipList,
    HipNavBar
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