<template>
  <!-- Platform input select. -->
  <hip-select
    v-model="platform"
    allow-create
    label="Platform"
    placeholder="Required"
    remote
    :remote-method="querySearch"
    required
    class="w-full"
  >
    <hip-option
      v-for="item in queryResults"
      :key="item._id"
      :label="item.name"
      :value="item._id"
    >
    </hip-option>
  </hip-select>
</template>

<script>
// Import UI components.
import {
  HipOption,
  HipSelect
} from '../Component'
// Import database platform functions.
import {
  getPlatform,
  getPlatformByName
} from '../../database/controllers/Platform'

export default {
  name: 'FormPlatform',
  components: {
    // UI components.
    HipOption,
    HipSelect
  },
  data() {
    return {
      queryResults: []
    }
  },
  props: [
    'gamePlatform'
  ],
  methods: {
    // Query searching.
    querySearch(query) {
      // Only start search from two characters onwards.
      if (query !== '' && query.length > 1) {
        // Search for platforms matching the query.
        getPlatformByName(query)
          .then(res => {
            // Store results.
            this.queryResults = res
          })
      } else {
        // Keep results empty.
        this.queryResults = []
      }
    },
    // Autocomplete platform input field.
    selectPlatform() {
      // Get platform from parent page.
      getPlatform(this.gamePlatform)
        .then(res => {
          this.platform = this.gamePlatform
          this.queryResults = new Array(res)
        })
    }
  },
  mounted() {
    if (this.gamePlatform) {
      this.selectPlatform()
    }
  },
  computed: {
    platform: {
      get() { return this.$store.state.gameForm.gamePlatform.platform },
      set(value) { this.$store.commit('setGamePlatformPlatform', value) }
    }
  },
  watch: {
    // Watch for platform ID to be loaded.
    gamePlatform() {
      this.selectPlatform()
    }
  }
}
</script>

<style>
</style>