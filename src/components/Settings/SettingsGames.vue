<template>
  <!-- Header. -->
  <hip-section-header label="Games Options">
    <!-- Options. -->
    <hip-section-content>
      <!-- View platform groups. -->
      <settings-games-view-groups />
    </hip-section-content>
  </hip-section-header>
</template>

<script>
// Import UI components.
import {
  HipSectionContent,
  HipSectionHeader
} from '../Component'
// Import settings components.
import SettingsGamesViewGroups from './SettingsGames/SettingsGamesViewGroups.vue'

export default {
  name: 'SettingsGames',
  components: {
    // UI components.
    HipSectionContent,
    HipSectionHeader,
    // Settings components.
    SettingsGamesViewGroups
  }
}
</script>

<style>
</style>