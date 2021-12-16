<template>
  <div>
    <div v-if="$store.getters.getSettingsGeneralEditMode">
      <!-- Create tag dialog. -->
      <create-tag
        v-show="createTagDialog"
        @close="createTagClose()"
      />
    </div>
    <!-- Navigation bar. -->
    <vi-nav-bar
      nav-title="Tags"
      :nav-subtitle="gameTagsCount + ' elements'"
    >
      <div
        v-if="$store.getters.getSettingsGeneralEditMode"
        class="flex items-center ml-2"
      >
        <!-- Open create tag dialog. -->
        <vi-button-nb
          button-icon="icon-add"
          @click="createTagOpen()"
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
    </vi-nav-bar>
    <!-- Show tags list. -->
    <div class="flex flex-col max-h-content min-h-content overflow-hidden">
      <vi-list
        :list-display="2"
        :list-remote-method="loadTagsNext"
      >
        <li
          v-for="tag in gameTags"
          :key="tag._id"
          :value="tag._id"
          @click="$router.push({ name: 'Tag', params: { id: tag._id } })"
        >
          <!-- Tag card. -->
          <vi-card>
            <div class="flex items-center p-4 space-x-2">
              <h1 class="font-medium">{{ tag.name }}</h1>
              <h3 class="pt-0.5 text-sm">{{ tag.games }} {{ tag.games == 1 ? 'Title' : 'Titles' }}</h3>
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
import { useStore } from 'vuex'
// Import database controllers functions.
import { getGamesTagCount } from '@/database/controllers/Game'
import { getTags, getTagsCount, getTagsSearch } from '@/database/controllers/User'
// Import form components.
import CreateTag from '@/components/Create/CreateTag.vue'
import SettingsLists from '@/components/Settings/SettingsLists.vue'

export default {
  name: 'ListTags',
  components: {
    CreateTag,
    SettingsLists
  },
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Load tags list on mounting.
    onMounted(() => { loadTags() })

    // Load tags list.
    let gameTags = ref([])
    let gameTagsCount = ref(null)
    let paginationIndex = ref(0)
    const paginationCount = 50
    const loadTags = () => {
      // Ensure pagination index is reset.
      paginationIndex.value = 0
      // Get first batch of tags.
      getTags(false, paginationIndex.value, paginationCount)
        .then(async (res) => {
          gameTags.value = res
          // Set next pagination index.
          paginationIndex.value += paginationCount
          // Get game count for each tag.
          for (let [i, tag] of res.entries()) {
            gameTags.value[i].games = await getGamesTagCount(tag._id)
          }
        })
      // Get playlists count.
      getTagsCount()
        .then((res) => { gameTagsCount.value = res })
    }
    const loadTagsNext = () => {
      // Check loaded tags to avoid duplication.
      if (gameTags.value) {
        // Get next batch of tags.
        getTags(false, paginationIndex.value, paginationCount)
          .then(async (res) => {
            gameTags.value = gameTags.value.concat(res)
            // Set next pagination index.
            paginationIndex.value += paginationCount
            // Get game count for each tag.
            for (let [i, tag] of res.entries()) {
              let index = paginationIndex.value - paginationCount + i
              gameTags.value[index].games = await getGamesTagCount(tag._id)
            }
          })
      }
    }

    // Manage tag operations.
    let createTagDialog = ref(false)
    const createTagOpen = () => {
      // Restore the data on the store.
      store.commit('resetTagForm')
      // Open create dialog.
      createTagDialog.value = !createTagDialog.value
    }
    const createTagClose = () => {
      // Reload tags.
      loadTags()
      // Close create dialog.
      createTagDialog.value = !createTagDialog.value
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
        // Search for tags matching the query.
        getTagsSearch(paginationIndex.value, paginationCount, query)
          .then((res) => {
            gameTags.value = res
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
      // Reload tags list.
      loadTags()
    }

    return {
      createTagClose,
      createTagDialog,
      createTagOpen,
      gameTags,
      gameTagsCount,
      loadTagsNext,
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