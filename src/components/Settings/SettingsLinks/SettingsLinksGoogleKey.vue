<template>
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
</template>

<script>
// Import UI components.
import {
  HipOption,
  HipSelect
} from '../../Component'
// Import settings objects and functions.
import { googleKeys } from '../../../settings'

export default {
  name: 'SettingsLinksGoogleKey',
  components: {
    // UI components.
    HipOption,
    HipSelect
  },
  data() {
    return {
      googleKeys: googleKeys
    }
  },
  computed: {
    searchGoogleKey: {
      get() { return this.$store.state.searchGoogleKey },
      set(value) { this.$store.commit('selectSearchGoogleKey', value) }
    }
  }
}
</script>

<style>
</style>