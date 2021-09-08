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
} from '@/components/Component'

// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'SettingsGeneral',
  components: {
    // UI components.
    HipSectionContent,
    HipSectionHeader,
    HipSwitch
  },
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage settings in the store.
    const editMode = computed({
      get() { return store.getters.getSettingsGeneralEditMode },
      set() { store.commit('setSettingsGeneralEditMode') }
    })

    return {
      editMode
    }
  }
}
</script>

<style>
</style>