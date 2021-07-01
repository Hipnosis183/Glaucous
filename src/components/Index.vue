<template>
  <div class="flex items-center justify-center h-full">
    <button
      class="bg-gray-100 font-semibold px-6 py-4 rounded-full text-base text-blue-800"
      @click="seed()"
    >Seed</button>
  </div>
</template>

<script>
import { dbSeed } from '../database/seeder'

export default {
  name: 'Index',
  methods: {
    seed() {
      dbSeed()
    }
  }
}
</script>

<style>
</style>
