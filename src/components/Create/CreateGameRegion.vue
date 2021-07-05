<template>
  <hip-nav-bar>
    <hip-button-nb @click="onSubmit()">Submit</hip-button-nb>
    <div class="w-full"></div>
  </hip-nav-bar>
  <div class="flex m-6 space-x-6 h-almost">
    <div class="w-full bg-white p-6 rounded-xl shadow leading-loose">
      <div class="flex space-x-4">
        <div class="w-1/2">
          <create-game-region-c />
        </div>
        <div class="w-1/2">
          <create-game-version-c />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HipButtonNb, HipNavBar } from '../Component'

import CreateGameRegionC from './CreateGame/CreateGameRegionC.vue'
import CreateGameVersionC from './CreateGame/CreateGameVersionC.vue'
import { newGameRegion } from '../../database/controllers/Game'

export default {
  name: 'create-game-region',
  components: {
    HipButtonNb,
    HipNavBar,
    CreateGameRegionC,
    CreateGameVersionC
  },
  methods: {
    onSubmit() {
      // Avoid submitting incomplete form. Temporal.
      for (const prop in this.$store.state.gameForm.gameRegion) {
        if (this.$store.state.gameForm.gameRegion[prop] === null) return
      }
      // Save new game entry.
      newGameRegion(this.$store.state.gameForm, this.$route.query.id)
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
