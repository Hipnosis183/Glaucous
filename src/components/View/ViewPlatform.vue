<template>
  <div>
    <hip-nav-bar>
      <router-link :to="{
        name: 'CreateGamePlatform',
        query: { p: $route.params.id }
      }">
        <hip-button-nb>+</hip-button-nb>
      </router-link>
      <hip-button-nb @click="deletePlatform()">-</hip-button-nb>
      <div class="w-full"></div>
    </hip-nav-bar>
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
        <hip-card-sq>
          <div class="mb-2">
            <h1 class="text-xl text-blue-800 font-semibold">{{ g.gameRegions[0].title }}</h1>
            <h2 class="text-base text-blue-600 font-normal">{{ g.gameRegions[0].subTitle }}</h2>
          </div>
          <div class="mb-2">
            <h2 class="text-base text-gray-600 italic font-normal">{{ g.gameRegions[0].originalTitle }}</h2>
          </div>
          <h3 class="text-base text-gray-600 font-normal">{{ g.platform.name }} - {{ g.releaseYear }}</h3>
        </hip-card-sq>
      </li>
    </ul>
  </div>
</template>

<script>
import { HipButtonNb, HipCardSq, HipNavBar } from '../Component'

import { getGamesP } from '../../database/controllers/Game'
import { deletePlatform } from '../../database/controllers/Platform'

export default {
  name: 'view-platform',
  components: {
    HipButtonNb,
    HipCardSq,
    HipNavBar
  },
  data() {
    return {
      games: null
    }
  },
  methods: {
    deletePlatform() {
      deletePlatform(this.$route.params.id)
        .then(() => this.$router.back())
    }
  },
  mounted() {
    getGamesP(this.$route.params.id)
      .then(res => this.games = res)
  }
}
</script>

<style>
</style>
