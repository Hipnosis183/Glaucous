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
        v-for="g in games"
        :key="g._id"
        :value="g._id"
        @click="$router.push(`/games/${ g._id }`)"
      >{{ g.gameRegions[0].title }}</li>
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
