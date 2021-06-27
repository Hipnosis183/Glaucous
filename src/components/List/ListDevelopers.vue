<template>
  <div>
    <button>
      <router-link
        :to="{ name: 'CreateDeveloper' }"
      >New Developer</router-link>
    </button>
    <ul>
      <li
        v-for="d in developers"
        :key="d._id"
        :value="d._id"
        @click="$router.push(`/developers/${ d._id }`)"
      >{{ d.name }}</li>
    </ul>
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
