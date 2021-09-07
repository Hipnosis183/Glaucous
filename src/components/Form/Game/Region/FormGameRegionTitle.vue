<template>
  <!-- Title input. -->
  <hip-input
    v-model="title"
    label="Title"
    placeholder="Required"
    required
  ></hip-input>
</template>

<script>
// Import UI components.
import { HipInput } from '../../../Component'

export default {
  name: 'FormGameRegionTitle',
  components: {
    // UI components.
    HipInput
  },
  computed: {
    title: {
      get() { return this.$store.state.gameForm.gameRegion.title },
      set(value) { this.$store.commit('setGameRegionTitle', value) }
    }
  }
}
</script>

<style>
</style>