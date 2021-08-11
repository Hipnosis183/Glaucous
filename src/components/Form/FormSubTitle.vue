<template>
  <!-- Sub title input. -->
  <hip-input
    v-model="subTitle"
    label="Subtitle"
  ></hip-input>
</template>

<script>
// Import UI components.
import { HipInput } from '../Component'

export default {
  name: 'FormSubTitle',
  components: {
    // UI components.
    HipInput
  },
  computed: {
    subTitle: {
      get() { return this.$store.state.gameForm.gameRegion.subTitle },
      set(value) { this.$store.commit('setGameRegionSubTitle', value) }
    }
  }
}
</script>

<style>
</style>