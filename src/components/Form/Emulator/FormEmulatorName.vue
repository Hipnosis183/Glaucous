<template>
  <!-- Emulator name input. -->
  <vi-input
    v-model="name"
    input-label="Name *"
    input-placeholder="Enter a name for the emulator..."
    input-required
  />
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormEmulatorName',
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage forms in the store.
    const name = computed({
      get() { return store.state.emulatorForm.name },
      set(value) { store.state.emulatorForm.name = value }
    })

    return {
      name
    }
  }
}
</script>

<style>
</style>