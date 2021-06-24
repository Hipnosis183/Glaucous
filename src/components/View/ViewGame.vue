<template>
  <div>
    <button>
      <router-link
        :to="{
          name: 'CreateGameRegion',
          query: {
            id: $route.params.id,
            p: game.platform._id
          }
        }"
      >New Region</router-link>
    </button>
    <p>{{ game.gameRegions[0].title }}</p>
    <p>{{ game.gameRegions[0].subTitle }}</p>
    <p>{{ game.gameRegions[0].originalTitle }}</p>
    <p>{{ game.gameRegions[0].romanizedTitle }}</p>
    <p>{{ game.gameRegions[0].translatedTitle }}</p>
    <p>{{ game.gameRegions[0].region }}</p>
    <p @click="$router.push(`/developers/${ game.developer._id }`)"
    >{{ game.developer.name }}</p>
    <p @click="$router.push(`/platforms/${ game.platform._id }`)"
    >{{ game.platform.name }}</p>
    <p>{{ game.releaseYear }}</p>
    <p>{{ game.numberPlayers }}</p>
    <p>{{ game.latestVersion }}</p>
    <p>{{ game.gameRegions[0].gameVersions[0].currentVersion }}</p>
    <p>{{ game.gameRegions[0].gameVersions[0].comments }}</p>
    <button @click="$router.back()">Back</button>
  </div>
</template>

<script>
  import { connectDatastore } from '../../database/datastore'
  import { getDeveloper } from '../../database/controllers/Developer'
  import { getPlatform } from '../../database/controllers/Platform'
  import { getGame } from '../../database/controllers/Game'

  export default {
    name: 'view-game',
    data () {
      return {
        game: {
          developer: { name: null },
          platform: { name: null },
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
        getGame(this.$route.params.id).then(res => {
            this.game = res
            // There are synchronization problems if
            // this fetch is done inside 'getGame()'.
            connectDatastore().then(() => {
              getDeveloper(res.developer)
                .then(res => this.game.developer = res)
              getPlatform(res.platform)
                .then(res => this.game.platform = res)
            })
            for (let gameRegion of this.game.gameRegions){
              console.log(gameRegion)
            }
          })
      })
    }
  }
</script>

<style>
</style>
