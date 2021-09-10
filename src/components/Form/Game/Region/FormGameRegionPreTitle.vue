<template>
  <!-- Sub title input. -->
  <hip-input
    v-model="preTitle"
    label="Pretitle"
  ></hip-input>
</template>

<script>
// Import UI components.
import { HipInput } from '@/components/Component'

// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormGameRegionPreTitle',
  components: {
    // UI components.
    HipInput
  },
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