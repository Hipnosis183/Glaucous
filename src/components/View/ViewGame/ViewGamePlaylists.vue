<template>
  <!-- Playlists management dialog. -->
  <vi-dialog
    @close="$emit('close')"
    class="z-10"
  >
    <!-- Validation error dialog. -->
    <vi-dialog-box
      v-show="validationErrorDialog"
      @accept="validationErrorShow()"
    >
      Complete the required field.
    </vi-dialog-box>
    <!-- Padding. -->
    <div class="w-80" />
    <!-- Form header. -->
    <div class="flex justify-between mb-6 mx-2">
      <!-- Form title. -->
      <p class="mr-10 pt-1 text-2xl">Playlists</p>
      <!-- Form buttons. -->
      <vi-button-icon @click="addPlaylists()">
        <vi-icon class="w-6">
          <icon-add />
        </vi-icon>
      </vi-button-icon>
    </div>
    <vi-select
      v-model="querySelected"
      clearable
      placeholder="Filter..."
      remote
      :remote-method="queryFilter"
      class="w-full"
    >
      <vi-option
        v-for="item in queryResults"
        :key="item._id"
        :label="item.name"
        :value="item._id"
      >
      </vi-option>
    </vi-select>
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
            large
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
import { addPlaylist, getGamePlaylists, getPlaylists, removePlaylist } from '@/database/controllers/User'

export default {
  name: 'ViewGamePlaylists',
  emits: [
    'close'
  ],
  setup() {
    // Instantiate Vue elements.
    const route = useRoute()

    // Load all playlists on mounting.
    onMounted(() => {
      getPlaylists(route.params.id)
        .then((res) => {
          allPlaylists.value = res
          updatePlaylists()
        })
    })

    // Manage game playlists.
    let allPlaylists = ref([])
    let filteredPlaylists = ref([])
    let gamePlaylists = ref([])
    const addPlaylists = () => {
      // Validate required fields.
      if (!querySelected.value) {
        validationErrorShow()
        return
      }
      // Add current game to the selected playlist.
      addPlaylist(querySelected.value, route.params.id)
        .then(() => { updatePlaylists() })
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
    let validationErrorDialog = ref(false)
    const validationErrorShow = () => {
      // Toggle validation error dialog.
      validationErrorDialog.value = !validationErrorDialog.value
    }

    // Manage filter queries.
    let queryResults = ref('')
    let querySelected = ref('')
    const queryFilter = (query) => {
      // Configure the filter parameters.
      const filter = new RegExp(query, 'i')
      // Filter playlists containing the filter query, case insensitive.
      queryResults.value = filteredPlaylists.value.filter((res) => res.name.match(filter))
    }

    return {
      addPlaylists,
      allPlaylists,
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