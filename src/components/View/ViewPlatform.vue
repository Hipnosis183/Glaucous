<template>
  <div>
    <hip-dialog
      v-show="create"
      @close="createGamePlatformClose()"
    >
      <create-game-platform @close="createGamePlatformClose()" />
    </hip-dialog>
    <hip-dialog
      v-show="edit"
      @close="editPlatformClose()"
    >
      <edit-platform @close="editPlatformClose()" />
    </hip-dialog>
    <hip-nav-bar>
      <hip-button-nb @click="createGamePlatformOpen()">+</hip-button-nb>
      <hip-button-nb @click="deletePlatform()">-</hip-button-nb>
      <hip-button-nb @click="editPlatformOpen()">/</hip-button-nb>
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
import { HipButtonNb, HipCardSq, HipDialog, HipNavBar } from '../Component'

import { getGamesP } from '../../database/controllers/Game'
import { getPlatform, deletePlatform } from '../../database/controllers/Platform'
import CreateGamePlatform from '../Create/CreateGamePlatform.vue'
import EditPlatform from '../Edit/EditPlatform.vue'

export default {
  name: 'view-platform',
  components: {
    HipButtonNb,
    HipCardSq,
    HipDialog,
    HipNavBar,
    CreateGamePlatform,
    EditPlatform
  },
  data() {
    return {
      create: false,
      edit: false,
      games: null,
      platform: {
        name: null
      }
    }
  },
  methods: {
    loadPlatform() {
      getPlatform(this.$route.params.id)
        .then(res => this.platform = res)
      getGamesP(this.$route.params.id)
        .then(res => this.games = res)
    },
    createGamePlatformOpen() {
      // Save data of the current platform into the store.
      this.$store.commit('setGamePlatformPlatform', this.$route.params.id)
      // Open create dialog.
      this.create = !this.create
    },
    createGamePlatformClose() {
      // Reload platform.
      this.loadPlatform()
      // Close create dialog.
      this.create = !this.create
      // Restore the data on the store.
      this.$store.commit('resetGameForm')
    },
    deletePlatform() {
      deletePlatform(this.$route.params.id)
        .then(() => this.$router.back())
    },
    editPlatformOpen() {
      // Save current platform ID into the store.
      this.$store.state.otherSelected = this.$route.params.id
      // Save data of the current platform into the store.
      this.$store.commit('setOtherName', this.platform.name)
      // Open edit dialog.
      this.edit = !this.edit
    },
    editPlatformClose() {
      // Reload platform.
      this.loadPlatform()
      // Close edit dialog.
      this.edit = !this.edit
      // Restore the data on the store.
      this.$store.commit('resetOtherForm')
    }
  },
  mounted() {
    this.loadPlatform()
  }
}
</script>

<style>
</style>
