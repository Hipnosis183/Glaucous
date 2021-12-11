<template>
  <!-- Validation error dialog. -->
  <vi-dialog-box
    v-show="validationErrorDialog"
    @accept="validationErrorShow()"
    class="z-20"
  >
    Select a developer first.
  </vi-dialog-box>
  <!-- Expanded developers management dialog. -->
  <vi-dialog
    v-show="expandedDevelopersDialog"
    @close="expandedDevelopersShow()"
    class="pos-initial z-10"
  >
    <!-- Padding. -->
    <div class="w-80" />
    <!-- Header. -->
    <div class="flex justify-between mb-6 mx-2">
      <!-- Title. -->
      <p class="mr-10 pt-1 text-2xl">Developers | Publishers</p>
      <!-- Buttons. -->
      <vi-button
        button-icon="icon-add"
        @click="addDevelopers()"
      />
    </div>
    <!-- Developer input select. -->
    <vi-select
      v-model="querySelected"
      select-allow-create
      select-clearable
      select-placeholder="Add or create a developer..."
      select-remote
      :select-remote-method="querySearch"
      class="w-full"
    >
      <vi-option
        v-for="item in queryResults"
        :key="item._id"
        :option-label="item.name"
        :option-value="item._id"
      />
    </vi-select>
    <!-- Developers list section. -->
    <div v-if="developers.length > 0">
      <!-- Separator. -->
      <div class="bg-theme-200 dark:bg-theme-600 h-0.5 my-5 w-full" />
      <!-- List game developers. -->
      <div class="font-medium space-y-2">
        <div
          v-for="(item, index) in developers"
          :key="item"
          :value="item"
        >
          <vi-chip
            chip-large
            @remove="removeDevelopers(index)"
          >
            {{ item.name }}
          </vi-chip>
        </div>
      </div>
    </div>
  </vi-dialog>
  <!-- Developers management form. -->
  <div class="flex items-end space-x-2">
    <!-- Developer input select. -->
    <vi-select
      v-model="querySelected"
      select-allow-create
      select-clearable
      select-label="Developers"
      select-placeholder="Add or create a developer..."
      select-remote
      :select-remote-method="querySearch"
      class="w-full"
    >
      <vi-option
        v-for="item in queryResults"
        :key="item._id"
        :option-label="item.name"
        :option-value="item._id"
      />
      <template #append>
        <!-- Buttons -->
        <vi-input-button @click="addDevelopers()">
          <vi-icon class="w-6">
            <icon-add />
          </vi-icon>
        </vi-input-button>
        <vi-input-button
          input-last
          @click="expandedDevelopersShow()"
        >
          <vi-icon class="w-6">
            <icon-edit />
          </vi-icon>
        </vi-input-button>
      </template>
    </vi-select>
  </div>
</template>

<script>
// Import Vue functions.
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
// Import database developer functions.
import { getDeveloper, getDeveloperByName } from '@/database/controllers/Developer'

export default {
  name: 'FormGamePlatformDevelopers',
  setup(props) {
    // Instantiate Vue elements.
    const store = useStore()

    // Load all developers on mounting.
    onMounted(() => { updateDevelopers() })
    const developersStore = computed(() => { return store.state.gameForm.gamePlatform.developers })
    watch(() => developersStore.value, () => { updateDevelopers() })

    // Developers input operations.
    let developers = ref([])
    const addDevelopers = () => {
      // Validate required fields.
      if (!querySelected.value) {
        validationErrorShow(); return
      }
      // Save developer into the store.
      store.commit('setGamePlatformDevelopersAdd', querySelected.value)
      // Reset developer input.
      querySelected.value = null
      // Update game developers list.
      updateDevelopers()
    }
    const removeDevelopers = (id) => {
      // Remove developer from the store.
      store.commit('setGamePlatformDevelopersRemove', id)
      // Reset developer input.
      querySelected.value = null
      // Update game developers list.
      updateDevelopers()
    }
    const updateDevelopers = async () => {
      // Manage game developers.
      let listDevelopers = []
      for (let developer of developersStore.value) {
        await getDeveloper(developer).then((res) => {
          // Make a temporary developer object to display if it was created.
          listDevelopers.push(res ? res : { _id: developer, name: developer })
        })
      }
      developers.value = listDevelopers
    }
    let expandedDevelopersDialog = ref(false)
    const expandedDevelopersShow = () => {
      // Toggle expanded developers dialog.
      expandedDevelopersDialog.value = !expandedDevelopersDialog.value
    }
    let validationErrorDialog = ref(false)
    const validationErrorShow = () => {
      // Toggle validation error dialog.
      validationErrorDialog.value = !validationErrorDialog.value
    }

    // Manage search queries.
    let queryResults = ref([])
    let querySelected = ref('')
    const querySearch = (query) => {
      // Only start search from two characters onwards.
      if (query !== '' && query.length > 1) {
        // Search for developers matching the query.
        getDeveloperByName(query)
          .then((res) => {
            // Store results.
            queryResults.value = res.filter((res) => !developersStore.value.includes(res._id))
          })
      } else {
        // Keep results empty.
        queryResults.value = []
      }
    }

    return {
      addDevelopers,
      developers,
      developersStore,
      expandedDevelopersDialog,
      expandedDevelopersShow,
      queryResults,
      querySearch,
      querySelected,
      removeDevelopers,
      validationErrorDialog,
      validationErrorShow
    }
  }
}
</script>

<style>
</style>