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
        class="el-icon-circle-plus-outline text-2xl"
      ></hip-button-nb>
    </hip-nav-bar>
    <!-- Show developers list. -->
    <div class="h-content m-6">
      <div class="flex flex-col max-h-content min-h-content overflow-hidden">
        <div class="flex-1 no-scrollbar overflow-y-scroll rounded-xl">
          <hip-list :remote-method="loadDevelopersNext">
            <li
              v-for="developer in developers"
              :key="developer._id"
              :value="developer._id"
              @click="$router.push({ name: 'ViewDeveloper', params: { id: developer._id } })"
            >
              <!-- Developer card. -->
              <hip-card>
                <div>
                  <h1 class="font-semibold text-xl">{{ developer.name }}</h1>
                  <h3>{{ developer.titles }} Titles</h3>
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
// Import form components.
import CreateDeveloper from '../Create/CreateDeveloper.vue'
// Import UI components.
import {
  HipButtonNb,
  HipCard,
  HipDialog,
  HipList,
  HipNavBar
} from '@/components/Component'
// Import database controllers functions.
import { getDevelopers } from '@/database/controllers/Developer'

// Import Vue functions.
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ListDevelopers',
  components: {
    // Form components.
    CreateDeveloper,
    // UI components.
    HipButtonNb,
    HipCard,
    HipDialog,
    HipList,
    HipNavBar
  },
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Load developers list on mounting.
    onMounted(() => { loadDevelopers() })

    // Load developers list.
    let developers = ref(null)
    const paginationCount = 50
    let paginationIndex = ref(0)
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

    return {
      createDeveloperClose,
      createDeveloperDialog,
      createDeveloperOpen,
      developers,
      loadDevelopersNext
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