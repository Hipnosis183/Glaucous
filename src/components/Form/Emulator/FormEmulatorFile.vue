<template>
  <!-- Executable file input. -->
  <vi-input
    v-model="file"
    input-label="Executable File *"
    input-placeholder="Select emulator executable..."
    input-required
  />
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormEmulatorFile',
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage forms in the store.
    const file = computed({
      get() { return store.state.emulatorForm.file },
      set(value) { store.state.emulatorForm.file = value }
    })

    return {
      file
    }
  }
}
</script>

<style>
</style>