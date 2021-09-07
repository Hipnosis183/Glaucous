<template>
  <div class="flex h-full items-center justify-center">
    <hip-button-sb @click="dbSeed()">Seed</hip-button-sb>
  </div>
</template>

<script>
// Import UI components.
import { HipButtonSb } from '@/components/Component'
// Import database functions.
import { dbSeed } from '@/database/seeder'

export default {
  name: 'Index',
  components: {
    // UI components.
    HipButtonSb
  },
  setup() {
    return {
      dbSeed
    }
  }
}
</script>

<style>
</style>