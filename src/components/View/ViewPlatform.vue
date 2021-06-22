<template>
  <div>
    <button>
      <router-link
        :to="{
          name: 'CreateGame',
          query: { p: $route.params.id }
        }"
      >New Game</router-link>
    </button>
    <ul>
      <li
        v-for="game in games"
        :key="game._id"
        :value="game._id"
        @click="$router.push(`/games/${ game._id }`)"
      >{{ game.gameRegions[0].title }}</li>
    </ul>
    <button @click="$router.back()">Back</button>
  </div>
</template>

<script>
  import { connectDatastore } from '../../database/datastore'
  import { getGames } from '../../database/controllers/Game'

  export default {
    name: 'view-platform',
    data () {
      return {
        games: null
      }
    },
    methods: {},
    mounted () {
      connectDatastore(this.$route.params.id).then(() => {
        getGames()
          .then(res => this.games = res)
      })
    }
  }
</script>

<style>
</style>
