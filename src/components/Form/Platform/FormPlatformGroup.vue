<template>
  <!-- Group switch input. -->
  <vi-switch
    v-model="group"
    label="Group"
  />
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormPlatformGroup',
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage forms in the store.
    const group = computed({
      get() { return store.state.platformForm.group },
      set(value) { store.commit('setPlatformGroup', value) }
    })

    return {
      group
    }
  }
}
</script>

<style>
</style>