<template>
  <div>
    <create-game-region-c></create-game-region-c>
    <create-game-platform-c></create-game-platform-c>
    <create-game-version-c></create-game-version-c>
    <button @click="onSubmit()">Submit</button>
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
      onSubmit () {
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
      '$route'(to, from){
        this.$store.commit('resetGameForm')
      }
    }
  }
</script>

<style>
</style>
