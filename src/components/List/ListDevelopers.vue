<template>
  <div>
    <router-link :to="{ name: 'CreateDeveloper' }">
      <button class="bg-gray-200 font-semibold px-6 py-3 rounded-full text-base text-blue-800">New Developer</button>
    </router-link>
    <ul class="space-y-4 mt-8">
      <li
        v-for="d in developers"
        :key="d._id"
        :value="d._id"
      >
        <button
          class="bg-gray-200 px-6 py-3 rounded-full w-full"
          @click="$router.push(`/developers/${ d._id }`)"
        >{{ d.name }}</button>
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
