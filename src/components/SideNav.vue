<template>
  <div
    class="transform ease-in-out transition-all duration-1000 relative bg-indigo-500 flex-col justify-between flex flex-shrink-0"
    :class="expanded ? 'w-60' : 'w-14'"
  >
    <div class="h-full flex-col justify-between flex">
      <div class="">
        <router-link
          to="/"
          class="text-center"
        >
          <h1 class="text-gray-200 font-semibold text-3xl my-12">{{ name }}</h1>
        </router-link>
        <div class="space-y-4 mt-8">
          <router-link
            to="/games"
            class="flex"
          >
            <button class="w-10/12 m-auto bg-gray-200 text-blue-800 text-base font-semibold py-3 rounded-full">{{ games }}</button>
          </router-link>
          <router-link
            to="/developers"
            class="flex"
          >
            <button class="w-10/12 m-auto bg-gray-200 text-blue-800 text-base font-semibold py-3 rounded-full">{{ developers }}</button>
          </router-link>
          <router-link
            to="/platforms"
            class="flex"
          >
            <button class="w-10/12 m-auto bg-gray-200 text-blue-800 text-base font-semibold py-3 rounded-full">{{ platforms }}</button>
          </router-link>
        </div>
      </div>
      <div class="space-y-4 mb-8">
        <div class="flex">
          <button class="w-10/12 m-auto bg-gray-200 text-blue-800 text-base font-semibold py-3 rounded-full">{{ search }}</button>
        </div>
        <div
          class="flex"
          :class="history > 0 ? 'visible' : 'hidden'"
        >
          <button
            class="w-10/12 m-auto bg-gray-200 text-blue-800 text-base font-semibold py-3 rounded-full"
            @click="$router.back()"
          >{{ back }}</button>
        </div>
      </div>
    </div>
    <div class="bg-indigo-600 flex text-center">
      <button
        class="text-gray-200 font-semibold text-2xl m-auto py-3"
        :class="expanded ? 'mr-auto' : 'mr-5'"
        @click="toggle()"
      >{{ icon }}</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expanded: true,
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
      this.expanded = !this.expanded;
      this.name = this.expanded ? 'Frontend' : 'F'
      this.icon = this.expanded ? '<' : '>'
      this.games = this.expanded ? 'Games' : 'G'
      this.developers = this.expanded ? 'Developers' : 'D'
      this.platforms = this.expanded ? 'Platforms' : 'P'
      this.search = this.expanded ? 'Search' : 'S'
      this.back = this.expanded ? 'Back' : 'B'
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
