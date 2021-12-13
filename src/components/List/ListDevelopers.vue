<template>
  <div>
    <div v-if="$store.getters.getSettingsGeneralEditMode">
      <!-- Create developer dialog. -->
      <create-developer
        v-show="createDeveloperDialog"
        @close="createDeveloperClose()"
      />
    </div>
    <!-- Navigation bar. -->
    <vi-nav-bar
      nav-title="Developers"
      :nav-subtitle="(developers ? developers.length : 0) + ' elements'"
    >
      <div
        v-if="$store.getters.getSettingsGeneralEditMode"
        class="flex items-center ml-2"
      >
        <!-- Open create developer dialog. -->
        <vi-button-nb
          button-icon="icon-add"
          @click="createDeveloperOpen()"
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
      <list-settings game-category />
    </vi-nav-bar>
    <!-- Show developers list. -->
    <div class="flex flex-col max-h-content min-h-content overflow-hidden">
      <div
        class="flex-1 overflow-y-scroll"
        :class="$store.getters.getSettingsListsContentSpacing ? 'p-4 pr-1' : 'p-1 pr-0 small-scrollbar'"
      >
        <vi-list
          :list-display="2"
          :list-remote-method="loadDevelopersNext"
        >
          <li
            v-for="developer in developers"
            :key="developer._id"
            :value="developer._id"
            @click="$router.push({ name: 'Developer', params: { id: developer._id } })"
          >
            <!-- Developer card. -->
            <vi-card>
              <div class="flex items-center p-4 space-x-2">
                <h1 class="font-medium">{{ developer.name }}</h1>
                <h3 class="pt-0.5 text-sm">{{ developer.titles }} {{ developer.titles == 1 ? 'Title' : 'Titles' }}</h3>
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
import { getDevelopersAll, getDevelopersAllSearch } from '@/database/controllers/Developer'
// Import form components.
import CreateDeveloper from '@/components/Create/CreateDeveloper.vue'
import ListSettings from '@/components/List/ListSettings/ListSettings.vue'

export default {
  name: 'ListDevelopers',
  components: {
    CreateDeveloper,
    ListSettings
  },
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Load developers list on mounting.
    onMounted(() => { loadDevelopers() })

    // Load developers list.
    let developers = ref(null)
    let paginationIndex = ref(0)
    const paginationCount = 50
    const loadDevelopers = () => {
      // Ensure pagination index is reset.
      paginationIndex.value = 0
      // Get first batch of developers.
      getDevelopersAll(paginationIndex.value, paginationCount)
        .then((res) => {
          developers.value = res
          // Set next pagination index.
          paginationIndex.value += paginationCount
        })
    }
    const loadDevelopersNext = () => {
      // Check loaded developers to avoid duplication.
      if (developers.value) {
        // Get next batch of developers.
        getDevelopersAll(paginationIndex.value, paginationCount)
          .then((res) => {
            developers.value = developers.value.concat(res)
            // Set next pagination index.
            paginationIndex.value += paginationCount
          })
      }
    }

    // Manage developer operations.
    let createDeveloperDialog = ref(false)
    const createDeveloperOpen = () => {
      // Restore the data on the store.
      store.commit('resetDeveloperForm')
      // Open create dialog.
      createDeveloperDialog.value = !createDeveloperDialog.value
    }
    const createDeveloperClose = () => {
      // Reload developers.
      loadDevelopers()
      // Close create dialog.
      createDeveloperDialog.value = !createDeveloperDialog.value
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
        // Search for developers matching the query.
        getDevelopersAllSearch(paginationIndex.value, paginationCount, query)
          .then((res) => {
            developers.value = res
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
      // Reload developers list.
      loadDevelopers()
    }

    return {
      createDeveloperClose,
      createDeveloperDialog,
      createDeveloperOpen,
      developers,
      loadDevelopersNext,
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