<template>
  <!-- Header. -->
  <hip-section-header label="Card Options">
    <!-- Options. -->
    <hip-section-content>
      <!-- Card view mode. -->
      <settings-cards-mode />
    </hip-section-content>
    <hip-section-content>
      <!-- Select number of columns for card views. -->
      <settings-cards-columns />
    </hip-section-content>
    <hip-section-content>
      <!-- Card image display. -->
      <settings-cards-image-display />
    </hip-section-content>
    <hip-section-content>
      <!-- Card image position. -->
      <settings-cards-image-position />
    </hip-section-content>
    <hip-section-content>
      <!-- Card text display. -->
      <settings-cards-text-display />
    </hip-section-content>
    <hip-section-content>
      <!-- Card text position. -->
      <settings-cards-text-position />
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
import SettingsCardsColumns from './SettingsCards/SettingsCardsColumns.vue'
import SettingsCardsImageDisplay from './SettingsCards/SettingsCardsImageDisplay.vue'
import SettingsCardsImagePosition from './SettingsCards/SettingsCardsImagePosition.vue'
import SettingsCardsMode from './SettingsCards/SettingsCardsMode.vue'
import SettingsCardsTextDisplay from './SettingsCards/SettingsCardsTextDisplay.vue'
import SettingsCardsTextPosition from './SettingsCards/SettingsCardsTextPosition.vue'

export default {
  name: 'SettingsCards',
  components: {
    // UI components.
    HipSectionContent,
    HipSectionHeader,
    // Settings components.
    SettingsCardsColumns,
    SettingsCardsImageDisplay,
    SettingsCardsImagePosition,
    SettingsCardsMode,
    SettingsCardsTextDisplay,
    SettingsCardsTextPosition
  }
}
</script>

<style>
</style>