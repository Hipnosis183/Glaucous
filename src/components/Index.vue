<template>
  <div class="flex h-full items-center justify-center">
    <hip-button-sb @click="dbSeed()">Seed</hip-button-sb>
  </div>
</template>

<script>
// Import database functions.
import { dbSeed } from '@/database/seeder'

export default {
  name: 'Index',
  setup() {
    return {
      dbSeed
    }
  }
}
</script>

<style>
</style>