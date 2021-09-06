<template>
  <!-- Emulator path input. -->
  <hip-input
    v-model="path"
    label="Path"
    placeholder="Required"
    required
  />
</template>

<script>
// Import UI components.
import { HipInput } from '../Component'

export default {
  name: 'FormEmulatorPath',
  components: {
    // UI components.
    HipInput
  },
  computed: {
    path: {
      get() { return this.$store.state.emulatorForm.path },
      set(value) { this.$store.state.emulatorForm.path = value }
    }
  }
}
</script>

<style>
</style>