<template>
  <!-- Emulator path input. -->
  <vi-input
    v-model="path"
    input-label="Path *"
    input-placeholder="Select emulator directory path..."
    input-required
  />
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormEmulatorPath',
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage forms in the store.
    const path = computed({
      get() { return store.state.emulatorForm.path },
      set(value) { store.state.emulatorForm.path = value }
    })

    return {
      path
    }
  }
}
</script>

<style>
</style>