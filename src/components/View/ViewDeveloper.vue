<template>
  <div>
    <div class="inline-flex shadow bg-white w-full justify-between">
      <router-link :to="{
        name: 'CreateGamePlatform',
        query: { d: $route.params.id }
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
          @click="$router.push(`/games/${ g._id }`)"
        >{{ g.gameRegions[0].title }}</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { getGames } from '../../database/controllers/Game'

export default {
  name: 'view-developer',
  data() {
    return {
      games: null
    }
  },
  mounted() {
    getGames(this.$route.params.id)
      .then(res => this.games = res)
  }
}
</script>

<style>
</style>