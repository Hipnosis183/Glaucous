<template>
  <!-- Header. -->
  <vi-section-header label="Games Options">
    <!-- View platform groups. -->
    <vi-section-content>
      <p class="text-xl">View platform groups</p>
      <vi-switch v-model="groupsView" />
    </vi-section-content>
  </vi-section-header>
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'SettingsGames',
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage settings in the store.
    const groupsView = computed({
      get() { return store.getters.getSettingsGamesGroupsView },
      set() { store.commit('setSettingsGamesGroupsView') }
    })

    return {
      groupsView
    }
  }
}
</script>

<style>
</style>