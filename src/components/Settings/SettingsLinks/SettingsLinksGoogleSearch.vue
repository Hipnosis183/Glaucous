<template>
  <p class="text-xl">Google search icon</p>
  <hip-switch v-model="searchGoogle" />
</template>

<script>
// Import UI components.
import { HipSwitch } from '../../Component'

export default {
  name: 'SettingsLinksGoogleSearch',
  components: {
    // UI components.
    HipSwitch
  },
  computed: {
    searchGoogle: {
      get() { return this.$store.state.searchGoogle },
      set() { this.$store.commit('toggleSearchGoogle') }
    }
  }
}
</script>

<style>
</style>