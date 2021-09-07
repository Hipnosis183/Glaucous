<template>
  <!-- Executable file input. -->
  <hip-input
    v-model="file"
    label="Executable File"
    placeholder="Required"
    required
  />
</template>

<script>
// Import UI components.
import { HipInput } from '../../Component'

export default {
  name: 'FormEmulatorFile',
  components: {
    // UI components.
    HipInput
  },
  computed: {
    file: {
      get() { return this.$store.state.emulatorForm.file },
      set(value) { this.$store.state.emulatorForm.file = value }
    }
  }
}
</script>

<style>
</style>