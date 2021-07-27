<template>
  <div>
    <!-- Create game platform dialog. -->
    <hip-dialog
      v-show="dialog.createGamePlatform"
      @close="createGamePlatformClose()"
      class="z-10"
    >
      <!-- Insert create game platform form component. -->
      <create-game-platform @close="createGamePlatformClose()" />
    </hip-dialog>
    <!-- Navigation bar. -->
    <hip-nav-bar>
      <!-- Open create developer dialog. -->
      <hip-button-nb
        v-show="$store.state.editMode"
        @click="createGamePlatformOpen()"
        class="el-icon-circle-plus-outline text-2xl"
      ></hip-button-nb>
      <!-- Padding. -->
      <div class="w-full"></div>
    </hip-nav-bar>
  </div>
</template>

<script>
// Import form components.
import CreateGamePlatform from '../Create/CreateGamePlatform.vue'
// Import UI components.
import {
  HipButtonNb,
  HipCardSq,
  HipDialog,
  HipNavBar
} from '../Component'

export default {
  name: 'ListGames',
  components: {
    // Form components.
    CreateGamePlatform,
    // UI components.
    HipButtonNb,
    HipCardSq,
    HipDialog,
    HipNavBar
  },
  data() {
    return {
      games: null,
      dialog: {
        createGamePlatform: false
      }
    }
  },
  methods: {
    // Create operations.
    createGamePlatformOpen() {
      // Restore the data on the store.
      this.$store.commit('resetGameSelected')
      this.$store.commit('resetGameForm')
      // Open create dialog.
      this.dialog.createGamePlatform = !this.dialog.createGamePlatform
    },
    createGamePlatformClose() {
      // Close create dialog.
      this.dialog.createGamePlatform = !this.dialog.createGamePlatform
    }
  }
}
</script>

<style>
</style>