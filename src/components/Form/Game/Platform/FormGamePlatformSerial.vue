<template>
  <!-- Serial input. -->
  <vi-input
    v-model="serial"
    label="Serial | Code | Game ID"
  />
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormGamePlatformSerial',
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage forms in the store.
    const serial = computed({
      get() { return store.state.gameForm.gameRegion.serial },
      set(value) { store.commit('setGameRegionSerial', value) }
    })

    return {
      serial
    }
  }
}
</script>

<style>
</style>