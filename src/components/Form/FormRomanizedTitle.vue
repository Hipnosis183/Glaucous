<template>
  <!-- Romanized title input. -->
  <hip-input
    v-model="romanizedTitle"
    label="Romanized Title"
  ></hip-input>
</template>

<script>
// Import UI components.
import { HipInput } from '../Component'

export default {
  name: 'FormRomanizedTitle',
  components: {
    // UI components.
    HipInput
  },
  computed: {
    romanizedTitle: {
      get() { return this.$store.state.gameForm.gameRegion.romanizedTitle },
      set(value) { this.$store.commit('setGameRegionRomanizedTitle', value) }
    }
  }
}
</script>

<style>
</style>