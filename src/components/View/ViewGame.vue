<template>
  <div>
    <hip-dialog
      v-show="addLinks"
      @close="addLinks = !addLinks"
    >
      <el-select
        v-model="addLinksResult"
        filterable
        remote
        reserve-keyword
        :remote-method="addLinksRemote"
      >
        <el-option
          v-for="item in addLinksQuery"
          :key="item._id"
          :label="item.child.title + ' (' + item.releaseYear + ') - ' + item.platforms.join(' / ')"
          :value="item._id"
        >
        </el-option>
      </el-select>
      <hip-button @click="linkGame()">Link</hip-button>
      <hip-button @click="unlinkGame()">Unlink</hip-button>
    </hip-dialog>
    <hip-overlay
      v-show="viewLinks"
      @close="viewLinks = !viewLinks"
    >
      <ul class="grid grid-flow-row gap-4">
        <li
          v-for="g in viewLinksResult"
          :key="g._id"
          :value="g._id"
          @click="$router.push({
            name: 'ViewGame',
            params: { id: g._id },
            query: { p: g.platform._id }
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
    </hip-overlay>
    <hip-dialog
      v-show="showDetails"
      @close="showDetails = !showDetails"
    >
      <div class="flex mb-6">
        <h1 class="data-title">ROM Information</h1>
      </div>
      <div class="flex space-x-6 mb-8">
        <div>
          <div class="data-container">
            <p class="font-semibold">Region:</p>
            <p>{{ game.gameRegions[region].region }}</p>
          </div>
          <div class="data-container">
            <p class="font-semibold">Format:</p>
            <p>-</p>
          </div>
          <div class="data-container">
            <p class="font-semibold">File Size:</p>
            <p>-</p>
          </div>
        </div>
        <div>
          <div class="data-container">
            <p class="font-semibold">Latest Version:</p>
            <p>{{ game.latestVersion }}</p>
          </div>
          <div class="data-container">
            <p class="font-semibold">Current Version:</p>
            <p>{{ game.gameRegions[region].gameVersions[0].currentVersion }}</p>
          </div>
          <div class="data-container">
            <p class="font-semibold">ID:</p>
            <p>{{ game.gameRegions[region]._id }}</p>
          </div>
        </div>
      </div>
      <div class="flex mb-6">
        <h1 class="data-title">Comments</h1>
      </div>
      <div class="text-lg mt-1">
        <ul
          class="list-disc list-inside"
          v-if="game.gameRegions[region].gameVersions[0].comments.length > 0"
        >
          <li
            class="text-justify"
            v-for="(c, index) in game.gameRegions[region].gameVersions[0].comments"
            :key="index"
            :value="c"
          >{{ c }}</li>
        </ul>
        <ul
          class="list-disc list-inside"
          v-else
        >
          <li>None</li>
        </ul>
      </div>
    </hip-dialog>
    <hip-nav-bar>
      <router-link :to="{
        name: 'CreateGameRegion',
        query: { id: $route.params.id, p: game.platform._id }
      }">
        <hip-button-nb>+</hip-button-nb>
      </router-link>
      <hip-button-nb @click="deleteGameRegion()">-</hip-button-nb>
      <hip-button-nb @click="deleteGamePlatform()">*</hip-button-nb>
      <ul class="w-full">
        <li
          v-for="(r, index) in game.gameRegions"
          :key="r._id"
          :value="r._id"
        >
          <button
            class="w-full py-3.5"
            :class="index == region ? 'bg-gray-200 border-b-4 border-indigo-400' : ''"
            @click="changeRegion(index)"
          >{{ getRegion(r.region) }}</button>
        </li>
      </ul>
    </hip-nav-bar>
  </div>
  <div class="flex m-6 space-x-6 min-h-almost">
    <div class="w-3/5 bg-white p-6 rounded-xl shadow leading-loose">
      <img
        class="w-12 float-right rounded-md"
        :src="'./images/flags/' + game.gameRegions[region].region + '.svg'"
      />
      <div class="mb-10">
        <p class="text-4xl">{{ game.gameRegions[region].title }}</p>
        <p class="text-2xl">{{ game.gameRegions[region].subTitle }}</p>
      </div>
      <div class="flex flex-inline items-center space-x-4 mb-6">
        <h1 class="data-title">Game Information</h1>
        <hip-button @click="showDetails = !showDetails">Details</hip-button>
      </div>
      <div class="mb-6">
        <div class="data-container">
          <p class="font-semibold">Full Title:</p>
          <p>{{ fullTitle }}</p>
        </div>
        <div class="data-container">
          <p class="font-semibold">Original Title:</p>
          <p>{{ game.gameRegions[region].originalTitle }}</p>
        </div>
        <div class="data-container">
          <p class="font-semibold">Romanized Title:</p>
          <p>{{ game.gameRegions[region].romanizedTitle }}</p>
        </div>
        <div class="data-container">
          <p class="font-semibold">Translated Title:</p>
          <p>{{ game.gameRegions[region].translatedTitle }}</p>
        </div>
      </div>
      <div>
        <div class="data-container">
          <p class="font-semibold">Developer:</p>
          <p @click="$router.push(`/developers/${ game.developer._id }`)">{{ game.developer.name }}</p>
        </div>
        <div class="data-container">
          <p class="font-semibold">Platform:</p>
          <p @click="$router.push(`/platforms/${ game.platform._id }`)">{{ game.platform.name }}</p>
          <hip-button @click="viewLinksGet()">Also On</hip-button>
          <hip-button @click="addLinks = !addLinks">+</hip-button>
        </div>
        <div class="data-container">
          <p class="font-semibold">Release Year:</p>
          <p>{{ game.releaseYear }}</p>
        </div>
        <div class="data-container">
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
import { HipButton, HipButtonNb, HipCardSq, HipDialog, HipNavBar, HipOverlay } from '../Component'

