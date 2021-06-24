<template>
  <div>
    <create-game-region-c></create-game-region-c>
    <create-game-version-c></create-game-version-c>
    <button @click="onSubmit()">Submit</button>
    <button @click="onDone()">Back</button>
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
      onDone () {
        // Clean input fields.
        this.$store.commit('resetGameForm')
        // Go to previous page.
        this.$router.back()
      },
      onSubmit () {
        // Avoid submitting incomplete form. Temporal.
        for (const prop in this.$store.state.gameForm.gameRegion) {
          if (this.$store.state.gameForm.gameRegion[prop] === null) return
        }
        for (const prop in this.$store.state.gameForm.gameVersion) {
          if (this.$store.state.gameForm.gameVersion[prop] === null) return
        }
        // Set datastore and save new game entry.
        connectDatastore(this.$route.query.p)
          .then(() => newGameRegion(this.$store.state.gameForm, this.$route.query.id)
            .then(() => this.onDone())
          )
      }
    }
  }
</script>

<style>
</style>
