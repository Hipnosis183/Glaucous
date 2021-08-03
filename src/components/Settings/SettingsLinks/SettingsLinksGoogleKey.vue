<template>
  <p class="text-xl">Google search key</p>
  <el-select v-model="searchGoogleKey">
    <el-option
      v-for="key in googleKeys"
      :key="key.i"
      :label="key.name"
      :value="key.i"
    >
      <p>{{ key.name }}</p>
    </el-option>
  </el-select>
</template>

<script>
// Import settings objects and functions.
import { googleKeys } from '../../../settings'

export default {
  name: 'SettingsLinksGoogleKey',
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