<template>
  <!-- Validation error dialog. -->
  <vi-dialog-box
    v-show="validationErrorDialog"
    @accept="validationErrorShow()"
    class="z-20"
  >
    Select a developer first.
  </vi-dialog-box>
  <!-- Collision error dialog. -->
  <vi-dialog-box
    v-show="collisionErrorDialog"
    @accept="collisionErrorShow()"
    class="z-20"
  >
    The selected developer is already in the indicated list.
  </vi-dialog-box>
  <!-- Expanded developers management dialog. -->
  <vi-dialog
    v-show="expandedDevelopersDialog"
    @close="expandedDevelopersClose()"
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
        @click="isPublisher ? addPublishers() : addDevelopers()"
      />
    </div>
    <div class="flex space-x-4">
      <!-- Developer input select. -->
      <vi-select
        v-model="querySelected"
        select-allow-create
        select-clearable
        select-label="Name"
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
      <!-- Publisher switch input. -->
      <vi-switch
        v-model="isPublisher"
        switch-label="Publish"
      />
    </div>
    <!-- Developers list section. -->
    <div v-if="developers.length > 0">
      <!-- Separator. -->
      <div class="bg-theme-200 dark:bg-theme-600 h-0.5 my-5 w-full" />
      <!-- Subtitle. -->
      <p class="pb-2 pl-2">Developers</p>
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
    <!-- Publishers list section. -->
    <div v-if="publishers.length > 0">
      <!-- Separator. -->
      <div class="bg-theme-200 dark:bg-theme-600 h-0.5 my-5 w-full" />
      <!-- Subtitle. -->
      <p class="pb-2 pl-2">Publishers</p>
      <!-- List game publishers. -->
      <div class="font-medium space-y-2">
        <div
          v-for="(item, index) in publishers"
          :key="item"
          :value="item"
        >
          <vi-chip
            chip-large
            @remove="removePublishers(index)"
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
        <vi-input-button @click="isPublisher ? addPublishers() : addDevelopers()">
          <vi-icon class="w-6">
            <icon-add />
          </vi-icon>
        </vi-input-button>
        <vi-input-button
          input-last
          @click="expandedDevelopersOpen()"
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

    // Load all developers and publishers on mounting.
    onMounted(() => { updateDevelopers(); updatePublishers() })
    const developersStore = computed(() => { return store.state.gameForm.gamePlatform.developers })
    const publishersStore = computed(() => { return store.state.gameForm.gamePlatform.publishers })
    watch(() => developersStore.value, () => { updateDevelopers() })
    watch(() => publishersStore.value, () => { updatePublishers() })

    // Developers input operations.
    let developers = ref([])
    const addDevelopers = () => {
      // Validate required fields.
      if (!querySelected.value) {
        validationErrorShow(); return
      }
      // Check for developers already in the list.
      if (developersStore.value.includes(querySelected.value)) {
        collisionErrorShow(); return
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
      developers.value = listDevelopers.sort(sortDevelopersList)
    }
    const sortDevelopersList = (a, b) => {
      // Compare function that returns natural ordered elements.
      return a.name.localeCompare(b.name, navigator.language, { numeric: true, ignorePunctuation: true })
    }
    let expandedDevelopersDialog = ref(false)
    const expandedDevelopersOpen = () => {
      // Toggle expanded developers dialog.
      expandedDevelopersDialog.value = !expandedDevelopersDialog.value
    }
    const expandedDevelopersClose = () => {
      // Reset publisher toggle.
      setTimeout(() => { isPublisher.value = false }, 500)
      // Toggle expanded developers dialog.
      expandedDevelopersDialog.value = !expandedDevelopersDialog.value
    }
    let collisionErrorDialog = ref(false)
    const collisionErrorShow = () => {
      // Toggle collision error dialog.
      collisionErrorDialog.value = !collisionErrorDialog.value
    }
    let validationErrorDialog = ref(false)
    const validationErrorShow = () => {
      // Toggle validation error dialog.
      validationErrorDialog.value = !validationErrorDialog.value
    }

    // Publishers input operations.
    let isPublisher = ref(false)
    let publishers = ref([])
    const addPublishers = () => {
      // Validate required fields.
      if (!querySelected.value) {
        validationErrorShow(); return
      }
      // Check for publishers already in the list.
      if (publishersStore.value.includes(querySelected.value)) {
        collisionErrorShow(); return
      }
      // Save publisher into the store.
      store.commit('setGamePlatformPublishersAdd', querySelected.value)
      // Reset publisher input.
      querySelected.value = null
      // Update game publishers list.
      updatePublishers()
    }
    const removePublishers = (id) => {
      // Remove publisher from the store.
      store.commit('setGamePlatformPublishersRemove', id)
      // Reset publisher input.
      querySelected.value = null
      // Update game publishers list.
      updatePublishers()
    }
    const updatePublishers = async () => {
      // Manage game publishers.
      let listPublishers = []
      for (let publisher of publishersStore.value) {
        await getDeveloper(publisher).then((res) => {
          // Make a temporary publisher object to display if it was created.
          listPublishers.push(res ? res : { _id: publisher, name: publisher })
        })
      }
      publishers.value = listPublishers
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
            queryResults.value = res
          })
      } else {
        // Keep results empty.
        queryResults.value = []
      }
    }

    return {
      addDevelopers,
      addPublishers,
      collisionErrorDialog,
      collisionErrorShow,
      developers,
      developersStore,
      expandedDevelopersClose,
      expandedDevelopersDialog,
      expandedDevelopersOpen,
      isPublisher,
      publishers,
      publishersStore,
      queryResults,
      querySearch,
      querySelected,
      removeDevelopers,
      removePublishers,
      validationErrorDialog,
      validationErrorShow
    }
  }
}
</script>

<style>
</style>