<template>
  <p class="text-xl">View platform groups</p>
  <hip-switch v-model="groupsView" />
</template>

<script>
// Import UI components.
import { HipSwitch } from '../../Component'

export default {
  name: 'SettingsGamesViewGroups',
  components: {
    // UI components.
    HipSwitch
  },
  computed: {
    groupsView: {
      get() { return this.$store.getters.getSettingsGamesGroupsView },
      set() { this.$store.commit('setSettingsGamesGroupsView') }
    }
  }
}
</script>

<style>
</style>