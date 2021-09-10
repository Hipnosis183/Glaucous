<template>
  <!-- Version number input. -->
  <hip-input
    v-model="number"
    label="Version Number"
  ></hip-input>
</template>

<script>
// Import UI components.
import { HipInput } from '@/components/Component'

// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormGameVersionNumber',
  components: {
    // UI components.
    HipInput
  },
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage forms in the store.
    const number = computed({
      get() { return store.state.gameForm.gameVersion.number },
      set(value) { store.commit('setGameVersionNumber', value) }
    })

    return {
      number
    }
  }
}
</script>

<style>
</style>