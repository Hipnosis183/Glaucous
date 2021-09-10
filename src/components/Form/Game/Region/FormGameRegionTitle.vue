<template>
  <!-- Title input. -->
  <hip-input
    v-model="title"
    label="Title"
    placeholder="Required"
    required
  ></hip-input>
</template>

<script>
// Import UI components.
import { HipInput } from '@/components/Component'

// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormGameRegionTitle',
  components: {
    // UI components.
    HipInput
  },
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