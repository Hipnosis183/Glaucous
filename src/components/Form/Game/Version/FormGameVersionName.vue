<template>
  <!-- Version name input. -->
  <vi-input
    v-model="name"
    label="Version Name"
    placeholder="Enter a version name..."
  />
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormGameVersionName',
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