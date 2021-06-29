<template>
  <div class="inline-flex shadow bg-white w-full justify-between">
    <button
      class="bg-gray-300 font-semibold px-6 py-4 text-base text-blue-800"
      @click="onSubmit()"
    >Submit</button>
    <div></div>
  </div>
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
import CreateGameRegionC from './CreateGame/CreateGameRegionC.vue'
import CreateGameVersionC from './CreateGame/CreateGameVersionC.vue'

import { connectDatastore } from '../../database/datastore'
import { newGameRegion } from '../../database/controllers/Game'

export default {
  name: 'create-game-region',
  components: {
    CreateGameRegionC,
    CreateGameVersionC
  },
  methods: {
    onSubmit() {
      // Avoid submitting incomplete form. Temporal.
      for (const prop in this.$store.state.gameForm.gameRegion) {
        if (this.$store.state.gameForm.gameRegion[prop] === null) return
      }
      // Set datastore and save new game entry.
      connectDatastore(this.$route.query.p)
        .then(() => newGameRegion(this.$store.state.gameForm, this.$route.query.id)
          .then(() => this.$router.back())
        )
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
