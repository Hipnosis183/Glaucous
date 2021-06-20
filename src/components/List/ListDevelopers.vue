<template>
  <div>
    <button>
      <router-link
        :to="{ name: 'CreateDeveloper' }"
      >New Developer</router-link>
    </button>
    <ul>
      <li
        v-for="developer in developers"
        :key="developer._id"
        :value="developer._id"
        @click="$router.push(`/developers/${ developer._id }`)"
      >{{ developer.name }}</li>
    </ul>
    <button
      @click="$router.back()"
    >Back</button>
  </div>
</template>

<script>
  import { connectDatastore } from '../../database/datastore'
  import { getDevelopers } from '../../database/controllers/Developer'

  export default {
    name: 'list-developers',
    data () {
      return {
        developers: null
      }
    },
    methods: {},
    mounted () {
      connectDatastore().then(() => {
        getDevelopers()
          .then(res => this.developers = res)
      })
    }
  }
</script>

<style>
</style>
