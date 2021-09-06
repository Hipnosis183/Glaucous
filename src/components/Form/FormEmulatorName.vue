<template>
  <!-- Emulator name input. -->
  <hip-input
    v-model="name"
    label="Name"
    placeholder="Required"
    required
  />
</template>

<script>
// Import UI components.
import { HipInput } from '../Component'

export default {
  name: 'FormEmulatorName',
  components: {
    // UI components.
    HipInput
  },
  computed: {
    name: {
      get() { return this.$store.state.emulatorForm.name },
      set(value) { this.$store.state.emulatorForm.name = value }
    }
  }
}
</script>

<style>
</style>