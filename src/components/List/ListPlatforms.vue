<template>
  <div>
    <!-- Create platform dialog. -->
    <hip-dialog
      v-show="dialog.createPlatform"
      @close="createPlatformClose()"
      class="z-10"
    >
      <!-- Insert create platform form component. -->
      <create-platform @close="createPlatformClose()" />
    </hip-dialog>
    <!-- Navigation bar. -->
    <hip-nav-bar title="Platforms">
      <!-- Open create platform dialog. -->
      <hip-button-nb
        v-show="$store.state.editMode"
        @click="createPlatformOpen()"
        class="el-icon-circle-plus-outline text-2xl"
      ></hip-button-nb>
    </hip-nav-bar>
    <!-- Show platforms list. -->
    <ul class="gap-4 grid grid-cols-4 m-6">
      <li
        v-for="platform in platforms"
        :key="platform._id"
        :value="platform._id"
        @click="$router.push({ name: 'ViewPlatform', params: { id: platform._id } })"
      >
        <!-- Platform card. -->
        <hip-card-sq>
          <h1 class="font-semibold text-xl">{{ platform.name }}</h1>
          <h3>{{ platform.titles }} Titles</h3>
        </hip-card-sq>
      </li>
    </ul>
  </div>
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
      platforms: null,
      dialog: {
        createPlatform: false
      }
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
      // Restore the data on the store.
      this.$store.commit('resetOtherForm')
      // Open create dialog.
      this.dialog.createPlatform = !this.dialog.createPlatform
    },
    createPlatformClose() {
      // Reload platforms.
      this.loadPlatforms()
      // Close create dialog.
      this.dialog.createPlatform = !this.dialog.createPlatform
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