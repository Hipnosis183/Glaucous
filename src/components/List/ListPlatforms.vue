<template>
  <div>
    <div class="inline-flex shadow bg-white w-full justify-between">
      <router-link :to="{ name: 'CreatePlatform' }">
        <button class="bg-gray-300 font-semibold px-6 py-4 text-base text-blue-800">New Platform</button>
      </router-link>
      <div></div>
    </div>
    <ul class="grid grid-cols-4 gap-4 m-6">
      <li
        v-for="p in platforms"
        :key="p._id"
        :value="p._id"
        @click="$router.push(`/platforms/${p._id}`)"
      >
        <div class="bg-white p-4 rounded-xl shadow text-center cursor-pointer">
          <h1 class="text-xl text-blue-800 font-semibold">{{ p.name }}</h1>
          <p class="text-indigo-400">{{ p.titles }} Titles</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getPlatforms } from '../../database/controllers/Platform'

export default {
  name: 'list-platforms',
  data() {
    return {
      platforms: null
    }
  },
  mounted() {
    getPlatforms()
      .then(res => this.platforms = res)
  }
}
</script>

<style>
</style>
