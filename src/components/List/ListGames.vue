<template>
  <div>
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
  import { getGames } from '../../database/controllers/Game'

  export default {
    name: 'list-games',
    data () {
      return {
        games: null
      }
    },
    methods: {},
    mounted () {
      getGames()
        .then(res => this.games = res)
    }
  }
</script>

<style>
</style>
