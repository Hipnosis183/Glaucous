<template>
  <div>
    <p>{{ game.gameRegions[0].title }}</p>
    <button @click="$router.back()">Back</button>
  </div>
</template>

<script>
  import { connectDatastore } from '../../database/datastore'
  import { getGame } from '../../database/controllers/Game'

  export default {
    name: 'view-game',
    data () {
      return {
        game: {
          developer: null,
          platform: null,
          releaseYear: null,
          numberPlayers: null,
          latestVersion: null,
          gamePlatforms: [null],
          gameRegions: [{
            title: null,
            subTitle: null,
            originalTitle: null,
            romanizedTitle: null,
            translatedTitle: null,
            region: null,
            gameVersions: [{
              currentVersion: null,
              comments: null
            }]
          }]
        }
      }
    },
    methods: {},
    mounted () {
      connectDatastore(this.$route.query.p).then(() => {
        getGame(this.$route.params.id)
          .then(res => this.game = res)
      })
    }
  }
</script>

<style>
</style>
