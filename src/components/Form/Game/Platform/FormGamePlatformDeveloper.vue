<template>
  <!-- Developer input select. -->
  <hip-select
    v-model="developer"
    allow-create
    label="Developer"
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
} from '../../../Component'
// Import database developer functions.
import {
  getDeveloper,
  getDeveloperByName
} from '../../../../database/controllers/Developer'

export default {
  name: 'FormGamePlatformDeveloper',
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
    'gameDeveloper'
  ],
  methods: {
    // Query searching.
    querySearch(query) {
      // Only start search from two characters onwards.
      if (query !== '' && query.length > 1) {
        // Search for developers matching the query.
        getDeveloperByName(query)
          .then(res => {
            // Store results.
            this.queryResults = res
          })
      } else {
        // Keep results empty.
        this.queryResults = []
      }
    },
    // Autocomplete developer input field.
    selectDeveloper() {
      // Get developer from parent page.
      getDeveloper(this.gameDeveloper)
        .then(res => {
          this.developer = this.gameDeveloper
          this.queryResults = new Array(res)
        })
    }
  },
  mounted() {
    if (this.gameDeveloper) {
      this.selectDeveloper()
    }
  },
  computed: {
    developer: {
      get() { return this.$store.state.gameForm.gamePlatform.developer },
      set(value) { this.$store.commit('setGamePlatformDeveloper', value) }
    }
  },
  watch: {
    // Watch for developer ID to be loaded.
    gameDeveloper() {
      this.selectDeveloper()
    }
  }
}
</script>

<style>
</style>