import { getGame, getGames, getRegion, deleteGamePlatform, deleteGameRegion, searchGameByTitle, linkGame, unlinkGame } from '../../database/controllers/Game'

export default {
  name: 'view-game',
  components: {
    HipButton,
    HipButtonNb,
    HipCardSq,
    HipDialog,
    HipNavBar,
    HipOverlay
  },
  data() {
    return {
      addLinks: false,
      addLinksQuery: [],
      addLinksResult: [],
      viewLinks: false,
      viewLinksResult: [],
      region: 0,
      showDetails: false,
      game: {
        developer: { name: null },
        platform: { name: null },
        releaseYear: null,
        numberPlayers: null,
        latestVersion: null,
        gamePlatforms: [],
        gameRegions: [{
          title: null,
          subTitle: null,
          originalTitle: null,
          romanizedTitle: null,
          translatedTitle: null,
          region: null,
          gameVersions: [{
            currentVersion: null,
            comments: [null]
          }]
        }]
      }
    }
  },
  methods: {
    loadGame() {
      getGame(this.$route.params.id)
        .then(res => this.game = res)
    },
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
    deleteGameRegion() {
      deleteGameRegion(this.game, this.region)
        .then(res => {
          if (res) {
            this.loadGame()
            this.region = 0
          } else {
            this.$router.back()
          }
        })
    },
    deleteGamePlatform() {
      deleteGamePlatform(this.game)
        .then(() => this.$router.back())
    },
    linkGame() {
      linkGame(this.game, this.addLinksResult).then(() => {
        this.loadGame()
        this.addLinksQuery = []
        this.addLinksResult = ''
      })
    },
    unlinkGame() {
      unlinkGame(this.game).then(() => {
        this.loadGame()
        this.addLinksQuery = []
        this.addLinksResult = ''
      })
    },
    addLinksRemote(query) {
      if (query !== '' && query.length > 2) {
        searchGameByTitle(query, this.game.gamePlatforms)
          .then(res => {
            this.addLinksQuery = res
          })
      } else {
        this.addLinksQuery = []
      }
    },
    viewLinksGet() {
      getGames(this.game.gamePlatforms)
        .then(res => {
          this.viewLinksResult = res
          this.viewLinks = !this.viewLinks
        })
    },
    getRegion(reg) {
      return getRegion(reg)
    }
  },
  mounted() {
    this.loadGame()
  },
  computed: {
    fullTitle() {
      return this.game.gameRegions[this.region].title + ' ' + this.game.gameRegions[this.region].subTitle
    }
  },
  watch: {
    // Watch for route changes to clean the input fields.
    addLinks() {
      this.addLinksQuery = []
      this.addLinksResult = ''
    }
  }
}
</script>

<style>
</style>
