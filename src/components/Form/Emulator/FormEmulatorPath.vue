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
import { HipInput } from '@/components/Component'

// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormEmulatorPath',
  components: {
    // UI components.
    HipInput
  },
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