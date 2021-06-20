<template>
  <div>
      <label for="numberPlayers">Id:</label>
      <input id="numberPlayers" v-model="platform">
      <br/>
      <button @click="connect">Connect</button>
    <ul>
      <li
        v-for="game in games"
        :key="game._id"
        :value="game._id"
        @click="$router.push(`/viewGame/${ game._id }`)"
      >{{ game.title }}</li>
    </ul>
    <button @click="$router.back()">Back</button>
  </div>
</template>

<script>
  import { connectDatastore } from '../../database/datastore'
  import { getGames } from '../../database/controllers/Game'

  export default {
    name: 'list-games',
    data () {
      return {
        games: null,
        platform: null
      }
    },
    methods: {
      connect(){
        connectDatastore(this.platform)
          .then(() => {
            getGames()
              .then(res => this.games = res)
        })
      }
    },
    mounted () {}
  }
</script>

<style>
</style>
