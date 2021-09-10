<template>
  <!-- Original title input. -->
  <hip-input
    v-model="originalTitle"
    label="Original Title"
  ></hip-input>
</template>

<script>
// Import UI components.
import { HipInput } from '@/components/Component'

// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormGameRegionOriginalTitle',
  components: {
    // UI components.
    HipInput
  },
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