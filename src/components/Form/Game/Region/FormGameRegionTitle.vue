<template>
  <!-- Title input. -->
  <vi-input
    v-model="title"
    label="Title"
    placeholder="Required"
    required
  ></vi-input>
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormGameRegionTitle',
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage forms in the store.
    const title = computed({
      get() { return store.state.gameForm.gameRegion.title },
      set(value) { store.commit('setGameRegionTitle', value) }
    })

    return {
      title
    }
  }
}
</script>

<style>
</style>