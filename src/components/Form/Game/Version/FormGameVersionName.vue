<template>
  <!-- Version name input. -->
  <hip-input
    v-model="name"
    label="Version Name"
  ></hip-input>
</template>

<script>
// Import UI components.
import { HipInput } from '@/components/Component'

// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormGameVersionName',
  components: {
    // UI components.
    HipInput
  },
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage forms in the store.
    const name = computed({
      get() { return store.state.gameForm.gameVersion.name },
      set(value) { store.commit('setGameVersionName', value) }
    })

    return {
      name
    }
  }
}
</script>

<style>
</style>