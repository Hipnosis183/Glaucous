<template>
  <!-- Parameters input. -->
  <hip-input
    v-model="params"
    label="Parameters"
  />
</template>

<script>
// Import UI components.
import { HipInput } from '@/components/Component'

// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormEmulatorParams',
  components: {
    // UI components.
    HipInput
  },
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage forms in the store.
    const params = computed({
      get() { return store.state.emulatorForm.params },
      set(value) { store.state.emulatorForm.params = value }
    })

    return {
      params
    }
  }
}
</script>

<style>
</style>