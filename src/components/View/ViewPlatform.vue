<template>
  <div>
    <button>
      <router-link
        :to="{
          name: 'CreateGamePlatform',
          query: { p: $route.params.id }
        }"
      >New Game</router-link>
    </button>
    <ul>
      <li
        v-for="g in games"
        :key="g._id"
        :value="g._id"
        @click="$router.push({
          name: 'ViewGame',
          params: { id: g._id },
          query: { p: $route.params.id }
        })"
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
