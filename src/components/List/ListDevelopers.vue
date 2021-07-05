<template>
  <div>
    <hip-nav-bar>
      <router-link :to="{ name: 'CreateDeveloper' }">
        <hip-button-nb>New Developer</hip-button-nb>
      </router-link>
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
import { HipButtonNb, HipCardSq, HipNavBar } from '../Component'

import { getDevelopers } from '../../database/controllers/Developer'

export default {
  name: 'list-developers',
  components: {
    HipButtonNb,
    HipCardSq,
    HipNavBar
  },
  data() {
    return {
      developers: null
    }
  },
  mounted() {
    getDevelopers()
      .then(res => this.developers = res)
  }
}
</script>

<style>
</style>
