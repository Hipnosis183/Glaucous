<template>
  <!-- Current version input. -->
  <hip-input
    v-model="currentVersion"
    label="Current Version"
  ></hip-input>
</template>

<script>
// Import UI components.
import { HipInput } from '../Component'

export default {
  name: 'FormCurrentVersion',
  components: {
    // UI components.
    HipInput
  },
  computed: {
    currentVersion: {
      get() { return this.$store.state.gameForm.gameVersion.currentVersion },
      set(value) { this.$store.commit('setGameVersionCurrentVersion', value) }
    }
  }
}
</script>

<style>
</style>