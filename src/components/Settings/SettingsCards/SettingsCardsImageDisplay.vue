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
      get() { return this.$store.state.cardImageDisplay },
      set() { this.$store.commit('toggleCardImageDisplay') }
    }
  }
}
</script>

<style>
</style>