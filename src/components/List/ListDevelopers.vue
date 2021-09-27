<template>
  <div>
    <!-- Create developer dialog. -->
    <hip-dialog
      v-show="createDeveloperDialog"
      @close="createDeveloperClose()"
      class="z-10"
    >
      <!-- Insert create developer form component. -->
      <create-developer @close="createDeveloperClose()" />
    </hip-dialog>
    <!-- Navigation bar. -->
    <hip-nav-bar title="Developers">
      <!-- Open create developer dialog. -->
      <hip-button-nb
        v-show="$store.getters.getSettingsGeneralEditMode"
        @click="createDeveloperOpen()"
      >
        <hip-icon class="w-6">
          <icon-add />
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
      <!-- List settings. -->
      <settings-lists groupSettings />
    </hip-nav-bar>
    <!-- Show developers list. -->
    <div class="h-content m-6">
      <div class="flex flex-col max-h-content min-h-content overflow-hidden">
        <div class="flex-1 no-scrollbar overflow-y-scroll rounded-xl">
          <hip-list
            :listDisplay="1"
            :remote-method="loadDevelopersNext"
          >
            <li
              v-for="developer in developers"
              :key="developer._id"
              :value="developer._id"
              @click="$router.push({ name: 'ViewDeveloper', params: { id: developer._id } })"
            >
              <!-- Developer card. -->
              <hip-card>
                <div class="flex items-center p-4 space-x-2">
                  <h1 class="font-medium">{{ developer.name }}</h1>
                  <h3 class="pt-0.5 text-sm">{{ developer.titles }} {{ developer.titles == 1 ? 'Title' : 'Titles' }}</h3>
                </div>
              </hip-card>
            </li>
          </hip-list>
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
import { getDevelopers, getDevelopersAllSearch } from '@/database/controllers/Developer'
// Import form components.
import CreateDeveloper from '@/components/Create/CreateDeveloper.vue'
import SettingsLists from '@/components/Settings/SettingsLists.vue'

export default {
  name: 'ListDevelopers',
  components: {
    CreateDeveloper,
    SettingsLists
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
      getDevelopers(paginationIndex.value, paginationCount)
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
        getDevelopers(paginationIndex.value, paginationCount)
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