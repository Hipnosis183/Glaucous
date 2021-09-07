<template>
  <!-- Release year input. -->
  <hip-input
    v-model="releaseYear"
    label="Release Year"
    placeholder="Required"
    required
  ></hip-input>
</template>

<script>
// Import UI components.
import { HipInput } from '../../../Component'

export default {
  name: 'FormGamePlatformReleaseYear',
  components: {
    // UI components.
    HipInput
  },
  computed: {
    releaseYear: {
      get() { return this.$store.state.gameForm.gamePlatform.releaseYear },
      set(value) { this.$store.commit('setGamePlatformReleaseYear', value) }
    }
  }
}
</script>

<style>
</style>