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
import { HipInput } from '@/components/Component'

// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormEmulatorFile',
  components: {
    // UI components.
    HipInput
  },
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