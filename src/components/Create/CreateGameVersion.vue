<template>
  <hip-nav-bar>
    <hip-button-nb @click="onSubmit()">Submit</hip-button-nb>
    <div class="w-full"></div>
  </hip-nav-bar>
  <div class="flex m-6 space-x-6 h-almost">
    <div class="w-full bg-white p-6 rounded-xl shadow leading-loose">
      <create-game-region-c />
    </div>
  </div>
</template>

<script>
import { HipButtonNb, HipNavBar } from '../Component'

import CreateGameVersionC from './CreateGame/CreateGameVersionC.vue'
import { createGame } from '../../database/controllers/Game'

export default {
  name: 'create-game-version',
  components: {
    HipButtonNb,
    HipNavBar,
    CreateGameVersionC
  },
  methods: {
    onSubmit() {
      // Avoid submitting incomplete form. Temporal.
      for (const prop in this.$store.state.gameForm.gamePlatform) {
        if (this.$store.state.gameForm.gamePlatform[prop] === null) return
      }
      for (const prop in this.$store.state.gameForm.gameRegion) {
        if (this.$store.state.gameForm.gameRegion[prop] === null) return
      }
      for (const prop in this.$store.state.gameForm.gameVersion) {
        if (this.$store.state.gameForm.gameVersion[prop] === null) return
      }
      // Save new game entry.
      createGame(this.$store.state.gameForm)
        .then(() => this.$router.back())
    }
  },
  watch: {
    // Watch for route changes to clean the input fields.
    '$route'(to, from) {
      this.$store.commit('resetGameForm')
    }
  }
}
</script>

<style>
</style>
