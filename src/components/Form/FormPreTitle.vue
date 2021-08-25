<template>
  <!-- Sub title input. -->
  <hip-input
    v-model="preTitle"
    label="Pretitle"
  ></hip-input>
</template>

<script>
// Import UI components.
import { HipInput } from '../Component'

export default {
  name: 'FormPreTitle',
  components: {
    // UI components.
    HipInput
  },
  computed: {
    preTitle: {
      get() { return this.$store.state.gameForm.gameRegion.preTitle },
      set(value) { this.$store.commit('setGameRegionPreTitle', value) }
    }
  }
}
</script>

<style>
</style>