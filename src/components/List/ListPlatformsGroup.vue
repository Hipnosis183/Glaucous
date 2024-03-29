<template>
  <div>
    <div v-if="$store.getters.getSettingsGeneralEditMode">
      <!-- Create platform dialog. -->
      <create-platform
        v-show="createPlatformDialog"
        :group-platform="$route.params.id"
        @close="createPlatformClose()"
      />
      <!-- Edit platform dialog. -->
      <edit-platform
        v-show="editPlatformDialog"
        :group-platform="platform.parent"
        @close="editPlatformClose()"
      />
      <!-- Delete platform allowed dialog. -->
      <vi-dialog-box
        v-if="!platform.platforms.length > 0"
        v-show="deletePlatformDialog"
        @accept="deletePlatformClose()"
        @cancel="deletePlatformOpen()"
        dialog-actions="OkCancel"
      >
        Delete platform group <b>'{{ platform.name }}'</b> ?
      </vi-dialog-box>
      <!-- Delete platform denied dialog. -->
      <vi-dialog-box
        v-else
        v-show="deletePlatformDialog"
        @accept="deletePlatformOpen()"
      >
        You can't delete a group if it has platforms on it.
        <br />
        Delete the platforms individually first.
      </vi-dialog-box>
    </div>
    <!-- Navigation bar. -->
    <vi-nav-bar
      :nav-title="platform.name"
      :nav-subtitle="platform.count + ' elements'"
    >
      <div
        v-if="$store.getters.getSettingsGeneralEditMode"
        class="flex items-center ml-2 space-x-1"
      >
        <!-- Open create platform dialog. -->
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
    <!-- Show platforms list. -->
    <div class="flex flex-col max-h-content min-h-content overflow-hidden">
      <vi-list
        :list-display="2"
        :list-remote-method="loadPlatformNext"
      >
        <li
          v-for="platform in platform.platforms"
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
</template>

<script>
// Import Vue functions.
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
// Import database controllers functions.
import { deletePlatform, getPlatform, getPlatformsGroup, getPlatformsGroupCount, getPlatformsGroupAllSearch } from '@/database/controllers/Platform'
// Import form components.
import CreatePlatform from '@/components/Create/CreatePlatform.vue'
import EditPlatform from '@/components/Edit/EditPlatform.vue'
import ListSettings from '@/components/List/ListSettings/ListSettings.vue'

export default {
  name: 'ListPlatformsGroup',
  components: {
    CreatePlatform,
    EditPlatform,
    ListSettings
  },
  setup() {
    // Instantiate Vue elements.
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    // Load platforms list on mounting.
    onMounted(() => { loadPlatform() })

    // Load platforms list.
    let platform = ref({
      name: null,
      parent: null,
      count: null,
      platforms: []
    })
    let paginationIndex = ref(0)
    const paginationCount = 50
    const loadPlatform = () => {
      // Ensure pagination index is reset.
      paginationIndex.value = 0
      // Get platform group.
      getPlatform(route.params.id)
        .then((res) => {
          platform.value.name = res.name
          platform.value.parent = res.parent ? res.parent._id : ''
        })
      // Get first batch of platforms.
      getPlatformsGroup(route.params.id, paginationIndex.value, paginationCount)
        .then((res) => {
          platform.value.platforms = res
          // Set next pagination index.
          paginationIndex.value += paginationCount
        })
      // Get games count.
      getPlatformsGroupCount(route.params.id)
        .then((res) => { platform.value.count = res })
    }
    const loadPlatformNext = () => {
      // Check loaded platforms to avoid duplication.
      if (platform.value.platforms) {
        // Get next batch of platforms.
        getPlatformsGroup(route.params.id, paginationIndex.value, paginationCount)
          .then((res) => {
            platform.value.platforms = platform.value.platforms.concat(res)
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
      // Save data of the current platform group into the store.
      store.commit('setPlatformParent', route.params.id)
      // Open create dialog.
      createPlatformDialog.value = !createPlatformDialog.value
    }
    const createPlatformClose = () => {
      // Reload platforms.
      loadPlatform()
      // Close create dialog.
      createPlatformDialog.value = !createPlatformDialog.value
    }
    let editPlatformDialog = ref(false)
    const editPlatformOpen = () => {
      // Restore the data on the store.
      store.commit('resetPlatformForm')
      // Save current platform group ID into the store.
      store.state.platformSelected = route.params.id
      // Save data of the current platform group into the store.
      store.commit('setPlatformName', platform.value.name)
      store.commit('setPlatformParent', platform.value.parent)
      // Open edit dialog.
      editPlatformDialog.value = !editPlatformDialog.value
    }
    const editPlatformClose = () => {
      // Reload platforms.
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
      // Delete platform group.
      deletePlatform(route.params.id)
        .then(() => router.back())
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
        getPlatformsGroupAllSearch(paginationIndex.value, paginationCount, route.params.id, query)
          .then((res) => {
            platform.value.platforms = res
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
      loadPlatform()
    }

    return {
      createPlatformClose,
      createPlatformDialog,
      createPlatformOpen,
      deletePlatformClose,
      deletePlatformDialog,
      deletePlatformOpen,
      editPlatformClose,
      editPlatformDialog,
      editPlatformOpen,
      loadPlatformNext,
      platform,
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