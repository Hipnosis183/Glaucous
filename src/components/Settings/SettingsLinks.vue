<template>
  <!-- Header. -->
  <hip-section-header label="Link Options">
    <!-- Google search. -->
    <hip-section-content>
      <p class="text-xl">Google search icon</p>
      <hip-switch v-model="searchGoogle" />
    </hip-section-content>
    <!-- Google search key. -->
    <hip-section-content>
      <p class="text-xl">Google search key</p>
      <hip-select
        v-model="searchGoogleKey"
        class="w-max"
      >
        <hip-option
          v-for="key in googleKeys"
          :key="key.i"
          :label="key.name"
          :value="key.i"
        >
        </hip-option>
      </hip-select>
    </hip-section-content>
  </hip-section-header>
</template>

<script>
// Import UI components.
import {
  HipOption,
  HipSelect,
  HipSectionContent,
  HipSectionHeader,
  HipSwitch
} from '@/components/Component'
// Import settings objects and functions.
import { googleKeys } from '@/settings'

// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'SettingsLinks',
  components: {
    // UI components.
    HipOption,
    HipSelect,
    HipSectionContent,
    HipSectionHeader,
    HipSwitch
  },
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage settings in the store.
    const searchGoogle = computed({
      get() { return store.getters.getSettingsLinksSearchGoogle },
      set() { store.commit('setSettingsLinksSearchGoogle') }
    })
    const searchGoogleKey = computed({
      get() { return store.getters.getSettingsLinksSearchGoogleKey },
      set(value) { store.commit('setSettingsLinksSearchGoogleKey', value) }
    })

    return {
      googleKeys,
      searchGoogle,
      searchGoogleKey
    }
  }
}
</script>

<style>
</style>