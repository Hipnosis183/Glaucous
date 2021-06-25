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
    <p>{{ game.gameRegions[region].title }}</p>
    <p>{{ game.gameRegions[region].subTitle }}</p>
    <p>{{ game.gameRegions[region].originalTitle }}</p>
    <p>{{ game.gameRegions[region].romanizedTitle }}</p>
    <p>{{ game.gameRegions[region].translatedTitle }}</p>
    <p>{{ game.gameRegions[region].region }}</p>
    <p @click="$router.push(`/developers/${ game.developer._id }`)"
    >{{ game.developer.name }}</p>
    <p @click="$router.push(`/platforms/${ game.platform._id }`)"
    >{{ game.platform.name }}</p>
    <p>{{ game.releaseYear }}</p>
    <p>{{ game.numberPlayers }}</p>
    <p>{{ game.latestVersion }}</p>
    <p>{{ game.gameRegions[region].gameVersions[0].currentVersion }}</p>
    <p>{{ game.gameRegions[region].gameVersions[0].comments }}</p>
    <button @click="prevRegion()">Prev</button>
    <button @click="nextRegion()">Next</button>
    <br>
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
        region: 0,
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
    methods: {
      nextRegion() {
        if (this.region < this.game.gameRegions.length - 1) {
          this.region++
        }
      },
      prevRegion() {
        if (this.region > 0) {
          this.region--
        }
      }
    },
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
