<template>
  <!-- Latest version input. -->
  <hip-input
    v-model="latestVersion"
    label="Latest Version"
  ></hip-input>
</template>

<script>
// Import UI components.
import { HipInput } from '../Component'

export default {
  name: 'FormLatestVersion',
  components: {
    // UI components.
    HipInput
  },
  computed: {
    latestVersion: {
      get() { return this.$store.state.gameForm.gamePlatform.latestVersion },
      set(value) { this.$store.commit('setGamePlatformLatestVersion', value) }
    }
  }
}
</script>

<style>
</style>