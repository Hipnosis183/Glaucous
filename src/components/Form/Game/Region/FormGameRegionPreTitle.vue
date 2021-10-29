<template>
  <!-- Sub title input. -->
  <vi-input
    v-model="preTitle"
    label="Pretitle"
  />
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormGameRegionPreTitle',
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage forms in the store.
    const preTitle = computed({
      get() { return store.state.gameForm.gameRegion.preTitle },
      set(value) { store.commit('setGameRegionPreTitle', value) }
    })

    return {
      preTitle
    }
  }
}
</script>

<style>
</style>