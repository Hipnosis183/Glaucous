<template>
  <div>
    <hip-dialog
      v-show="create"
      @close="createGamePlatformClose()"
    >
      <create-game-platform @close="createGamePlatformClose()" />
    </hip-dialog>
    <hip-nav-bar>
      <hip-button-nb @click="createGamePlatformOpen()">+</hip-button-nb>
      <div class="w-full"></div>
    </hip-nav-bar>
  </div>
</template>

<script>
import { HipButtonNb, HipCardSq, HipDialog, HipNavBar } from '../Component'

import CreateGamePlatform from '../Create/CreateGamePlatform.vue'

export default {
  name: 'list-games',
  components: {
    HipButtonNb,
    HipCardSq,
    HipDialog,
    HipNavBar,
    CreateGamePlatform
  },
  data() {
    return {
      create: false,
      games: null
    }
  },
  methods: {
    createGamePlatformOpen() {
      // Open create dialog.
      this.create = !this.create
    },
    createGamePlatformClose() {
      // Close create dialog.
      this.create = !this.create
      // Restore the data on the store.
      this.$store.commit('resetGameForm')
    }
  },
}
</script>

<style>
</style>
