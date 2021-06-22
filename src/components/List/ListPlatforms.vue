<template>
  <div>
    <button>
      <router-link
        :to="{ name: 'CreatePlatform' }"
      >New Platform</router-link>
    </button>
    <ul>
      <li
        v-for="p in platforms"
        :key="p._id"
        :value="p._id"
        @click="$router.push(`/platforms/${ p._id }`)"
      >{{ p.name }}</li>
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
