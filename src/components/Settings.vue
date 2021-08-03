<template>
  <div>
    <!-- Navigation bar. -->
    <hip-nav-bar
      title="Settings"
      class="bg-transition"
    />
    <!-- Settings panel. -->
    <div class="flex m-6 space-x-6">
      <hip-modal class="bg-transition py-8 h-content w-full">
        <div class="flex max-h-content overflow-hidden">
          <div class="flex-1 no-scrollbar overflow-y-scroll items-center">
            <!-- General options. -->
            <settings-general />
            <!-- Theme options. -->
            <settings-themes />
            <!-- Links options. -->
            <settings-links />
            <!-- Card options. -->
            <settings-cards />
          </div>
        </div>
      </hip-modal>
    </div>
  </div>
</template>

<script>
// Import UI components.
import {
  HipModal,
  HipNavBar
} from './Component'
// Import settings components.
import SettingsCards from './Settings/SettingsCards.vue'
import SettingsGeneral from './Settings/SettingsGeneral.vue'
import SettingsLinks from './Settings/SettingsLinks.vue'
import SettingsThemes from './Settings/SettingsThemes.vue'

export default {
  name: 'Settings',
  components: {
    // UI components.
    HipModal,
    HipNavBar,
    // Settings components.
    SettingsCards,
    SettingsGeneral,
    SettingsLinks,
    SettingsThemes
  }
}
</script>

<style lang="postcss" scoped>
/* Calculations. */
.h-content {
  height: calc(100vh - 6.25rem);
}
.max-h-content {
  max-height: calc(100vh - 10rem);
}
/* Transitions. */
.bg-transition {
  transition: background-color 1s;
}
</style>