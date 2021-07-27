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
    <hip-nav-bar>
      <!-- Open create developer dialog. -->
      <hip-button-nb
        v-show="$store.state.editMode"
        @click="createDeveloperOpen()"
        class="el-icon-circle-plus-outline text-2xl"
      ></hip-button-nb>
      <!-- Padding. -->
      <div class="w-full"></div>
    </hip-nav-bar>
    <!-- Show developers list. -->
    <ul class="gap-4 grid grid-cols-4 m-6">
      <li
        v-for="developer in developers"
        :key="developer._id"
        :value="developer._id"
        @click="$router.push({ name: 'ViewDeveloper', params: { id: developer._id } })"
      >
        <!-- Developer card. -->
        <hip-card-sq>
          <h1 class="font-semibold text-blue-800 text-xl">{{ developer.name }}</h1>
          <p class="text-indigo-400">{{ developer.titles }} Titles</p>
        </hip-card-sq>
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