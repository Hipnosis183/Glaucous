<template>
  <div>
    <div class="inline-flex shadow bg-white w-full justify-between">
      <router-link :to="{ name: 'CreateDeveloper' }">
        <button class="bg-gray-300 font-semibold px-6 py-4 text-base text-blue-800">New Developer</button>
      </router-link>
      <div></div>
    </div>
    <ul class="grid grid-cols-4 gap-4 m-6">
      <li
        v-for="d in developers"
        :key="d._id"
        :value="d._id"
        @click="$router.push(`/developers/${ d._id }`)"
      >
        <div class="bg-white p-4 rounded-xl shadow text-center cursor-pointer">
          <h1 class="text-xl text-blue-800 font-semibold">{{ d.name }}</h1>
          <!-- Placeholder -->
          <p class="text-indigo-400">0 Titles</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { connectDatastore } from '../../database/datastore'
import { getDevelopers } from '../../database/controllers/Developer'

export default {
  name: 'list-developers',
  data() {
    return {
      developers: null
    }
  },
  mounted() {
    connectDatastore().then(() => {
      getDevelopers()
        .then(res => this.developers = res)
    })
  }
}
</script>

<style>
</style>
