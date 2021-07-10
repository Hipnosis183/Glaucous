<template>
  <!-- Create platform dialog. -->
  <hip-dialog
    v-show="dialog.createPlatform"
    @close="createPlatformClose()"
  >
    <!-- Insert create platform form component. -->
    <create-platform @close="createPlatformClose()" />
  </hip-dialog>
  <!-- Navigation bar. -->
  <hip-nav-bar>
    <!-- Open create platform dialog. -->
    <hip-button-nb
      class="el-icon-circle-plus-outline text-xl"
      @click="createPlatformOpen()"
    ></hip-button-nb>
    <!-- Padding. -->
    <div class="w-full"></div>
  </hip-nav-bar>
  <!-- Show platforms list. -->
  <ul class="grid grid-cols-4 gap-4 m-6">
    <li
      v-for="platform in platforms"
      :key="platform._id"
      :value="platform._id"
      @click="$router.push({ name: 'ViewPlatform', params: { id: platform._id } })"
    >
      <!-- Platform card. -->
      <hip-card-sq>
        <h1 class="text-xl text-blue-800 font-semibold">{{ platform.name }}</h1>
        <p class="text-indigo-400">{{ platform.titles }} Titles</p>
      </hip-card-sq>
    </li>
  </ul>
</template>

<script>
// Import form components.
import CreatePlatform from '../Create/CreatePlatform.vue'
// Import UI components.
import {
  HipButtonNb,
  HipCardSq,
  HipDialog,
  HipNavBar
} from '../Component'
// Import database controllers functions.
import { getPlatforms } from '../../database/controllers/Platform'

export default {
  name: 'ListPlatforms',
  components: {
    // Form components.
    CreatePlatform,
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
        createPlatform: false
      },
      // Platforms list.
      platforms: null
    }
  },
  methods: {
    loadPlatforms() {
      // Get all platforms.
      getPlatforms()
        .then(res => this.platforms = res)
    },
    // Create operations.
    createPlatformOpen() {
      // Open create dialog.
      this.dialog.createPlatform = !this.dialog.createPlatform
    },
    createPlatformClose() {
      // Reload platforms.
      this.loadPlatforms()
      // Close create dialog.
      this.dialog.createPlatform = !this.dialog.createPlatform
      // Restore the data on the store.
      this.$store.commit('resetOtherForm')
    }
  },
  mounted() {
    // Load platforms list.
    this.loadPlatforms()
  }
}
</script>

<style>
</style>
