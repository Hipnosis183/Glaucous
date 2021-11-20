<template>
  <!-- Name input. -->
  <vi-input
    v-model="name"
    input-label="Name *"
    input-placeholder="Enter a name for the playlist..."
    input-required
  />
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormPlaylistName',
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage forms in the store.
    const name = computed({
      get() { return store.state.playlistForm.name },
      set(value) { store.commit('setPlaylistName', value) }
    })

    return {
      name
    }
  }
}
</script>

<style>
</style>