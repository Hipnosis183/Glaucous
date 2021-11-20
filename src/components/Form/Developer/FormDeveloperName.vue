<template>
  <!-- Name input. -->
  <vi-input
    v-model="name"
    input-label="Name *"
    input-placeholder="Enter a name for the developer..."
    input-required
  />
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormDeveloperName',
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage forms in the store.
    const name = computed({
      get() { return store.state.developerForm.name },
      set(value) { store.commit('setDeveloperName', value) }
    })

    return {
      name
    }
  }
}
</script>

<style>
</style>