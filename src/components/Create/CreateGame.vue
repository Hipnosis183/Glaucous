<template>
  <div>
    <create-game-region></create-game-region>
    <create-game-platform></create-game-platform>
    <create-game-version></create-game-version>
    <button @click="onSubmit()">Submit</button>
    <button @click="onDone()">Back</button>
  </div>
</template>

<script>
  import CreateGamePlatform from './CreateGame/CreateGamePlatform.vue'
  import CreateGameRegion from './CreateGame/CreateGameRegion.vue'
  import CreateGameVersion from './CreateGame/CreateGameVersion.vue'

  import { connectDatastore } from '../../database/datastore'
  import { createGame } from '../../database/controllers/Game'

  export default {
    name: 'create-game',
    components: {
      CreateGamePlatform,
      CreateGameRegion,
      CreateGameVersion
    },
    methods: {
      onDone () {
        // Clean input fields.
        this.$store.commit('resetGameForm')
        // Go to previous page.
        this.$router.back()
      },
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
          .then(() => createGame(this.$store.state.gameForm)
            .then(() => this.onDone())
          )
      }
    }
  }
</script>

<style>
</style>
