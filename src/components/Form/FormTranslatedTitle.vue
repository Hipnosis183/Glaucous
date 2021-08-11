<template>
  <!-- Translated title input. -->
  <hip-input
    v-model="translatedTitle"
    label="Translated Title"
  ></hip-input>
</template>

<script>
// Import UI components.
import { HipInput } from '../Component'

export default {
  name: 'FormTranslatedTitle',
  components: {
    // UI components.
    HipInput
  },
  computed: {
    translatedTitle: {
      get() { return this.$store.state.gameForm.gameRegion.translatedTitle },
      set(value) { this.$store.commit('setGameRegionTranslatedTitle', value) }
    }
  }
}
</script>

<style>
</style>