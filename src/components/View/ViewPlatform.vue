<template>
  <div>
    <div class="inline-flex shadow bg-white w-full justify-between">
      <router-link :to="{
        name: 'CreateGamePlatform',
        query: { p: $route.params.id }
      }"
      >
        <button class="bg-gray-300 font-semibold px-6 py-4 text-base text-blue-800">New Game</button>
      </router-link>
      <div></div>
    </div>
    <ul class="space-y-4 mt-8">
      <li
        v-for="g in games"
        :key="g._id"
        :value="g._id"
      >
        <button
          class="bg-gray-300 px-6 py-3 rounded-full w-full"
          @click="$router.push({
            name: 'ViewGame',
            params: { id: g._id },
            query: { p: $route.params.id }
          })"
        >{{ g.gameRegions[0].title }}</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { connectDatastore } from '../../database/datastore'
import { getGames } from '../../database/controllers/Game'

export default {
  name: 'view-platform',
  data() {
    return {
      games: null
    }
  },
  mounted() {
    connectDatastore(this.$route.params.id).then(() => {
      getGames()
        .then(res => this.games = res)
    })
  }
}
</script>

<style>
</style>
