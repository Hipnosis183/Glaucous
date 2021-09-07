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
} from '../Component'
// Import settings objects and functions.
import { googleKeys } from '../../settings'

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
  data() {
    return {
      googleKeys: googleKeys
    }
  },
  computed: {
    searchGoogle: {
      get() { return this.$store.getters.getSettingsLinksSearchGoogle },
      set() { this.$store.commit('setSettingsLinksSearchGoogle') }
    },
    searchGoogleKey: {
      get() { return this.$store.getters.getSettingsLinksSearchGoogleKey },
      set(value) { this.$store.commit('setSettingsLinksSearchGoogleKey', value) }
    }
  }
}
</script>

<style>
</style>