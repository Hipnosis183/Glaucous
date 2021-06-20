<template>
  <div>
    <button>
      <router-link
        :to="{ name: 'CreatePlatform' }"
      >New Platform</router-link>
    </button>
    <ul>
      <li
        v-for="platform in platforms"
        :key="platform._id"
        :value="platform._id"
        @click="$router.push(`/platforms/${ platform._id }`)"
      >{{ platform.name }}</li>
    </ul>
    <button
      @click="$router.back()"
    >Back</button>
  </div>
</template>

<script>
  import { connectDatastore } from '../../database/datastore'
  import { getPlatforms } from '../../database/controllers/Platform'

  export default {
    name: 'list-platforms',
    data () {
      return {
        platforms: null
      }
    },
    methods: {},
    mounted () {
      connectDatastore().then(() => {
        getPlatforms()
          .then(res => this.platforms = res)
      })
    }
  }
</script>

<style>
</style>
