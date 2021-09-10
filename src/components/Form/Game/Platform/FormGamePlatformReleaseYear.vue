<template>
  <!-- Release year input. -->
  <hip-input
    v-model="releaseYear"
    label="Release Year"
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
  name: 'FormGamePlatformReleaseYear',
  components: {
    // UI components.
    HipInput
  },
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage forms in the store.
    const releaseYear = computed({
      get() { return store.state.gameForm.gamePlatform.releaseYear },
      set(value) { store.commit('setGamePlatformReleaseYear', value) }
    })

    return {
      releaseYear
    }
  }
}
</script>

<style>
</style>