<template>
  <!-- Serial input. -->
  <hip-input
    v-model="serial"
    label="Serial | Code | Game ID"
  ></hip-input>
</template>

<script>
// Import UI components.
import { HipInput } from '../Component'

export default {
  name: 'FormSerial',
  components: {
    // UI components.
    HipInput
  },
  computed: {
    serial: {
      get() { return this.$store.state.gameForm.gameRegion.serial },
      set(value) { this.$store.commit('setGameRegionSerial', value) }
    }
  }
}
</script>

<style>
</style>