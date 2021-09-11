<template>
  <!-- Original title input. -->
  <hip-input
    v-model="originalTitle"
    label="Original Title"
  ></hip-input>
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormGameRegionOriginalTitle',
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage forms in the store.
    const originalTitle = computed({
      get() { return store.state.gameForm.gameRegion.originalTitle },
      set(value) { store.commit('setGameRegionOriginalTitle', value) }
    })

    return {
      originalTitle
    }
  }
}
</script>

<style>
</style>