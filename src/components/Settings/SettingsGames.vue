<template>
  <div class="mb-10">
    <!-- Header. -->
    <div class="header-content">
      <h1 class="header-title">Games Options</h1>
    </div>
    <!-- Options. -->
    <div class="option-content">
      <!-- Edit mode. -->
      <settings-games-view-groups />
    </div>
  </div>
</template>

<script>
// Import settings components.
import SettingsGamesViewGroups from './SettingsGames/SettingsGamesViewGroups.vue'

export default {
  name: 'SettingsGames',
  components: {
    // Settings components.
    SettingsGamesViewGroups
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