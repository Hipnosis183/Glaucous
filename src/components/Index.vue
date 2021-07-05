<template>
  <div class="flex items-center justify-center h-full">
    <hip-button-sb @click="seed()">Seed</hip-button-sb>
  </div>
</template>

<script>
import { HipButtonSb } from './Component'

import { dbSeed } from '../database/seeder'

export default {
  name: 'Index',
  components: {
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
