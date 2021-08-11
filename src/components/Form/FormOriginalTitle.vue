<template>
  <!-- Original title input. -->
  <hip-input
    v-model="originalTitle"
    label="Original Title"
  ></hip-input>
</template>

<script>
// Import UI components.
import { HipInput } from '../Component'

export default {
  name: 'FormOriginalTitle',
  components: {
    // UI components.
    HipInput
  },
  computed: {
    originalTitle: {
      get() { return this.$store.state.gameForm.gameRegion.originalTitle },
      set(value) { this.$store.commit('setGameRegionOriginalTitle', value) }
    }
  }
}
</script>

<style>
</style>