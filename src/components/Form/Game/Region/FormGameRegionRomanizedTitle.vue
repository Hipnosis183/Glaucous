<template>
  <!-- Romanized title input. -->
  <vi-input
    v-model="romanizedTitle"
    label="Romanized Title"
  ></vi-input>
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormGameRegionRomanizedTitle',
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage forms in the store.
    const romanizedTitle = computed({
      get() { return store.state.gameForm.gameRegion.romanizedTitle },
      set(value) { store.commit('setGameRegionRomanizedTitle', value) }
    })

    return {
      romanizedTitle
    }
  }
}
</script>

<style>
</style>