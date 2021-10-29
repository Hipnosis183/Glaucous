<template>
  <!-- Latest version input. -->
  <vi-input
    v-model="latest"
    label="Latest Version"
  />
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormGameVersionLatest',
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage forms in the store.
    const latest = computed({
      get() { return store.state.gameForm.gameVersion.latest },
      set(value) { store.commit('setGameVersionLatest', value) }
    })

    return {
      latest
    }
  }
}
</script>

<style>
</style>