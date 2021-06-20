<template>
  <div>
    <form @submit.prevent="onSubmit">
      <label for="title">Title:</label>
      <input id="title" v-model="gameForm.title">
      <br/>
      <label for="subTitle">Subtitle:</label>
      <input id="subTitle" v-model="gameForm.subTitle">
      <br/>
      <label for="originalTitle">Original Title:</label>
      <input id="originalTitle" v-model="gameForm.originalTitle">
      <br/>
      <label for="romanizedTitle">Romanized Title:</label>
      <input id="romanizedTitle" v-model="gameForm.romanizedTitle">
      <br/>
      <label for="translatedTitle">Translated Title:</label>
      <input id="translatedTitle" v-model="gameForm.translatedTitle">
      <br/>
      <label for="region">Region:</label>
      <input id="region" v-model="gameForm.region">
      <br/>
      <label for="developer">Developer:</label>
      <select v-model="gameForm.developer">
        <option
        v-for="developer in developers"
        :key="developer._id"
        :value="developer._id"
        >{{ developer.name }}</option>
      </select>
      <br/>
      <label for="platform">Platform:</label>
      <select v-model="gameForm.platform">
        <option
        v-for="platform in platforms"
        :key="platform._id"
        :value="platform._id"
        >{{ platform.name }}</option>
      </select>
      <br/>
      <label for="releaseYear">Release Year:</label>
      <input id="releaseYear" v-model="gameForm.releaseYear">
      <br/>
      <label for="numberPlayers">Number of Players:</label>
      <input id="numberPlayers" v-model="gameForm.numberPlayers">
      <br/>
      <input class="button" type="submit" value="Submit">
    </form>
    <button @click="$router.back()">Back</button>
  </div>
</template>

<script>
  import { connectDatastore } from '../../database/datastore'
  import { getDevelopers } from '../../database/controllers/Developer'
  import { getPlatforms } from '../../database/controllers/Platform'
  import { createGame } from '../../database/controllers/Game'

  export default {
    name: 'create-game',
    data () {
      return {
        developers: null,
        platforms: null,
        gameForm: {
          title: null,
          subTitle: null,
          originalTitle: null,
          romanizedTitle: null,
          translatedTitle: null,
          region: null,
          developer: null,
          platform: null,
          releaseYear: null,
          numberPlayers: null
        }
      }
    },
    methods: {
      onSubmit () {
        for (const prop in this.gameForm) {
          if (this.gameForm[prop] === null) return
        }
        connectDatastore(this.gameForm.platform).then(() => {
          createGame(this.gameForm)
            .then(this.$router.back())
        })
      }
    },
    mounted () {
      connectDatastore().then(() => {
        getDevelopers()
          .then(res => this.developers = res)
        getPlatforms()
          .then(res => this.platforms = res)
      })
    }
  }
</script>

<style>
</style>
