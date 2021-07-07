<template>
  <div>
    <hip-dialog
      v-show="create"
      @close="createPlatformClose()"
    >
      <create-platform @close="createPlatformClose()" />
    </hip-dialog>
    <hip-nav-bar>
      <hip-button-nb @click="createPlatformOpen()">+</hip-button-nb>
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
import { HipButtonNb, HipCardSq, HipDialog, HipNavBar } from '../Component'

import { getPlatforms } from '../../database/controllers/Platform'
import CreatePlatform from '../Create/CreatePlatform.vue'

export default {
  name: 'list-platforms',
  components: {
    HipButtonNb,
    HipCardSq,
    HipDialog,
    HipNavBar,
    CreatePlatform
  },
  data() {
    return {
      create: false,
      platforms: null
    }
  },
  methods: {
    loadPlatforms() {
      getPlatforms()
        .then(res => this.platforms = res)
    },
    createPlatformOpen() {
      // Open create dialog.
      this.create = !this.create
    },
    createPlatformClose() {
      // Reload platforms.
      this.loadPlatforms()
      // Close create dialog.
      this.create = !this.create
      // Restore the data on the store.
      this.$store.commit('resetOtherForm')
    }
  },
  mounted() {
    this.loadPlatforms()
  }
}
</script>

<style>
</style>
