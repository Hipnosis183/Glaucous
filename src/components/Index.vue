<template>
  <div class="flex items-center justify-center h-full">
    <hip-button-sb @click="seed()">Seed</hip-button-sb>
  </div>
</template>

<script>
// Import UI components.
import { HipButtonSb } from './Component'
// Import database functions.
import { dbSeed } from '../database/seeder'

export default {
  name: 'Index',
  components: {
    // UI components.
    HipButtonSb
  },
  methods: {
    seed() {
      dbSeed()
    }
  }
}
</script>

<style>
</style>
