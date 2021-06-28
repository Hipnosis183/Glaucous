<template>
  <div>
    <router-link :to="{ name: 'CreatePlatform' }">
      <button class="bg-gray-200 font-semibold px-6 py-3 rounded-full text-base text-blue-800">New Platform</button>
    </router-link>
    <ul class="space-y-4 mt-8">
      <li
        v-for="p in platforms"
        :key="p._id"
        :value="p._id"
      >
        <button
          class="bg-gray-200 px-6 py-3 rounded-full w-full"
          @click="$router.push(`/platforms/${p._id}`)"
        >{{ p.name }}</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { connectDatastore } from '../../database/datastore'
import { getPlatforms } from '../../database/controllers/Platform'

export default {
  name: 'list-platforms',
  data() {
    return {
      platforms: null
    }
  },
  mounted() {
    connectDatastore().then(() => {
      getPlatforms()
        .then(res => this.platforms = res)
    })
  }
}
</script>

<style>
</style>
