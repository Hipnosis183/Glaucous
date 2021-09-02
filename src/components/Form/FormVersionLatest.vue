<template>
  <!-- Latest version input. -->
  <hip-input
    v-model="latest"
    label="Latest Version"
  ></hip-input>
</template>

<script>
// Import UI components.
import { HipInput } from '../Component'

export default {
  name: 'FormVersionLatest',
  components: {
    // UI components.
    HipInput
  },
  computed: {
    latest: {
      get() { return this.$store.state.gameForm.gameVersion.latest },
      set(value) { this.$store.commit('setGameVersionLatest', value) }
    }
  }
}
</script>

<style>
</style>