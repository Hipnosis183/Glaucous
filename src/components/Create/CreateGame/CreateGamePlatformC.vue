<template>
  <div>
    <label class="text-blue-900 ml-2">Developer</label>
    <select
      class="mt-2 mb-2 px-4 block w-full rounded-full bg-gray-300 border-transparent focus:border-indigo-600 focus:bg-gray-200 focus:ring-0"
      v-model="developer"
    >
      <option
        v-for="d in developers"
        :key="d._id"
        :value="d._id"
      >{{ d.name }}</option>
    </select>
    <label class="text-blue-900 ml-2">Platform</label>
    <select
      class="mt-2 mb-2 px-4 block w-full rounded-full bg-gray-300 border-transparent focus:border-indigo-600 focus:bg-gray-200 focus:ring-0"
      v-model="platform"
    >
      <option
        v-for="p in platforms"
        :key="p._id"
        :value="p._id"
      >{{ p.name }}</option>
    </select>
    <label class="text-blue-900 ml-2">Release Year</label>
    <input
      type="text"
      class="mt-2 mb-2 px-4 block w-full rounded-full bg-gray-300 border-transparent focus:border-indigo-600 focus:bg-gray-200 focus:ring-0"
      v-model="releaseYear"
    >
    <label class="text-blue-900 ml-2">Number of Players</label>
    <input
      type="text"
      class="mt-2 mb-2 px-4 block w-full rounded-full bg-gray-300 border-transparent focus:border-indigo-600 focus:bg-gray-200 focus:ring-0"
      v-model="numberPlayers"
    >
    <label class="text-blue-900 ml-2">Latest Version</label>
    <input
      type="text"
      class="mt-2 mb-2 px-4 block w-full rounded-full bg-gray-300 border-transparent focus:border-indigo-600 focus:bg-gray-200 focus:ring-0"
      v-model="latestVersion"
    >
  </div>
</template>

<script>
import { connectDatastore } from '../../../database/datastore'
import { getDevelopers } from '../../../database/controllers/Developer'
import { getPlatforms } from '../../../database/controllers/Platform'

export default {
  name: 'create-game-platform-c',
  data() {
    return {
      developers: null,
      platforms: null
    }
  },
  mounted() {
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
