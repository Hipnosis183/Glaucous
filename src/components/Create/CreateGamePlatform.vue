<template>
  <div class="flex space-x-4">
    <div class="w-1/2">
      <create-game-region-c />
      <button
        class="bg-gray-300 font-semibold mt-6 px-6 py-3 rounded-full text-base text-blue-800"
        @click="onSubmit()"
      >Submit</button>
    </div>
    <div class="w-1/2">
      <create-game-platform-c />
      <create-game-version-c />
    </div>
  </div>
</template>

<script>
import CreateGamePlatformC from './CreateGame/CreateGamePlatformC.vue'
import CreateGameRegionC from './CreateGame/CreateGameRegionC.vue'
import CreateGameVersionC from './CreateGame/CreateGameVersionC.vue'

import { connectDatastore } from '../../database/datastore'
import { newGamePlatform } from '../../database/controllers/Game'

export default {
  name: 'create-game-platform',
  components: {
    CreateGamePlatformC,
    CreateGameRegionC,
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
      // Set datastore and save new game entry.
      connectDatastore(this.$store.state.gameForm.gamePlatform.platform)
        .then(() => newGamePlatform(this.$store.state.gameForm)
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
