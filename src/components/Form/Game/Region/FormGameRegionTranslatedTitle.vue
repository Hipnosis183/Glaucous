<template>
  <!-- Translated title input. -->
  <hip-input
    v-model="translatedTitle"
    label="Translated Title"
  ></hip-input>
</template>

<script>
// Import UI components.
import { HipInput } from '@/components/Component'

// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormGameRegionTranslatedTitle',
  components: {
    // UI components.
    HipInput
  },
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage forms in the store.
    const translatedTitle = computed({
      get() { return store.state.gameForm.gameRegion.translatedTitle },
      set(value) { store.commit('setGameRegionTranslatedTitle', value) }
    })

    return {
      translatedTitle
    }
  }
}
</script>

<style>
</style>