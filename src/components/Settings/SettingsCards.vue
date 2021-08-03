<template>
  <div>
    <!-- Header. -->
    <div class="header-content">
      <h1 class="header-title">Card Options</h1>
    </div>
    <!-- Options. -->
    <div class="option-content">
      <!-- Card view mode. -->
      <settings-cards-mode />
    </div>
    <div class="option-content">
      <!-- Select number of columns for card views. -->
      <settings-cards-columns />
    </div>
    <div class="option-content">
      <!-- Card image display. -->
      <settings-cards-image-display />
    </div>
    <div class="option-content">
      <!-- Card image position. -->
      <settings-cards-image-position />
    </div>
    <div class="option-content">
      <!-- Card text display. -->
      <settings-cards-text-display />
    </div>
    <div class="option-content">
      <!-- Card text position. -->
      <settings-cards-text-position />
    </div>
  </div>
</template>

<script>
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