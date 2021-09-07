<template>
  <!-- Parameters input. -->
  <hip-input
    v-model="params"
    label="Parameters"
  />
</template>

<script>
// Import UI components.
import { HipInput } from '../../Component'

export default {
  name: 'FormEmulatorParams',
  components: {
    // UI components.
    HipInput
  },
  computed: {
    params: {
      get() { return this.$store.state.emulatorForm.params },
      set(value) { this.$store.state.emulatorForm.params = value }
    }
  }
}
</script>

<style>
</style>