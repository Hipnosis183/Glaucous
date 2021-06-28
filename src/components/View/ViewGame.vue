<template>
  <div>
    <ul class="inline-flex shadow bg-white w-full justify-evenly">
      <router-link :to="{
        name: 'CreateGameRegion',
        query: {
          id: $route.params.id,
          p: game.platform._id
        }
      }"
      >
        <button class="w-max h-full bg-gray-300 font-semibold px-6 py-4 text-base text-blue-800">New Region</button>
      </router-link>
      <li
        v-for="(r, index) in game.gameRegions"
        :key="r._id"
        :value="r._id"
        class="w-full h-full"
      >
        <button
          class="w-full h-full py-3.5"
          :class="index == region ? 'bg-gray-200 border-b-4 border-indigo-400' : ''"
          @click="changeRegion(index)"
        >{{r.region}}</button>
      </li>
    </ul>
  </div>
  <div class="flex m-6 space-x-6">
    <div class="w-3/5 bg-white p-6 rounded-xl shadow leading-loose">
      <p class="text-4xl">{{ game.gameRegions[region].title }}</p>
      <p class="text-2xl">{{ game.gameRegions[region].subTitle }}</p>
      <br />
      <p class="text-lg mt-1"><b>Full Title:</b> {{ fullTitle }}</p>
      <p class="text-lg mt-1"><b>Original Title:</b> {{ game.gameRegions[region].originalTitle }}</p>
      <p class="text-lg mt-1"><b>Romanized Title:</b> {{ game.gameRegions[region].romanizedTitle }}</p>
      <p class="text-lg mt-1"><b>Translated Title:</b> {{ game.gameRegions[region].translatedTitle }}</p>
      <br />
      <p
        class="text-lg mt-1"
        @click="$router.push(`/developers/${ game.developer._id }`)"
      ><b>Developer:</b> {{ game.developer.name }}</p>
      <p
        class="text-lg mt-1"
        @click="$router.push(`/platforms/${ game.platform._id }`)"
      ><b>Platform:</b> {{ game.platform.name }}</p>
      <p class="text-lg mt-1"><b>Release Year:</b> {{ game.releaseYear }}</p>
      <p class="text-lg mt-1"><b>Number of Players:</b> {{ game.numberPlayers }}</p>
    </div>
    <div class="hidden">
      <p class="text-lg mt-1"><b>Region:</b> {{ game.gameRegions[region].region }}</p>
      <p class="text-lg mt-1"><b>Latest Version:</b> {{ game.latestVersion }}</p>
      <p class="text-lg mt-1"><b>Current Version:</b> {{ game.gameRegions[region].gameVersions[0].currentVersion }}</p>
      <p class="text-lg mt-1"><b>Comments:</b> {{ game.gameRegions[region].gameVersions[0].comments }}</p>
    </div>
    <div class="w-2/5 bg-white p-6 rounded-xl shadow">
    </div>
  </div>
</template>

<script>
import { connectDatastore } from '../../database/datastore'
import { getDeveloper } from '../../database/controllers/Developer'
import { getPlatform } from '../../database/controllers/Platform'
import { getGame } from '../../database/controllers/Game'

export default {
  name: 'view-game',
  data() {
    return {
      region: 0,
      game: {
        developer: { name: null },
        platform: { name: null },
        releaseYear: null,
        numberPlayers: null,
        latestVersion: null,
        gamePlatforms: [null],
        gameRegions: [{
          title: null,
          subTitle: null,
          originalTitle: null,
          romanizedTitle: null,
          translatedTitle: null,
          region: null,
          gameVersions: [{
            currentVersion: null,
            comments: null
          }]
        }]
      }
    }
  },
  methods: {
    nextRegion() {
      if (this.region < this.game.gameRegions.length - 1) {
        this.region++
      }
    },
    prevRegion() {
      if (this.region > 0) {
        this.region--
      }
    },
    changeRegion(sel) {
      this.region = sel
    }
  },
  mounted() {
    connectDatastore(this.$route.query.p).then(() => {
      getGame(this.$route.params.id).then(res => {
        this.game = res
        // There are synchronization problems if
        // this fetch is done inside 'getGame()'.
        connectDatastore().then(() => {
          getDeveloper(res.developer)
            .then(res => this.game.developer = res)
          getPlatform(res.platform)
            .then(res => this.game.platform = res)
        })
        for (let gameRegion of this.game.gameRegions) {
          console.log(gameRegion)
        }
      })
    })
  },
  computed: {
    fullTitle() {
      return this.game.gameRegions[this.region].title + ' ' + this.game.gameRegions[this.region].subTitle
    }
  }
}
</script>

<style>
</style>
