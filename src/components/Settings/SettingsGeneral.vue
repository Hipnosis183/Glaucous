<template>
  <!-- Header. -->
  <hip-section-header label="General Options">
    <!-- Edit mode. -->
    <hip-section-content>
      <p class="text-xl">Edit mode</p>
      <hip-switch v-model="editMode" />
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
  name: 'SettingsGeneral',
  components: {
    // UI components.
    HipSectionContent,
    HipSectionHeader,
    HipSwitch
  },
  computed: {
    editMode: {
      get() { return this.$store.getters.getSettingsGeneralEditMode },
      set() { this.$store.commit('setSettingsGeneralEditMode') }
    }
  }
}
</script>

<style>
</style>