<template>
  <!-- Version number input. -->
  <hip-input
    v-model="number"
    label="Version Number"
  ></hip-input>
</template>

<script>
// Import UI components.
import { HipInput } from '../Component'

export default {
  name: 'FormVersionNumber',
  components: {
    // UI components.
    HipInput
  },
  computed: {
    number: {
      get() { return this.$store.state.gameForm.gameVersion.number },
      set(value) { this.$store.commit('setGameVersionNumber', value) }
    }
  }
}
</script>

<style>
</style>