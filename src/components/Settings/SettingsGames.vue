<template>
  <!-- Header. -->
  <hip-section-header label="Games Options">
    <!-- View platform groups. -->
    <hip-section-content>
      <p class="text-xl">View platform groups</p>
      <hip-switch v-model="groupsView" />
    </hip-section-content>
  </hip-section-header>
</template>

<script>
// Import UI components.
import {
  HipSectionContent,
  HipSectionHeader,
  HipSwitch
} from '../Component'

export default {
  name: 'SettingsGames',
  components: {
    // UI components.
    HipSectionContent,
    HipSectionHeader,
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