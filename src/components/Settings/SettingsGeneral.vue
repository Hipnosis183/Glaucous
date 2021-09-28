<template>
  <!-- Header. -->
  <vi-section-header label="General Options">
    <!-- Edit mode. -->
    <vi-section-content>
      <p class="text-xl">Edit mode</p>
      <vi-switch v-model="editMode" />
    </vi-section-content>
  </vi-section-header>
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'SettingsGeneral',
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