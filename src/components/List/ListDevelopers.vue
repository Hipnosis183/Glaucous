<template>
  <div>
    <!-- Create developer dialog. -->
    <hip-dialog
      v-show="dialog.createDeveloper"
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
        v-show="$store.state.editMode"
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
} from '../Component'
// Import database controllers functions.
import { getDevelopers } from '../../database/controllers/Developer'

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
  data() {
    return {
      developers: null,
      pagination: {
        index: 0,
        count: 50
      },
      dialog: {
        createDeveloper: false
      }
    }
  },
  methods: {
    loadDevelopers() {
      // Ensure pagination index is reset.
      this.pagination.index = 0
      // Get first batch of developers.
      getDevelopers(this.pagination.index, this.pagination.count)
        .then(res => {
          this.developers = res
          // Set next pagination index.
          this.pagination.index += this.pagination.count
        })
    },
    loadDevelopersNext() {
      // Check loaded developers to avoid duplication.
      if (this.developers) {
        // Get next batch of developers.
        getDevelopers(this.pagination.index, this.pagination.count)
          .then(res => {
            this.developers = this.developers.concat(res)
            // Set next pagination index.
            this.pagination.index += this.pagination.count
          })
      }
    },
    // Create operations.
    createDeveloperOpen() {
      // Restore the data on the store.
      this.$store.commit('resetDeveloperForm')
      // Open create dialog.
      this.dialog.createDeveloper = !this.dialog.createDeveloper
    },
    createDeveloperClose() {
      // Reload developers.
      this.loadDevelopers()
      // Close create dialog.
      this.dialog.createDeveloper = !this.dialog.createDeveloper
    }
  },
  mounted() {
    // Load developers list.
    this.loadDevelopers()
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