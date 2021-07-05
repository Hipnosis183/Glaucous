<template>
  <div
    class="transform ease-in-out transition-all duration-1000 relative bg-indigo-500 flex-col justify-between flex flex-shrink-0"
    :class="$store.state.sidenavExpanded ? 'w-60' : 'w-14'"
  >
    <div class="h-full flex-col justify-between flex">
      <div class="">
        <router-link
          to="/"
          class="text-center"
        >
          <h1 class="text-gray-100 font-semibold text-3xl my-12">{{ name }}</h1>
        </router-link>
        <div class="space-y-4 mt-8">
          <router-link
            to="/games"
            class="flex"
          >
            <hip-button-sb>{{ games }}</hip-button-sb>
          </router-link>
          <router-link
            to="/developers"
            class="flex"
          >
            <hip-button-sb>{{ developers }}</hip-button-sb>
          </router-link>
          <router-link
            to="/platforms"
            class="flex"
          >
            <hip-button-sb>{{ platforms }}</hip-button-sb>
          </router-link>
        </div>
      </div>
      <div class="space-y-4 mb-8">
        <div class="flex">
          <hip-button-sb>{{ search }}</hip-button-sb>
        </div>
        <div
          class="flex"
          v-show="history > 0"
        >
          <hip-button-sb @click="$router.back()">{{ back }}</hip-button-sb>
        </div>
      </div>
    </div>
    <div class="bg-indigo-600 flex text-center">
      <button
        class="text-gray-100 font-semibold text-2xl m-auto py-3"
        :class="$store.state.sidenavExpanded ? 'mr-auto' : 'mr-5'"
        @click="toggle()"
      >{{ icon }}</button>
    </div>
  </div>
</template>

<script>
import { HipButtonSb } from './Component'

export default {
  components: {
    HipButtonSb
  },
  data() {
    return {
      history: window.history.state.position,
      name: 'Frontend',
      icon: '<',
      games: 'Games',
      developers: 'Developers',
      platforms: 'Platforms',
      search: 'Search',
      back: 'Back'
    }
  },
  methods: {
    toggle() {
      this.$store.state.sidenavExpanded = !this.$store.state.sidenavExpanded;
      this.name = this.$store.state.sidenavExpanded ? 'Frontend' : 'F'
      this.icon = this.$store.state.sidenavExpanded ? '<' : '>'
      this.games = this.$store.state.sidenavExpanded ? 'Games' : 'G'
      this.developers = this.$store.state.sidenavExpanded ? 'Developers' : 'D'
      this.platforms = this.$store.state.sidenavExpanded ? 'Platforms' : 'P'
      this.search = this.$store.state.sidenavExpanded ? 'Search' : 'S'
      this.back = this.$store.state.sidenavExpanded ? 'Back' : 'B'
    }
  },
  watch: {
    // Watch for route changes to display the back button.
    '$route'(to, from) {
      this.history = window.history.state.position
    }
  }
}
</script>

<style>
</style>
