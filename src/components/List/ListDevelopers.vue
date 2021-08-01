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
    <ul class="gap-4 grid grid-cols-view m-6">
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
    </ul>
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
    HipNavBar
  },
  data() {
    return {
      developers: null,
      dialog: {
        createDeveloper: false
      }
    }
  },
  methods: {
    loadDevelopers() {
      // Get all developers.
      getDevelopers()
        .then(res => this.developers = res)
    },
    // Create operations.
    createDeveloperOpen() {
      // Restore the data on the store.
      this.$store.commit('resetOtherForm')
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

<style>
</style>