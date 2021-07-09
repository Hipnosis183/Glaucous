<template>
  <!-- Create developer dialog. -->
  <hip-dialog
    v-show="dialog.createDeveloper"
    @close="createDeveloperClose()"
  >
    <!-- Insert create developer form component. -->
    <create-developer @close="createDeveloperClose()" />
  </hip-dialog>
  <!-- Navigation bar. -->
  <hip-nav-bar>
    <!-- Open create developer dialog. -->
    <hip-button-nb @click="createDeveloperOpen()">+</hip-button-nb>
    <!-- Padding. -->
    <div class="w-full"></div>
  </hip-nav-bar>
  <!-- Show developers list. -->
  <ul class="grid grid-cols-4 gap-4 m-6">
    <li
      v-for="developer in developers"
      :key="developer._id"
      :value="developer._id"
      @click="$router.push({ name: 'ViewDeveloper', params: { id: developer._id } })"
    >
      <!-- Developer card. -->
      <hip-card-sq>
        <h1 class="text-xl text-blue-800 font-semibold">{{ developer.name }}</h1>
        <p class="text-indigo-400">{{ developer.titles }} Titles</p>
      </hip-card-sq>
    </li>
  </ul>
</template>

<script>
// Import form components.
import CreateDeveloper from '../Create/CreateDeveloper.vue'
// Import UI components.
import {
  HipButtonNb,
  HipCardSq,
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
    HipCardSq,
    HipDialog,
    HipNavBar
  },
  data() {
    return {
      // Dialog object.
      dialog: {
        createDeveloper: false
      },
      // Developers list.
      developers: null
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
      // Open create dialog.
      this.dialog.createDeveloper = !this.dialog.createDeveloper
    },
    createDeveloperClose() {
      // Reload developers.
      this.loadDevelopers()
      // Close create dialog.
      this.dialog.createDeveloper = !this.dialog.createDeveloper
      // Restore the data on the store.
      this.$store.commit('resetOtherForm')
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
