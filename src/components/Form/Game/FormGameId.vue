<template>
  <!-- ID input. -->
  <vi-input
    v-model="id"
    input-label="ID"
    input-placeholder="Randomly generated"
  />
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormGameId',
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage forms in the store.
    const id = computed({
      get() { return store.state.gameForm.id },
      set(value) { store.commit('setGameID', value) }
    })

    return {
      id
    }
  }
}
</script>

<style>
</style>