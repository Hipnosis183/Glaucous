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
import { HipInput } from '@/components/Component'

// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormEmulatorName',
  components: {
    // UI components.
    HipInput
  },
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