<template>
  <p class="text-xl">Image display</p>
  <hip-switch v-model="cardImageDisplay" />
</template>

<script>
// Import UI components.
import { HipSwitch } from '../../Component'

export default {
  name: 'SettingsCardsImageDisplay',
  components: {
    // UI components.
    HipSwitch
  },
  computed: {
    cardImageDisplay: {
      get() { return this.$store.getters.getSettingsCardsCardImageDisplay },
      set() { this.$store.commit('setSettingsCardsCardImageDisplay') }
    }
  }
}
</script>

<style>
</style>