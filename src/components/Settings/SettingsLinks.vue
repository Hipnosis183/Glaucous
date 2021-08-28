<template>
  <!-- Header. -->
  <hip-section-header label="Link Options">
    <!-- Options. -->
    <hip-section-content>
      <!-- Google search. -->
      <settings-links-google-search />
    </hip-section-content>
    <hip-section-content>
      <!-- Google search key. -->
      <settings-links-google-key />
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
import SettingsLinksGoogleKey from './SettingsLinks/SettingsLinksGoogleKey.vue'
import SettingsLinksGoogleSearch from './SettingsLinks/SettingsLinksGoogleSearch.vue'

export default {
  name: 'SettingsLinks',
  components: {
    // UI components.
    HipSectionContent,
    HipSectionHeader,
    // Settings components.
    SettingsLinksGoogleKey,
    SettingsLinksGoogleSearch
  }
}
</script>

<style>
</style>