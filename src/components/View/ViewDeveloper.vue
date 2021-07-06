<template>
  <div>
    <hip-dialog
      v-show="edit"
      @close="editDeveloperClose()"
    >
      <edit-developer @close="editDeveloperClose()" />
    </hip-dialog>
    <hip-nav-bar>
      <router-link :to="{
        name: 'CreateGamePlatform',
        query: { d: $route.params.id }
      }">
        <hip-button-nb>+</hip-button-nb>
      </router-link>
      <hip-button-nb @click="deleteDeveloper()">-</hip-button-nb>
      <hip-button-nb @click="editDeveloperOpen()">/</hip-button-nb>
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

import { getGamesD } from '../../database/controllers/Game'
import { getDeveloper, deleteDeveloper } from '../../database/controllers/Developer'
import EditDeveloper from '../Edit/EditDeveloper.vue'

export default {
  name: 'view-developer',
  components: {
    HipButtonNb,
    HipCardSq,
    HipDialog,
    HipNavBar,
    EditDeveloper
  },
  data() {
    return {
      edit: false,
      games: null,
      developer: {
        name: null
      }
    }
  },
  methods: {
    loadDeveloper() {
      getDeveloper(this.$route.params.id)
        .then(res => this.developer = res)
      getGamesD(this.$route.params.id)
        .then(res => this.games = res)
    },
    deleteDeveloper() {
      deleteDeveloper(this.$route.params.id)
        .then(() => this.$router.back())
    },
    editDeveloperOpen() {
      // Save current developer ID into the store.
      this.$store.state.otherSelected = this.$route.params.id
      // Save data of the current developer into the store.
      this.$store.commit('setOtherName', this.developer.name)
      // Open edit dialog.
      this.edit = !this.edit
    },
    editDeveloperClose() {
      // Close edit dialog.
      this.edit = !this.edit
      // Restore the data on the store.
      this.$store.commit('resetOtherForm')
    }
  },
  mounted() {
    this.loadDeveloper()
  }
}
</script>

<style>
</style>
