<template>
  <!-- Header. -->
  <hip-section-header label="General Options">
    <!-- Options. -->
    <hip-section-content>
      <!-- Edit mode. -->
      <settings-general-edit-mode />
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
import SettingsGeneralEditMode from './SettingsGeneral/SettingsGeneralEditMode.vue'

export default {
  name: 'SettingsGeneral',
  components: {
    // UI components.
    HipSectionContent,
    HipSectionHeader,
    // Settings components.
    SettingsGeneralEditMode
  }
}
</script>

<style>
</style>