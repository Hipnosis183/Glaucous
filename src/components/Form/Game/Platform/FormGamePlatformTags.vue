<template>
  <!-- Validation error dialog. -->
  <vi-dialog-box
    v-show="validationErrorDialog"
    @accept="validationErrorShow()"
    class="z-20"
  >
    Select a tag first.
  </vi-dialog-box>
  <!-- Expanded tags management dialog. -->
  <vi-dialog
    v-show="expandedTagsDialog"
    @close="expandedTagsShow()"
    class="pos-initial z-10"
  >
    <!-- Padding. -->
    <div class="w-80" />
    <!-- Header. -->
    <div class="flex justify-between mb-6 mx-2">
      <!-- Title. -->
      <p class="mr-10 pt-1 text-2xl">Tags</p>
      <!-- Buttons. -->
      <vi-button-icon @click="addTags()">
        <vi-icon class="w-6">
          <icon-add />
        </vi-icon>
      </vi-button-icon>
    </div>
    <!-- Tags input select. -->
    <vi-select
      v-model="querySelected"
      allow-create
      clearable
      placeholder="Add or create tags..."
      remote
      :remote-method="queryFilter"
      class="w-full"
    >
      <vi-option
        v-for="item in queryResults"
        :key="item._id"
        :label="item.name"
        :value="item._id"
      />
    </vi-select>
    <!-- Tags list section. -->
    <div v-if="gameTags.length > 0">
      <!-- Separator. -->
      <div class="bg-theme-200 dark:bg-theme-600 h-0.5 my-5 w-full" />
      <!-- List game tags. -->
      <div class="font-medium space-y-2">
        <div
          v-for="(item, index) in gameTags"
          :key="item"
          :value="item"
        >
          <vi-chip
            large
            @remove="removeTags(index)"
          >
            {{ item.name }}
          </vi-chip>
        </div>
      </div>
    </div>
  </vi-dialog>
  <!-- Tags management form. -->
  <div class="flex items-end space-x-2">
    <!-- Tags input select. -->
    <vi-select
      v-model="querySelected"
      allow-create
      clearable
      label="Tags"
      placeholder="Add or create tags..."
      remote
      :remote-method="queryFilter"
      class="w-full"
    >
      <vi-option
        v-for="item in queryResults"
        :key="item._id"
        :label="item.name"
        :value="item._id"
      />
    </vi-select>
    <!-- Buttons -->
    <vi-button-icon @click="addTags()">
      <vi-icon class="w-6">
        <icon-add />
      </vi-icon>
    </vi-button-icon>
    <vi-button-icon @click="expandedTagsShow()">
      <vi-icon class="w-6">
        <icon-edit />
      </vi-icon>
    </vi-button-icon>
  </div>
</template>

<script>
// Import Vue functions.
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
// Import database platform functions.
import { getTag, getTags } from '@/database/controllers/User'

export default {
  name: 'FormGamePlatformTags',
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Load all tags on mounting.
    onMounted(() => { updateTags() })
    const gameTagsStore = computed(() => { return store.state.gameForm.gamePlatform.gameTags })
    watch(() => gameTagsStore.value, () => { updateTags() })

    // Manage tags operations.
    let allTags = ref([])
    let filteredTags = ref([])
    let gameTags = ref([])
    const addTags = () => {
      // Validate required fields.
      if (!querySelected.value) {
        validationErrorShow()
        return
      }
      // Save tag into the store.
      store.commit('setGamePlatformTagsAdd', querySelected.value)
      // Reset tag input.
      querySelected.value = null
      // Update global and game tags lists.
      updateTags()
    }
    const removeTags = (id) => {
      // Remove tag from the store.
      store.commit('setGamePlatformTagsRemove', id)
      // Reset tag input.
      querySelected.value = null
      // Update global and game tags lists.
      updateTags()
    }
    const updateTags = async () => {
      // Manage game tags.
      let listTags = []
      for (let tag of gameTagsStore.value) {
        await getTag(tag).then((res) => {
          // Make a temporary tag object to display if it was created.
          listTags.push(res ? res : { _id: tag, name: tag })
        })
      }
      // Set the game tags list.
      gameTags.value = listTags
      // Reload all tags.
      getTags().then((res) => {
        allTags.value = res
        // Update search results list.
        filteredTags.value = res.filter((res) => !gameTagsStore.value.includes(res._id))
        queryResults.value = filteredTags.value
      })
    }
    let expandedTagsDialog = ref(false)
    const expandedTagsShow = () => {
      // Toggle expanded tags dialog.
      expandedTagsDialog.value = !expandedTagsDialog.value
    }
    let validationErrorDialog = ref(false)
    const validationErrorShow = () => {
      // Toggle validation error dialog.
      validationErrorDialog.value = !validationErrorDialog.value
    }

    // Manage filter queries.
    let queryResults = ref('')
    let querySelected = ref('')
    const queryFilter = (query) => {
      if (filteredTags.value) {
        // Configure the filter parameters.
        const filter = new RegExp(query, 'i')
        // Filter tags containing the filter query, case insensitive.
        queryResults.value = filteredTags.value.filter((res) => res.name.match(filter))
      }
    }

    return {
      addTags,
      expandedTagsDialog,
      expandedTagsShow,
      gameTags,
      gameTagsStore,
      queryFilter,
      queryResults,
      querySelected,
      removeTags,
      validationErrorDialog,
      validationErrorShow
    }
  }
}
</script>

<style>
</style>