<template>
  <!-- Playlists management dialog. -->
  <vi-dialog
    @close="$emit('close')"
    class="pos-initial z-10"
  >
    <!-- Validation error dialog. -->
    <vi-dialog-box
      v-show="validationErrorDialog"
      @accept="validationErrorShow()"
    >
      Select a playlist first.
    </vi-dialog-box>
    <!-- Padding. -->
    <div class="w-80" />
    <!-- Header. -->
    <div class="flex justify-between mb-6 mx-2">
      <!-- Title. -->
      <p class="mr-10 pt-1 text-2xl">Playlists</p>
      <!-- Buttons. -->
      <vi-button
        button-icon="icon-add"
        @click="addPlaylists()"
      />
    </div>
    <!-- Playlists input select. -->
    <vi-select
      v-model="querySelected"
      select-allow-create
      select-clearable
      select-placeholder="Add to or create playlists..."
      select-remote
      :select-remote-method="queryFilter"
      class="w-full"
    >
      <vi-option
        v-for="item in queryResults"
        :key="item._id"
        :option-label="item.name"
        :option-value="item._id"
      />
    </vi-select>
    <!-- Playlists list section. -->
    <div v-if="gamePlaylists.length > 0">
      <!-- Separator. -->
      <div class="bg-theme-200 dark:bg-theme-600 h-0.5 my-5 w-full" />
      <!-- List game playlists. -->
      <div class="font-medium space-y-2">
        <div
          v-for="item in gamePlaylists"
          :key="item"
          :value="item"
        >
          <vi-chip
            chip-click
            chip-large
            @clicked="$router.push({ name: 'Playlist', params: { id: item._id } })"
            @remove="removePlaylists(item._id)"
          >
            {{ item.name }}
          </vi-chip>
        </div>
      </div>
    </div>
  </vi-dialog>
</template>

<script>
// Import Vue functions.
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
// Import database controllers functions.
import { addPlaylist, createPlaylist, getGamePlaylists, getPlaylist, getPlaylists, removePlaylist } from '@/database/controllers/User'

export default {
  name: 'ViewGamePlaylists',
  emits: [
    'close'
  ],
  setup() {
    // Instantiate Vue elements.
    const route = useRoute()

    // Load all playlists on mounting.
    onMounted(() => { resetPlaylists() })

    // Manage game playlists.
    let allPlaylists = ref([])
    let filteredPlaylists = ref([])
    let gamePlaylists = ref([])
    const addPlaylists = () => {
      // Validate required fields.
      if (!querySelected.value) {
        validationErrorShow(); return
      }
      // Check if the playlist exists.
      getPlaylist(querySelected.value)
        .then(async (res) => {
          // Create and/or assign the playlist ID value.
          let selectedPlaylist = res
            ? querySelected.value
            : await createPlaylist({ name: querySelected.value })
          // Add current game to the selected playlist.
          addPlaylist(selectedPlaylist, route.params.id)
            .then(() => { resetPlaylists() })
        })
    }
    const removePlaylists = (id) => {
      // Remove current game from the selected playlist.
      removePlaylist(id, route.params.id)
        .then(() => { updatePlaylists() })
    }
    const updatePlaylists = () => {
      getGamePlaylists(route.params.id)
        .then((res) => {
          // Update current game playlists.
          gamePlaylists.value = res
          // Remove playlists where the current game already is in from selection.
          filteredPlaylists.value = allPlaylists.value
          for (let gamePlaylist of gamePlaylists.value) {
            filteredPlaylists.value = filteredPlaylists.value.filter((res) => res._id != gamePlaylist._id)
          }
          // Reset filter results list.
          queryResults.value = filteredPlaylists.value
          // Reset selected playlist.
          querySelected.value = null
        })
    }
    const resetPlaylists = () => {
      getPlaylists(route.params.id)
        .then((res) => {
          allPlaylists.value = res
          updatePlaylists()
        })
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
      if (filteredPlaylists.value) {
        // Configure the filter parameters.
        const filter = new RegExp(query, 'i')
        // Filter playlists containing the filter query, case insensitive.
        queryResults.value = filteredPlaylists.value.filter((res) => res.name.match(filter))
      }
    }

    return {
      addPlaylists,
      filteredPlaylists,
      gamePlaylists,
      queryFilter,
      queryResults,
      querySelected,
      removePlaylists,
      validationErrorDialog,
      validationErrorShow
    }
  }
}
</script>

<style>
</style>