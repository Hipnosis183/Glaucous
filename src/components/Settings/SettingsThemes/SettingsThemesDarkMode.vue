<template>
  <p class="text-xl">Dark mode</p>
  <hip-switch v-model="darkMode" />
</template>

<script>
// Import UI components.
import { HipSwitch } from '../../Component'

export default {
  name: 'SettingsThemesDarkMode',
  components: {
    // UI components.
    HipSwitch
  },
  computed: {
    darkMode: {
      get() { return this.$store.getters.getSettingsThemesDarkMode },
      set() { this.$store.commit('setSettingsThemesDarkMode') }
    }
  }
}
</script>

<style>
</style>