<template>
  <p class="text-xl">Text display</p>
  <hip-switch v-model="cardTextDisplay" />
</template>

<script>
// Import UI components.
import { HipSwitch } from '../../Component'

export default {
  name: 'SettingsCardsTextDisplay',
  components: {
    // UI components.
    HipSwitch
  },
  computed: {
    cardTextDisplay: {
      get() { return this.$store.getters.getSettingsCardsCardTextDisplay },
      set() { this.$store.commit('setSettingsCardsCardTextDisplay') }
    }
  }
}
</script>

<style>
</style>