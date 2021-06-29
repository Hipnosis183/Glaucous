<template>
  <div>
    <div
      class="flex items-center justify-center fixed w-almost h-full"
      :class="details ? 'visible' : 'hidden'"
    >
      <div
        class="bg-black bg-opacity-50 w-full h-full"
        @click="showDetails()"
      >
      </div>
      <div class="absolute bg-white p-6 rounded-xl shadow leading-loose">
        <div class="flex mb-6">
          <h1 class="text-xl font-bold">ROM Information</h1>
        </div>
        <div class="flex space-x-6 mb-8">
          <div>
            <div class="text-lg mt-1 space-x-2 flex flex-inline">
              <p class="font-semibold">Region:</p>
              <p>{{ game.gameRegions[region].region }}</p>
            </div>
            <div class="text-lg mt-1 space-x-2 flex flex-inline">
              <p class="font-semibold">Format:</p>
              <p>-</p>
            </div>
            <div class="text-lg mt-1 space-x-2 flex flex-inline">
              <p class="font-semibold">File Size:</p>
              <p>-</p>
            </div>
          </div>
          <div>
            <div class="text-lg mt-1 space-x-2 flex flex-inline">
              <p class="font-semibold">Latest Version:</p>
              <p>{{ game.latestVersion }}</p>
            </div>
            <div class="text-lg mt-1 space-x-2 flex flex-inline">
              <p class="font-semibold">Current Version:</p>
              <p>{{ game.gameRegions[region].gameVersions[0].currentVersion }}</p>
            </div>
            <div class="text-lg mt-1 space-x-2 flex flex-inline">
              <p class="font-semibold">ID:</p>
              <p>{{ game.gameRegions[region]._id }}</p>
            </div>
          </div>
        </div>
        <div class="flex mb-6">
          <h1 class="text-xl font-bold">Comments</h1>
        </div>
        <div class="text-lg mt-1">
          <ul class="list-disc list-inside">
            <li v-if="game.gameRegions[region].gameVersions[0].comments > 1">{{ game.gameRegions[region].gameVersions[0].comments }}</li>
            <li v-else>None</li>
          </ul>
        </div>
      </div>
    </div>
    <ul class="inline-flex shadow bg-white w-full justify-evenly">
      <router-link :to="{
        name: 'CreateGameRegion',
        query: {
          id: $route.params.id,
          p: game.platform._id
        }
      }">
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
  <div class="flex m-6 space-x-6 min-h-almost">
    <div class="w-3/5 bg-white p-6 rounded-xl shadow leading-loose">
      <div class="mb-10">
        <p class="text-4xl">{{ game.gameRegions[region].title }}</p>
        <p class="text-2xl">{{ game.gameRegions[region].subTitle }}</p>
      </div>
      <div class="flex flex-inline items-center space-x-4 mb-6">
        <h1 class="text-xl font-bold">Game Information</h1>
        <button
          class="w-max h-full bg-gray-300 font-semibold px-4 py-2 rounded-full text-base text-blue-800"
          @click="showDetails()"
        >Details</button>
      </div>
      <div class="mb-6">
        <div class="text-lg mt-1 space-x-2 flex flex-inline">
          <p class="font-semibold">Full Title:</p>
          <p>{{ fullTitle }}</p>
        </div>
        <div class="text-lg mt-1 space-x-2 flex flex-inline">
          <p class="font-semibold">Original Title:</p>
          <p>{{ game.gameRegions[region].originalTitle }}</p>
        </div>
        <div class="text-lg mt-1 space-x-2 flex flex-inline">
          <p class="font-semibold">Romanized Title:</p>
          <p>{{ game.gameRegions[region].romanizedTitle }}</p>
        </div>
        <div class="text-lg mt-1 space-x-2 flex flex-inline">
          <p class="font-semibold">Translated Title:</p>
          <p>{{ game.gameRegions[region].translatedTitle }}</p>
        </div>
      </div>
      <div>
        <div class="text-lg mt-1 space-x-2 flex flex-inline">
          <p class="font-semibold">Developer:</p>
          <p @click="$router.push(`/developers/${ game.developer._id }`)">{{ game.developer.name }}</p>
        </div>
        <div class="text-lg mt-1 space-x-2 flex flex-inline">
          <p class="font-semibold">Platform:</p>
          <p @click="$router.push(`/platforms/${ game.platform._id }`)">{{ game.platform.name }}</p>
        </div>
        <div class="text-lg mt-1 space-x-2 flex flex-inline">
          <p class="font-semibold">Release Year:</p>
          <p>{{ game.releaseYear }}</p>
        </div>
        <div class="text-lg mt-1 space-x-2 flex flex-inline">
          <p class="font-semibold">Number of Players:</p>
          <p>{{ game.numberPlayers }}</p>
        </div>
      </div>
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
      details: 0,
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
    },
    showDetails() {
      this.details = !this.details
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
.h-almost {
  height: calc(100vh - 104px);
}
.min-h-almost {
  min-height: calc(100vh - 104px);
}
.w-almost {
  width: calc(100vw - 15rem);
}
</style>
