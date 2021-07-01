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
    <ul class="grid grid-cols-4 gap-4 m-6">
      <li
        v-for="g in games"
        :key="g._id"
        :value="g._id"
        @click="$router.push({
          name: 'ViewGame',
          params: { id: g._id },
          query: { p: $route.params.id }
        })"
      >
        <div class="bg-white p-4 h-full rounded-xl shadow text-center cursor-pointer flex items-center justify-center">
          <div>
            <div class="mb-2">
              <h1 class="text-xl text-blue-800 font-semibold">{{ g.gameRegions[0].title }}</h1>
              <h2 class="text-base text-blue-600 font-normal">{{ g.gameRegions[0].subTitle }}</h2>
            </div>
            <div class="mb-2">
              <h2 class="text-base text-gray-600 italic font-normal">{{ g.gameRegions[0].originalTitle }}</h2>
            </div>
            <h3 class="text-base text-gray-600 font-normal">{{ g.platform.name }} - {{ g.releaseYear }}</h3>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getGames } from '../../database/controllers/Game'

export default {
  name: 'view-platform',
  data() {
    return {
      games: null
    }
  },
  mounted() {
    getGames(this.$route.params.id).then(res => {
      this.games = res
    })
  }
}
</script>

<style>
</style>
