<template>
  <!-- Header. -->
  <hip-section-header label="Games Options">
    <!-- View platform groups. -->
    <hip-section-content>
      <p class="text-xl">View platform groups</p>
      <hip-switch v-model="groupsView" />
    </hip-section-content>
  </hip-section-header>
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