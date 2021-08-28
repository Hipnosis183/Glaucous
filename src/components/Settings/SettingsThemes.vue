<template>
  <!-- Header. -->
  <hip-section-header label="Theme Options">
    <!-- Options. -->
    <hip-section-content>
      <!-- Dark mode. -->
      <settings-themes-dark-mode />
    </hip-section-content>
    <hip-section-content>
      <!-- Theme select. -->
      <settings-themes-theme />
    </hip-section-content>
    <hip-section-content>
      <!-- Color theme select. -->
      <settings-themes-theme-color />
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
import SettingsThemesDarkMode from './SettingsThemes/SettingsThemesDarkMode.vue'
import SettingsThemesTheme from './SettingsThemes/SettingsThemesTheme.vue'
import SettingsThemesThemeColor from './SettingsThemes/SettingsThemesThemeColor.vue'

export default {
  name: 'SettingsThemes',
  components: {
    // UI components.
    HipSectionContent,
    HipSectionHeader,
    // Settings components.
    SettingsThemesDarkMode,
    SettingsThemesTheme,
    SettingsThemesThemeColor
  }
}
</script>

<style>
</style>