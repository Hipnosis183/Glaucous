<template>
  <div class="mb-10">
    <!-- Header. -->
    <div class="header-content">
      <h1 class="header-title">Theme Options</h1>
    </div>
    <!-- Options. -->
    <div class="option-content">
      <!-- Dark mode. -->
      <settings-themes-dark-mode />
    </div>
    <div class="option-content">
      <!-- Theme select. -->
      <settings-themes-theme />
    </div>
    <div class="option-content">
      <!-- Color theme select. -->
      <settings-themes-theme-color />
    </div>
  </div>
</template>

<script>
// Import settings components.
import SettingsThemesDarkMode from './SettingsThemes/SettingsThemesDarkMode.vue'
import SettingsThemesTheme from './SettingsThemes/SettingsThemesTheme.vue'
import SettingsThemesThemeColor from './SettingsThemes/SettingsThemesThemeColor.vue'

export default {
  name: 'SettingsThemes',
  components: {
    // Settings components.
    SettingsThemesDarkMode,
    SettingsThemesTheme,
    SettingsThemesThemeColor
  }
}
</script>

<style lang="postcss" scoped>
/* Styling. */
.header-content {
  @apply px-4 w-full;
}
.header-title {
  @apply bg-transition border-b-2 border-color-800 pb-2 text-xl;
}
.dark .header-title {
  @apply border-color-500;
}
.option-content {
  @apply flex items-center h-8 justify-between mx-6 my-6;
}
/* Transitions. */
.bg-transition {
  transition: border-color 1s, color 1s;
}
</style>