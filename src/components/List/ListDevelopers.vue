<template>
  <div>
    <hip-dialog
      v-show="create"
      @close="createDeveloperClose()"
    >
      <create-developer @close="createDeveloperClose()" />
    </hip-dialog>
    <hip-nav-bar>
      <hip-button-nb @click="createDeveloperOpen()">+</hip-button-nb>
      <div class="w-full"></div>
    </hip-nav-bar>
    <ul class="grid grid-cols-4 gap-4 m-6">
      <li
        v-for="d in developers"
        :key="d._id"
        :value="d._id"
        @click="$router.push(`/developers/${ d._id }`)"
      >
        <hip-card-sq>
          <h1 class="text-xl text-blue-800 font-semibold">{{ d.name }}</h1>
          <p class="text-indigo-400">{{ d.titles }} Titles</p>
        </hip-card-sq>
      </li>
    </ul>
  </div>
</template>

<script>
import { HipButtonNb, HipCardSq, HipDialog, HipNavBar } from '../Component'

import { getDevelopers } from '../../database/controllers/Developer'
import CreateDeveloper from '../Create/CreateDeveloper.vue'

export default {
  name: 'list-developers',
  components: {
    HipButtonNb,
    HipCardSq,
    HipDialog,
    HipNavBar,
    CreateDeveloper
  },
  data() {
    return {
      create: false,
      developers: null
    }
  },
  methods: {
    loadDevelopers() {
      getDevelopers()
        .then(res => this.developers = res)
    },
    createDeveloperOpen() {
      // Open create dialog.
      this.create = !this.create
    },
    createDeveloperClose() {
      // Reload developers.
      this.loadDevelopers()
      // Close create dialog.
      this.create = !this.create
      // Restore the data on the store.
      this.$store.commit('resetOtherForm')
    }
  },
  mounted() {
    this.loadDevelopers()
  }
}
</script>

<style>
</style>
