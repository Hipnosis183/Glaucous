<template>
  <div>
    <div v-if="$store.getters.getSettingsGeneralEditMode">
      <!-- Edit tag dialog. -->
      <edit-tag
        v-show="editTagDialog"
        @close="editTagClose()"
      />
      <!-- Delete tag dialog. -->
      <vi-dialog-box
        v-show="deleteTagDialog"
        @accept="deleteTagClose()"
        @cancel="deleteTagOpen()"
        dialog-actions="OkCancel"
      >
        Delete tag <b>'{{ gameTag.name }}'</b> ?
      </vi-dialog-box>
    </div>
    <!-- Navigation bar. -->
    <vi-nav-bar
      :nav-title="gameTag.name"
      :nav-subtitle="gameTag.count + ' elements'"
    >
      <div
        v-if="$store.getters.getSettingsGeneralEditMode"
        class="flex items-center ml-2 space-x-1"
      >
        <!-- Open edit tag dialog. -->
        <vi-button-nb
          button-icon="icon-edit"
          @click="editTagOpen()"
        />
        <!-- Open delete tag dialog. -->
        <vi-button-nb
          button-icon="icon-remove"
          @click="deleteTagOpen()"
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
    <!-- Show tag's games list. -->
    <div class="flex flex-col max-h-content min-h-content overflow-hidden">
      <vi-list
        v-if="gameTag.games.length > 0"
        :list-display="$store.getters.getSettingsListsDisplayMode"
        :list-remote-method="loadTagNext"
      >
        <li
          v-for="game in gameTag.games"
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
import { getTag, deleteTag } from '@/database/controllers/User'
import { getGamesTag, getGamesTagCount } from '@/database/controllers/Game'
// Import form components.
import EditTag from '@/components/Edit/EditTag.vue'
import ListSettings from '@/components/List/ListSettings/ListSettings.vue'

export default {
  name: 'ViewTag',
  components: {
    EditTag,
    ListSettings
  },
  setup() {
    // Instantiate Vue elements.
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    // Load tag games list on mounting.
    onMounted(() => { loadTag() })

    // Load and manage tag information.
    let gameTag = ref({
      name: null,
      count: null,
      games: []
    })
    const loadTag = () => {
      // Ensure pagination index is reset.
      paginationIndex.value = 0
      // Get tag name.
      getTag(route.params.id)
        .then((res) => gameTag.value.name = res.name)
      // Get tag games.
      getGamesTag(route.params.id, paginationIndex.value, paginationCount)
        .then((res) => {
          gameTag.value.games = res
          // Set next pagination index.
          paginationIndex.value += paginationCount
        })
      // Get games count.
      getGamesTagCount(route.params.id)
        .then((res) => { gameTag.value.count = res })
    }
    const loadTagNext = () => {
      // Check loaded games to avoid duplication.
      if (gameTag.value.games) {
        // Get next batch of games.
        getGamesTag(route.params.id, paginationIndex.value, paginationCount)
          .then((res) => {
            gameTag.value.games = gameTag.value.games.concat(res)
            // Set next pagination index.
            paginationIndex.value += paginationCount
          })
      }
    }

    // Manage tag operations.
    let editTagDialog = ref(false)
    const editTagOpen = () => {
      // Restore the data on the store.
      store.commit('resetTagForm')
      // Save current tag ID into the store.
      store.state.tagSelected = route.params.id
      // Save data of the current tag into the store.
      store.commit('setTagName', gameTag.value.name)
      // Open edit dialog.
      editTagDialog.value = !editTagDialog.value
    }
    const editTagClose = () => {
      // Reload tag.
      loadTag()
      // Close edit dialog.
      editTagDialog.value = !editTagDialog.value
    }
    let deleteTagDialog = ref(false)
    const deleteTagOpen = () => {
      // Open delete dialog.
      deleteTagDialog.value = !deleteTagDialog.value
    }
    const deleteTagClose = () => {
      // Delete tag.
      deleteTag(route.params.id)
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
        getGamesTag(route.params.id, paginationIndex.value, paginationCount, query)
          .then((res) => {
            gameTag.value.games = res
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
      loadTag()
    }

    return {
      deleteTagClose,
      deleteTagDialog,
      deleteTagOpen,
      editTagClose,
      editTagDialog,
      editTagOpen,
      gameTag,
      loadTagNext,
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