<template>
  <div>
    <hip-nav-bar>
      <router-link :to="{ name: 'CreatePlatform' }">
        <hip-button-nb>New Platform</hip-button-nb>
      </router-link>
      <div class="w-full"></div>
    </hip-nav-bar>
    <ul class="grid grid-cols-4 gap-4 m-6">
      <li
        v-for="p in platforms"
        :key="p._id"
        :value="p._id"
        @click="$router.push(`/platforms/${p._id}`)"
      >
        <hip-card-sq>
          <h1 class="text-xl text-blue-800 font-semibold">{{ p.name }}</h1>
          <p class="text-indigo-400">{{ p.titles }} Titles</p>
        </hip-card-sq>
      </li>
    </ul>
  </div>
</template>

<script>
import { HipButtonNb, HipCardSq, HipNavBar } from '../Component'

import { getPlatforms } from '../../database/controllers/Platform'

export default {
  name: 'list-platforms',
  components: {
    HipButtonNb,
    HipCardSq,
    HipNavBar
  },
  data() {
    return {
      platforms: null
    }
  },
  mounted() {
    getPlatforms()
      .then(res => this.platforms = res)
  }
}
</script>

<style>
</style>
