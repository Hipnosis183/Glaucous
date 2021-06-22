<template>
  <div>
    <label for="developer">Developer:</label>
    <select v-model="developer">
      <option
      v-for="d in developers"
      :key="d._id"
      :value="d._id"
      >{{ d.name }}</option>
    </select>
    <br/>
    <label for="platform">Platform:</label>
    <select v-model="platform">
      <option
      v-for="p in platforms"
      :key="p._id"
      :value="p._id"
      >{{ p.name }}</option>
    </select>
    <br/>
    <label for="releaseYear">Release Year:</label>
    <input id="releaseYear" v-model="releaseYear">
    <br/>
    <label for="numberPlayers">Number of Players:</label>
    <input id="numberPlayers" v-model="numberPlayers">
    <br/>
    <label for="latestVersion">Latest Version:</label>
    <input id="latestVersion" v-model="latestVersion">
    <br/>
  </div>
</template>

<script>
  import { connectDatastore } from '../../../database/datastore'
  import { getDevelopers } from '../../../database/controllers/Developer'
  import { getPlatforms } from '../../../database/controllers/Platform'

  export default {
    name: 'create-game-platform',
    data () {
      return {
        developers: null,
        platforms: null
      }
    },
    mounted () {
      // Select platform from parent page.
      this.platform = this.$route.query.p
      ? this.$route.query.p : null
      // Select developer from parent page.
      this.developer = this.$route.query.d
      ? this.$route.query.d : null
      
      // Set datastore and get developers and platforms.
      connectDatastore().then(() => {
        getDevelopers()
          .then(res => this.developers = res)
        getPlatforms()
          .then(res => this.platforms = res)
      })
    },
    computed: {
      developer: {
        get() { return this.$store.state.gameForm.gamePlatform.developer },
        set(value) { this.$store.commit('setGamePlatformDeveloper', value) }
      },
      platform: {
        get() { return this.$store.state.gameForm.gamePlatform.platform },
        set(value) { this.$store.commit('setGamePlatformPlatform', value) }
      },
      releaseYear: {
        get() { return this.$store.state.gameForm.gamePlatform.releaseYear },
        set(value) { this.$store.commit('setGamePlatformReleaseYear', value) }
      },
      numberPlayers: {
        get() { return this.$store.state.gameForm.gamePlatform.numberPlayers },
        set(value) { this.$store.commit('setGamePlatformNumberPlayers', value) }
      },
      latestVersion: {
        get() { return this.$store.state.gameForm.gamePlatform.latestVersion },
        set(value) { this.$store.commit('setGamePlatformLatestVersion', value) }
      }
    }
  }
</script>

<style>
</style>
