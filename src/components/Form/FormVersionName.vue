<template>
  <!-- Version name input. -->
  <hip-input
    v-model="name"
    label="Version Name"
  ></hip-input>
</template>

<script>
// Import UI components.
import { HipInput } from '../Component'

export default {
  name: 'FormVersionName',
  components: {
    // UI components.
    HipInput
  },
  computed: {
    name: {
      get() { return this.$store.state.gameForm.gameVersion.name },
      set(value) { this.$store.commit('setGameVersionName', value) }
    }
  }
}
</script>

<style>
</style>