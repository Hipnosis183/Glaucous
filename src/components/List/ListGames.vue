<template>
  <!-- Create game platform dialog. -->
  <hip-dialog
    v-show="dialog.createGamePlatform"
    @close="createGamePlatformClose()"
  >
    <!-- Insert create game platform form component. -->
    <create-game-platform @close="createGamePlatformClose()" />
  </hip-dialog>
  <!-- Navigation bar. -->
  <hip-nav-bar>
    <!-- Open create developer dialog. -->
    <hip-button-nb @click="createGamePlatformOpen()">+</hip-button-nb>
    <!-- Padding. -->
    <div class="w-full"></div>
  </hip-nav-bar>
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
      // Dialog object.
      dialog: {
        createGamePlatform: false
      },
      // Games list.
      games: null
    }
  },
  methods: {
    // Create operations.
    createGamePlatformOpen() {
      // Open create dialog.
      this.dialog.createGamePlatform = !this.dialog.createGamePlatform
    },
    createGamePlatformClose() {
      // Close create dialog.
      this.dialog.createGamePlatform = !this.dialog.createGamePlatform
      // Restore the data on the store.
      this.$store.commit('resetGameForm')
    }
  },
}
</script>

<style>
</style>
