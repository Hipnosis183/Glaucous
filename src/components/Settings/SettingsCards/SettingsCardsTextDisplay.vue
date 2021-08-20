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
      get() { return this.$store.state.cardTextDisplay },
      set() { this.$store.commit('toggleCardTextDisplay') }
    }
  }
}
</script>

<style>
</style>