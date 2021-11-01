<template>
  <!-- Release year input. -->
  <vi-input
    v-model="releaseYear"
    label="Release Year"
    placeholder="Undefined"
  />
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormGamePlatformReleaseYear',
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage forms in the store.
    const releaseYear = computed({
      get() { return store.state.gameForm.gamePlatform.releaseYear },
      set(value) { store.commit('setGamePlatformReleaseYear', value) }
    })

    return {
      releaseYear
    }
  }
}
</script>

<style>
</style>