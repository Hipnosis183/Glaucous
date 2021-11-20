<template>
  <div>
    <div v-if="$store.getters.getSettingsGeneralEditMode">
      <!-- Create platform dialog. -->
      <create-platform
        v-show="createPlatformDialog"
        @close="createPlatformClose()"
      />
    </div>
    <!-- Navigation bar. -->
    <vi-nav-bar nav-title="Platforms">
      <div
        v-if="$store.getters.getSettingsGeneralEditMode"
        class="flex items-center ml-2"
      >
        <!-- Open create platform dialog. -->
        <vi-button-nb
          button-icon="icon-add"
          @click="createPlatformOpen()"
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
      <settings-lists game-category />
    </vi-nav-bar>
    <!-- Show platforms list. -->
    <div class="flex flex-col max-h-content min-h-content overflow-hidden">
      <div
        class="flex-1 overflow-y-scroll"
        :class="$store.getters.getSettingsListsContentSpacing ? 'p-4 pr-1' : 'p-1 pr-0 small-scrollbar'"
      >
        <vi-list
          :list-display="2"
          :list-remote-method="loadPlatformsNext"
        >
          <li
            v-for="platform in platforms"
            :key="platform._id"
            :value="platform._id"
            @click="$router.push({ name: platform.group ? 'PlatformsGroup' : 'Platform', params: { id: platform._id } })"
          >
            <!-- Platform card. -->
            <vi-card>
              <div class="flex items-center p-4 space-x-2">
                <h1 class="font-medium">{{ platform.name }}</h1>
                <div class="pt-0.5 text-sm">
                  <h3 v-if="platform.group">{{ platform.titles }} {{ platform.titles == 1 ? 'Platform' : 'Platforms' }}</h3>
                  <h3 v-else>{{ platform.titles }} {{ platform.titles == 1 ? 'Title' : 'Titles' }}</h3>
                </div>
              </div>
            </vi-card>
          </li>
        </vi-list>
      </div>
    </div>
  </div>
</template>

<script>
// Import Vue functions.
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
// Import database controllers functions.
import { getPlatforms, getPlatformsAllSearch } from '@/database/controllers/Platform'
// Import form components.
import CreatePlatform from '@/components/Create/CreatePlatform.vue'
import SettingsLists from '@/components/Settings/SettingsLists.vue'

export default {
  name: 'ListPlatforms',
  components: {
    CreatePlatform,
    SettingsLists
  },
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Load platforms list on mounting.
    onMounted(() => { loadPlatforms() })

    // Load platforms list.
    let platforms = ref(null)
    let paginationIndex = ref(0)
    const paginationCount = 50
    const loadPlatforms = () => {
      // Ensure pagination index is reset.
      paginationIndex.value = 0
      // Get first batch of platforms.
      getPlatforms(paginationIndex.value, paginationCount)
        .then((res) => {
          platforms.value = res
          // Set next pagination index.
          paginationIndex.value += paginationCount
        })
    }
    const loadPlatformsNext = () => {
      // Check loaded platforms to avoid duplication.
      if (platforms.value) {
        // Get next batch of platforms.
        getPlatforms(paginationIndex.value, paginationCount)
          .then((res) => {
            platforms.value = platforms.value.concat(res)
            // Set next pagination index.
            paginationIndex.value += paginationCount
          })
      }
    }

    // Manage platform operations.
    let createPlatformDialog = ref(false)
    const createPlatformOpen = () => {
      // Restore the data on the store.
      store.commit('resetPlatformForm')
      // Open create dialog.
      createPlatformDialog.value = !createPlatformDialog.value
    }
    const createPlatformClose = () => {
      // Reload platforms.
      loadPlatforms()
      // Close create dialog.
      createPlatformDialog.value = !createPlatformDialog.value
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
        // Search for platforms matching the query.
        getPlatformsAllSearch(paginationIndex.value, paginationCount, query)
          .then((res) => {
            platforms.value = res
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
      // Reload platforms list.
      loadPlatforms()
    }

    return {
      createPlatformClose,
      createPlatformDialog,
      createPlatformOpen,
      loadPlatformsNext,
      platforms,
      queryInput,
      querySearched,
      querySearch
    }
  }
}
</script>

<style scoped>
/* Calculations. */
.min-h-content {
  min-height: calc(100vh - 3.5rem);
}
.max-h-content {
  max-height: calc(100vh - 3.5rem);
}
</style>